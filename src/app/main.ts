import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';


import AppSessionWare from './middlewares/session';
import AllowCrosWare from './middlewares/cros';
import UserAuthenticationWare from './middlewares/authentication';

import DemoRouter  from './modules/demo';

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public express: express.Application;

  //Run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  // Configure Express middleware.
  private middleware(): void {
    
    if (process.env.CROS_REQUESTS)  this.express.use(AllowCrosWare);
    this.express.use(AppSessionWare);
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(UserAuthenticationWare);
  }

  // Configure API endpoints.
  private routes(): void {
    /* This is just to get up and running, and to make sure what we've got is
     * working so far. This function will change when we start to add more
     * API endpoints */
    let router = express.Router();
    // placeholder route handler
    router.get('/', (req, res, next) => {
      var sess = req.session;
      if (sess.views) {
        sess.views++
      } else {
        sess.views = 1
      }
      res.json({
        message: 'Hello World!',
        session:sess,
        id:sess.id
      });
    });
    this.express.use('/', router);
    this.express.use('/api/v1/demo', DemoRouter);
  }

}

export default new App().express;