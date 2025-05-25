import {Response, Request} from "express";
import {db} from '../../config/firebase/firebase.config';
import {IResponseApi} from "../../interfaces/response-api/response-api.interface";
import {IUser} from "../../interfaces/user/user.interface";
import responseMessagesShared from "../../shared/response-messages/response-messages.shared";


const userCollection = db.collection('users');

async function isValidUser(data: IUser) {
    try {
        const user = await userCollection.where('email', '==', data.email).limit(1).get();
        if (!user.empty) {
            return false;
        }
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}

const userController = {
    async create(req: Request, res: Response): Promise<Response<IResponseApi>> {
        try {
            const data: IUser = req.body as IUser;
            if (!await isValidUser(data)) {
                 return responseMessagesShared.badRequest(res, 'User already registered.', []);
            }
            await userCollection.add(data);
            return responseMessagesShared.successProcess(res, 'User create successfully.', []);
        } catch (e) {
            console.error(e);
            return responseMessagesShared.errorRequest(e, 'Create-User', res);
        }
    },
    async update(req: Request, res: Response): Promise<Response<IResponseApi>> {
        try {
            const data: IUser = req.body as IUser;
            if (!await isValidUser(data)) {
                return responseMessagesShared.badRequest(res, 'User already registered.', []);
            }
            const dataUpdate = await userCollection.doc(data.id || '').get();
            if (!dataUpdate) {
                return responseMessagesShared.badRequest(res, 'User update failed.', []);
            }
            // @ts-ignore
            await userCollection.doc(data.id || '').update(data);
            return responseMessagesShared.successProcess(res, 'User updated successfully.', []);
        } catch (e) {
            console.error(e);
            return responseMessagesShared.errorRequest(e, 'Update-User', res);
        }
    },
    async delete(req: Request, res: Response): Promise<Response<IResponseApi>> {
        try {
            const { id } = req.params;
            const dataDelete = await userCollection.doc(id).get();
            if (!dataDelete) {
                return responseMessagesShared.badRequest(res, 'User delete failed.', []);
            }
            await userCollection.doc(id).delete();
            return responseMessagesShared.successProcess(res, 'User deleted successfully.', []);
        } catch (e) {
            console.error(e);
            return responseMessagesShared.errorRequest(e, 'Delete-User', res);
        }
    },
    async getById(req: Request, res: Response): Promise<Response<IResponseApi>> {
        try {
            const { id } = req.params;
            const data = await userCollection.doc(id).get();
            if (!data) {
                return responseMessagesShared.badRequest(res, 'No user Found', []);
            }
            const user: IUser = {
                id: data.id,
                ...data.data() as IUser
            };
            return responseMessagesShared.successProcess(res, 'User found', user);
        } catch (e) {
            console.error(e);
            return responseMessagesShared.errorRequest(e, 'GetById-User', res);
        }
    },
    async getAll(_req: Request, res: Response): Promise<Response<IResponseApi>> {
        try {
            const users = await userCollection.get();
            const data: IUser[] = users.docs.map(doc => ({
                id: doc.id,
                ...doc.data() as IUser,
            }));
            return responseMessagesShared.successProcess(res, 'Users found', data);
        } catch (e) {
            console.error(e);
            return responseMessagesShared.errorRequest(e, 'GetAll-User', res);
        }
    },
}
export default userController;