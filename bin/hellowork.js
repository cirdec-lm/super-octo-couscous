import { fetch } from 'undici';
import MongoDb from 'mongodb';
const { mongodb } = MongoDb;
import { App } from '../lib/app.js';
import config from '../config/config.js';

(async () =>{
  try {
    // Load config from config.js file
    const app = new App({config, mongodb, fetch})
    await app.start()
  } catch(error) {
    console.log(error);
    process.exit(1);
  }
})();

