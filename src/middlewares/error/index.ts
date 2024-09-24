import { Request,Response,NextFunction } from 'express'
import { GlobalRateLimiter } from '../../lib/global';

export const ErrorHandler = (err:any, req:Request, res:Response, next:NextFunction) => {
    console.log(err)
    return res.status(400).json({
      error:err.message,
      data:null
    })
  }

 export const NotFound = ( req:Request, res:Response, next:NextFunction) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
  };

  export const RateLimiter = async (req: Request, res: Response, next: NextFunction) => {
    if (req.ip) {
      try {
        await GlobalRateLimiter.checkRateLimit(req.ip);
        next();
      } catch (error) {
        // Catch the error thrown by checkRateLimit and pass it to the error-handling middleware
        next(error);
      }
    } else {
      throw new Error('A valid IP is required');
    }
  };
