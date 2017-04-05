import redisClient  from '../../datastores/redis';
import * as session from 'express-session';
import * as redis_session from 'connect-redis';
var RedisSessionStore = redis_session(session)

export class AppSession {
    handler: any

    constructor() {
        this.init();
    }
  init() {
    this.handler = session({
        store: new RedisSessionStore({client:redisClient}),
        name: process.env.SESSION_NAME,
        secret: process.env.SESSION_CRYPKEY,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }
    });
    
  }

}

const appSession = new AppSession();
appSession.init();

export default appSession.handler;