import { Response } from "express";
import { IResponseApi } from "../../interfaces/response-api/response-api.interface";

const responseMessagesShared = {
    successProcess(res: Response, message: string, data: any) : Response<IResponseApi> {
        return res.status(200).json({
            data,
            message,
            error: false
        });
    },
    notAuthUser(res: Response, message: string, data: any) : Response<IResponseApi> {
        return res.status(401).json({
            data,
            message,
            error: true
        });
    },
    badRequest(res: Response, message: string, data: any): Response<IResponseApi> {
        return res.status(400).json({
            data,
            message,
            error: true
        });
    },
    errorRequest(error: any, endPointName: string, res: Response): Response<IResponseApi> {
        return res.status(500).json({
            data: error,
            message: `Ocurrió un error interno, comunícate con el administrador. [${endPointName}]`,
            error: true
        });
    },
}

export default responseMessagesShared;