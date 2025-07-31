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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../../entities/user.entity");
const service_response_1 = require("../../helpers/service-response");
const typeorm_2 = require("typeorm");
let UsersService = class UsersService {
    userRepo;
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    async create(data) {
        try {
            const user = this.userRepo.create(data);
            const saved = await this.userRepo.save(user);
            return new service_response_1.ServiceResponse(common_1.HttpStatus.CREATED, saved);
        }
        catch (error) {
            return new service_response_1.ServiceResponse(common_1.HttpStatus.INTERNAL_SERVER_ERROR, null, 'Error creating user', error);
        }
    }
    async findAll() {
        try {
            const users = await this.userRepo.find({
                relations: ['company', 'profile'],
            });
            return new service_response_1.ServiceResponse(common_1.HttpStatus.OK, users);
        }
        catch (error) {
            return new service_response_1.ServiceResponse(common_1.HttpStatus.INTERNAL_SERVER_ERROR, null, 'Error fetching users', error);
        }
    }
    async findOne(id) {
        try {
            const user = await this.userRepo.findOne({
                where: { id },
                relations: ['company', 'profile'],
            });
            if (!user) {
                return new service_response_1.ServiceResponse(common_1.HttpStatus.NOT_FOUND, null, 'User not found');
            }
            return new service_response_1.ServiceResponse(common_1.HttpStatus.OK, user);
        }
        catch (error) {
            return new service_response_1.ServiceResponse(common_1.HttpStatus.INTERNAL_SERVER_ERROR, null, 'Error fetching user', error);
        }
    }
    async update(id, data) {
        try {
            const result = await this.userRepo.update(id, data);
            if (result.affected === 0) {
                return new service_response_1.ServiceResponse(common_1.HttpStatus.NOT_FOUND, null, 'User not found');
            }
            return new service_response_1.ServiceResponse(common_1.HttpStatus.OK, result, 'User updated successfully');
        }
        catch (error) {
            return new service_response_1.ServiceResponse(common_1.HttpStatus.INTERNAL_SERVER_ERROR, null, 'Error updating user', error);
        }
    }
    async remove(id) {
        try {
            const result = await this.userRepo.softDelete(id);
            if (result.affected === 0) {
                return new service_response_1.ServiceResponse(common_1.HttpStatus.NOT_FOUND, null, 'User not found');
            }
            return new service_response_1.ServiceResponse(common_1.HttpStatus.OK, result, 'User deleted successfully');
        }
        catch (error) {
            return new service_response_1.ServiceResponse(common_1.HttpStatus.INTERNAL_SERVER_ERROR, null, 'Error deleting user', error);
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.Users)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map