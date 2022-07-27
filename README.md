# Hello-work

## Configuration:
Get your pole-emploi.io client_id and client_secret and create a .env file in the root directory of this project:
```
CLIENT=client_id
KEY=client_secret
```

## Developpement
* run docker-compose up -d hello-work

## Build version
### build:
`docker-compose build hello-work-prod`

### Test build version
`docker-compose run hello-work-prod`
