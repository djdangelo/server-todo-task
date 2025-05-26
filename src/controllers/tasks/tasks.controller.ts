import {Response, Request} from "express";
import {db, admin} from '../../config/firebase/firebase.config';
import {IResponseApi} from "../../interfaces/response-api/response-api.interface";
import responseMessagesShared from "../../shared/response-messages/response-messages.shared";
import {ITask} from "../../interfaces/task/task.interface";

const tasksCollection = db.collection('tasks');

const taskController = {
    async create(req: Request, res: Response): Promise<Response<IResponseApi>> {
        try {
            const data: ITask = req.body as ITask;
            // @ts-ignore
            data.createdAt = admin.firestore.Timestamp.fromDate(new Date());
            await tasksCollection.add(data);
            return responseMessagesShared.successProcess(res,'Task created successfully', []);
        } catch (e) {
            console.error(e);
            return responseMessagesShared.errorRequest(e, 'Create-Task', res);
        }
    },
    async update(req: Request, res: Response): Promise<Response<IResponseApi>> {
        try {
            const data: ITask = req.body as ITask;
            // @ts-ignore
            data.createdAt = admin.firestore.Timestamp.fromDate(new Date(data.createdAt))
            const dataUpdate = await tasksCollection.doc(data.id || '').get();
            if (!dataUpdate) {
                return responseMessagesShared.badRequest(res, 'Task update failed.', []);
            }
            // @ts-ignore
            await tasksCollection.doc(data.id || '').update(data);
            return responseMessagesShared.successProcess(res, 'User updated successfully.', []);
        } catch (e) {
            console.error(e);
            return responseMessagesShared.errorRequest(e, 'Create-Task', res);
        }
    },
    async delete(req: Request, res: Response): Promise<Response<IResponseApi>> {
        try {
            const { id } = req.params;
            const dataDelete = await tasksCollection.doc(id).get();
            if (!dataDelete) {
                return responseMessagesShared.badRequest(res, 'Task delete failed.', []);
            }
            await tasksCollection.doc(id).delete();
            return responseMessagesShared.successProcess(res, 'Task deleted successfully.', []);
        } catch (e) {
            console.error(e);
            return responseMessagesShared.errorRequest(e, 'Create-Task', res);
        }
    },
    async getAll(req: Request, res: Response): Promise<Response<IResponseApi>> {
        try {
            const { limit = 10, pageToken } = req.query;
            let query = tasksCollection.orderBy('createdAt', 'desc').limit(parseInt(String(limit)));
            const size = await tasksCollection.count().get();
            if (pageToken) {
                const lastDoc = await tasksCollection.doc(String(pageToken)).get();
                if (lastDoc.exists) {
                    query = query.startAfter(lastDoc);
                }
            }
            const listData = await query.get();
            const tasks: ITask[] = listData.docs.map(doc => {
                const data = doc.data();
                const createdAt = (data.createdAt as FirebaseFirestore.Timestamp)?.toDate?.() ?? null;
                return {
                    id: doc.id,
                    ...data,
                    createdAt
                } as unknown as ITask;
            });
            const lastVisible = listData.docs[listData.docs.length - 1];
            const nextPage = lastVisible ? lastVisible.id : null;
            return responseMessagesShared.successProcess(res, 'Task list', { tasks, nextPage, size: size.data().count });
        } catch (e) {
            console.error(e);
            return responseMessagesShared.errorRequest(e, 'Create-Task', res);
        }
    },
    async getById(req: Request, res: Response): Promise<Response<IResponseApi>> {
        try {
            const { id } = req.params;
            const data = await tasksCollection.doc(id).get();
            if (!data) {
                return responseMessagesShared.badRequest(res, 'Task not found.', []);
            }
            const dataTask = data.data();
            // @ts-ignore
            const createdAt = (dataTask.createdAt as FirebaseFirestore.Timestamp)?.toDate?.() ?? null;
            const task: ITask = {
                id: data.id,
                ...dataTask,
                // @ts-ignore
                createdAt,
            };
            return responseMessagesShared.successProcess(res, 'Task found', task);
        } catch (e) {
            console.error(e);
            return responseMessagesShared.errorRequest(e, 'Create-Task', res);
        }
    }
};

export default taskController;