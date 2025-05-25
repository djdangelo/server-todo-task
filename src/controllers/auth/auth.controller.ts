import {db} from '../../config/firebase/firebase.config';
import {Response} from "express";
import {IResponseApi} from "../../interfaces/response-api/response-api.interface";
import {ILoginResponse} from "../../interfaces/login-response/login-response.interface";
import responseMessagesShared from "../../shared/response-messages/response-messages.shared";
import jwtHelper from "../../helpers/jwt/jwt.helper";
import {IAuth} from "../../interfaces/auth/auth.interface";


const userCollection = db.collection('users');

const authController = {
    async login(req:Request, res: Response) : Promise<Response<IResponseApi>> {
        try {
            const { email } = req.body as unknown as IAuth;
            const data = await userCollection.where('email', '==', email).limit(1).get();
            if (data.empty) {
                return responseMessagesShared.notAuthUser(res, 'User not found or not register', []);
            }
            const token = await jwtHelper.generateToken(data.docs[0].id);
            const responseLogin: ILoginResponse = {
                token,
                email
            };
            const nameUser = email.split('@');
            return responseMessagesShared.successProcess(res, `Welcome ${nameUser[0]}`, responseLogin);
        } catch (e) {
            console.error(e);
            // @ts-ignore
            return responseMessagesShared.errorRequest(e.error.message, 'login', res)
        }
    }
};

export default authController;