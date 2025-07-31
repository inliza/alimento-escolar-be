"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceResponse = void 0;
class ServiceResponse {
    code;
    message;
    content;
    error;
    constructor(code, content = null, message = 'Success', error = null) {
        this.code = code;
        this.message = message;
        this.content = content;
        this.error = error;
    }
}
exports.ServiceResponse = ServiceResponse;
//# sourceMappingURL=service-response.js.map