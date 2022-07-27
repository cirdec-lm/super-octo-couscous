import { PoleEmploiClient } from './PoleEmploiClient.js';

export class App {
  constructor({ config, poleEmploiClient, mongodb, fetch}) {
    console.log(config)
    this.mongodb = mongodb;
    this.poleEmploiClient = new PoleEmploiClient({fetch, config: config.PoleEmploi});
    this.config = config;
  }
  async start() {
    const data = await this.poleEmploiClient.getData();
    // do bulk insert / upsert
  }
}
