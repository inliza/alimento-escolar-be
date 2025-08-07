"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEscuelaDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const escuela_create_dto_1 = require("./escuela-create.dto");
class UpdateEscuelaDto extends (0, mapped_types_1.PartialType)(escuela_create_dto_1.CreateEscuelaDto) {
}
exports.UpdateEscuelaDto = UpdateEscuelaDto;
//# sourceMappingURL=escuela-update.dto.js.map