"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const company_entity_1 = require("../../entities/company.entity");
const service_response_1 = require("../../helpers/service-response");
const typeorm_2 = require("typeorm");
let CompanyService = class CompanyService {
    companyRepo;
    constructor(companyRepo) {
        this.companyRepo = companyRepo;
    }
    async create(data) {
        try {
            const company = this.companyRepo.create(data);
            const saved = await this.companyRepo.save(company);
            return new service_response_1.ServiceResponse(common_1.HttpStatus.CREATED, saved);
        }
        catch (error) {
            return new service_response_1.ServiceResponse(common_1.HttpStatus.INTERNAL_SERVER_ERROR, null, 'Error creating company', error);
        }
    }
    async findAll() {
        try {
            const companies = await this.companyRepo.find();
            return new service_response_1.ServiceResponse(common_1.HttpStatus.OK, companies);
        }
        catch (error) {
            return new service_response_1.ServiceResponse(common_1.HttpStatus.INTERNAL_SERVER_ERROR, null, 'Error fetching companies', error);
        }
    }
    async findOne(id) {
        try {
            const company = await this.companyRepo.findOne({ where: { id } });
            if (!company) {
                return new service_response_1.ServiceResponse(common_1.HttpStatus.NOT_FOUND, null, 'Company not found');
            }
            return new service_response_1.ServiceResponse(common_1.HttpStatus.OK, company);
        }
        catch (error) {
            return new service_response_1.ServiceResponse(common_1.HttpStatus.INTERNAL_SERVER_ERROR, null, 'Error fetching company', error);
        }
    }
    async update(id, data) {
        try {
            const result = await this.companyRepo.update(id, data);
            if (result.affected === 0) {
                return new service_response_1.ServiceResponse(common_1.HttpStatus.NOT_FOUND, null, 'Company not found');
            }
            return new service_response_1.ServiceResponse(common_1.HttpStatus.OK, result, 'Company updated successfully');
        }
        catch (error) {
            return new service_response_1.ServiceResponse(common_1.HttpStatus.INTERNAL_SERVER_ERROR, null, 'Error updating company', error);
        }
    }
    async remove(id) {
        try {
            const result = await this.companyRepo.softDelete(id);
            if (result.affected === 0) {
                return new service_response_1.ServiceResponse(common_1.HttpStatus.NOT_FOUND, null, 'Company not found');
            }
            return new service_response_1.ServiceResponse(common_1.HttpStatus.OK, result, 'Company deleted successfully');
        }
        catch (error) {
            return new service_response_1.ServiceResponse(common_1.HttpStatus.INTERNAL_SERVER_ERROR, null, 'Error deleting company', error);
        }
    }
};
exports.CompanyService = CompanyService;
exports.CompanyService = CompanyService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(company_entity_1.Company)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CompanyService);
//# sourceMappingURL=company.service.js.map