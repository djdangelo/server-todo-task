import {NextFunction, Response, Request} from "express";
import jwtHelper from "../../helpers/jwt/jwt.helper";
import responseMessagesShared from "../../shared/response-messages/response-messages.shared";

// @ts-ignore
export const validateJwt = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
        return responseMessagesShared.notAuthUser(res, 'Token is required for this route.', []);
    }
    try {
        // @ts-ignore
        const { id } = jwtHelper.verifyToken(token);
        // @ts-ignore
        req.id = id;
        next();
    } catch (err) {
        console.log(err);
        return responseMessagesShared.notAuthUser(res, 'Token is invalid.', []);
    }
}
export default { validateJwt };