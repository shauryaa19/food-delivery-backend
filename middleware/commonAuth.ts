import { Request, Response, NextFunction } from "express";
import { AuthPayload } from "../dto";
import { validateSignature } from "../utilities";

declare global {
    namespace Express {
        interface Request {
            user?: AuthPayload
        }
    }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {

    const validate = await validateSignature(req)

    if(validate) {
        next()
    } else {
        return res.json({ "message": "user not authorized" })
    }
}