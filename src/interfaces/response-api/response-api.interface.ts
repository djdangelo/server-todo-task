export interface IResponseApi<T = any> {
    data: T,
    message: string,
    error: boolean,
}