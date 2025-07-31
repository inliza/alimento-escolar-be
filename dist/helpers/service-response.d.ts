export declare class ServiceResponse<T = any> {
    code: number;
    message: string;
    content: T | null;
    error: any;
    constructor(code: number, content?: T | null, message?: string, error?: any);
}
