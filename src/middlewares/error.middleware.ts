import { NextFunction, Request, Response } from "express";

const errorMiddleware = (error: Error, req: Request, res: Response, next:NextFunction) => {
    console.error(error.stack);
    res.status(500).json({
        status: 'error',
        message: 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
};

export default errorMiddleware;