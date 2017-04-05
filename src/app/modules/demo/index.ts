import {Router, Request, Response, NextFunction} from 'express';

export class DemoRouter {
  router: Router

  /**
   * Initialize the DemoRouter
   */
  constructor() {
    this.router = Router();
    this.init();
  }

  /**
   * do some handler
   */
  doSome(req: Request, res: Response, next: NextFunction) {
      res.json({do:"some"});
  }

  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  init() {
    this.router.post('/dosome', this.doSome);
    
  }

}

// Create the DemoRouter, and export its configured Express.Router
const demo = new DemoRouter();

export default demo.router;