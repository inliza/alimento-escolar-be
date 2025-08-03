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
const bcrypt_1 = require("bcrypt");
const bcrypt_2 = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const company_service_1 = require("../company/company.service");
const profiles_service_1 = require("../profiles/profiles.service");
let UsersService = class UsersService {
    userRepo;
    jwtService;
    companyService;
    profilesService;
    constructor(userRepo, jwtService, companyService, profilesService) {
        this.userRepo = userRepo;
        this.jwtService = jwtService;
        this.companyService = companyService;
        this.profilesService = profilesService;
    }
    async create(dto) {
        try {
            const exists = await this.userRepo.findOne({
                where: { username: dto.username },
            });
            if (exists) {
                return new service_response_1.ServiceResponse(common_1.HttpStatus.CONFLICT, null, 'Username already exists');
            }
            const user = new user_entity_1.Users();
            const companyResp = await this.companyService.findOne(dto.idCompany);
            if (companyResp.code !== common_1.HttpStatus.OK) {
                return new service_response_1.ServiceResponse(common_1.HttpStatus.BAD_REQUEST, null, 'Invalid company');
            }
            let profile = null;
            if (dto.idProfile) {
                const profileResp = await this.profilesService.findOne(dto.idProfile);
                if (profileResp.code !== common_1.HttpStatus.OK) {
                    return new service_response_1.ServiceResponse(common_1.HttpStatus.BAD_REQUEST, null, 'Invalid profile');
                }
                profile = profileResp.content;
            }
            user.firstName = dto.firstName;
            user.lastName = dto.lastName;
            user.username = dto.username;
            user.profile = profile;
            user.password = await (0, bcrypt_1.hash)(dto.password, 10);
            user.company = companyResp.content;
            await this.userRepo.save(user);
            console.log('User created successfully:', dto.username, dto.idCompany);
            return new service_response_1.ServiceResponse(common_1.HttpStatus.CREATED, user);
        }
        catch (error) {
            return new service_response_1.ServiceResponse(common_1.HttpStatus.INTERNAL_SERVER_ERROR, null, 'Error creating user', error);
        }
    }
    async login(data) {
        try {
            const exists = await this.userRepo.findOne({
                where: { username: data.username },
            });
            if (!exists) {
                return new service_response_1.ServiceResponse(common_1.HttpStatus.UNAUTHORIZED, null, 'Usuario o contraseña incorrectos');
            }
            const isValid = await (0, bcrypt_2.compare)(data.password, exists.password);
            if (!isValid) {
                console.log('Invalid credentials for user:', data.username);
                return new service_response_1.ServiceResponse(common_1.HttpStatus.UNAUTHORIZED, null, 'Usuario o contraseña incorrectos');
            }
            const payload = { username: exists.username, sub: exists.id };
            const token = await this.jwtService.sign(payload);
            return new service_response_1.ServiceResponse(common_1.HttpStatus.CREATED, {
                access_token: token
            });
        }
        catch (error) {
            return new service_response_1.ServiceResponse(common_1.HttpStatus.INTERNAL_SERVER_ERROR, null, 'Error login user', error);
        }
    }
    async getLoggedUser(userId) {
        const user = await this.userRepo.findOne({ where: { id: userId } });
        return new service_response_1.ServiceResponse(common_1.HttpStatus.OK, user);
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
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService,
        company_service_1.CompanyService,
        profiles_service_1.ProfilesService])
], UsersService);
//# sourceMappingURL=users.service.js.map