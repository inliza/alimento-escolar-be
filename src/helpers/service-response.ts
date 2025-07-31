export class ServiceResponse<T = any> {
  code: number;
  message: string;
  content: T | null;
  error: any;

  constructor(
    code: number,
    content: T | null = null,
    message = 'Success',
    error: any = null,
  ) {
    this.code = code;
    this.message = message;
    this.content = content;
    this.error = error;
  }
}