const HOSTNAME = 'https://entreprise.pole-emploi.fr';
const TOKEN_PATH = 'connexion/oauth2/access_token?realm=/partenaire';
const SEARCH_PATH = 'offresdemploi/v2/offres/search';

export class PoleEmploiClient {
  constructor({config, fetch}) {
    this.fetch = fetch;
    this.config = config;
  }

  async getToken() {
    const url = `${HOSTNAME}/${TOKEN_PATH}`;
    const rawParams = {
      grant_type: 'client_credentials',
      client_id: this.config.client_id,
      client_secret: this.config.client_secret,
      scope: 'api_offresdemploiv2 o2dsoffre'
    }
   console.log(rawParams);
    const params = new URLSearchParams(rawParams);
    const response = await this.fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      body: params.toString()
    });

    if(response.status === 200) {
      const data = await response.json();
      this.access_token = data.access_token;
      console.log('Token ok');
    } else {
      throw new Error(await response.text());
    }
  }

  async getData() {
    const baseUrl = 'https://api.emploi-store.fr/partenaire/offresdemploi/v2/offres/search';

    let firstElement = 0;
    let lastElement = 149;
    let total = -1;

    while(lastElement !== total) {
      await this.getToken();
      const rawParams = {
        commune: ['35238'], // Rennes, Bordeaux,'33063'
        range: `${firstElement}-${lastElement}`
      }

      const params = new URLSearchParams(rawParams);
      const url = `${baseUrl}?${params}`
      console.log(url)
      const response = await this.fetch(url, {
        headers: {
          Authorization: `Bearer ${this.access_token}`
        }
      });

      if(response.status !== 200 && response.status !== 206) {
        const errorMessage = await response.text();
        console.log(errorMessage)
      }

      const contentRange = response.headers.get('content-range');
      const acceptRange = response.headers.get('accept-range');
      const match = contentRange.match(/offres ([0-9]{1,})-([0-9]{1,})\/([0-9]{1,})/)
      console.log(contentRange)
      if(match) {
        firstElement = match[1];
        lastElement = match[2];
        total = match[3];
        firstElement = +lastElement + 1;
        lastElement = +lastElement + 150 >= +total ? +total - 1 : +lastElement + 150;
      } else {
        throw new Error('Unable to parse the pagination information');
      }
    }
  }
}
