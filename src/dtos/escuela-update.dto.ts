import { PartialType } from "@nestjs/mapped-types";
import { CreateEscuelaDto } from "./escuela-create.dto";


export class UpdateEscuelaDto extends PartialType(CreateEscuelaDto) {}