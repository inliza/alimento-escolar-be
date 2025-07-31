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
exports.ProfilesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const profile_entity_1 = require("../../entities/profile.entity");
const service_response_1 = require("../../helpers/service-response");
const typeorm_2 = require("typeorm");
let ProfilesService = class ProfilesService {
    profileRepo;
    constructor(profileRepo) {
        this.profileRepo = profileRepo;
    }
    async create(data) {
        try {
            const profile = this.profileRepo.create(data);
            const saved = await this.profileRepo.save(profile);
            return new service_response_1.ServiceResponse(common_1.HttpStatus.CREATED, saved);
        }
        catch (error) {
            return new service_response_1.ServiceResponse(common_1.HttpStatus.INTERNAL_SERVER_ERROR, null, 'Error creating profile', error);
        }
    }
    async findAll() {
        try {
            const profiles = await this.profileRepo.find();
            return new service_response_1.ServiceResponse(common_1.HttpStatus.OK, profiles);
        }
        catch (error) {
            return new service_response_1.ServiceResponse(common_1.HttpStatus.INTERNAL_SERVER_ERROR, null, 'Error fetching profiles', error);
        }
    }
    async findOne(id) {
        try {
            const profile = await this.profileRepo.findOne({ where: { id } });
            if (!profile) {
                return new service_response_1.ServiceResponse(common_1.HttpStatus.NOT_FOUND, null, 'Profile not found');
            }
            return new service_response_1.ServiceResponse(common_1.HttpStatus.OK, profile);
        }
        catch (error) {
            return new service_response_1.ServiceResponse(common_1.HttpStatus.INTERNAL_SERVER_ERROR, null, 'Error fetching profile', error);
        }
    }
    async update(id, data) {
        try {
            const result = await this.profileRepo.update(id, data);
            if (result.affected === 0) {
                return new service_response_1.ServiceResponse(common_1.HttpStatus.NOT_FOUND, null, 'Profile not found');
            }
            return new service_response_1.ServiceResponse(common_1.HttpStatus.OK, result, 'Profile updated successfully');
        }
        catch (error) {
            return new service_response_1.ServiceResponse(common_1.HttpStatus.INTERNAL_SERVER_ERROR, null, 'Error updating profile', error);
        }
    }
    async remove(id) {
        try {
            const result = await this.profileRepo.softDelete(id);
            if (result.affected === 0) {
                return new service_response_1.ServiceResponse(common_1.HttpStatus.NOT_FOUND, null, 'Profile not found');
            }
            return new service_response_1.ServiceResponse(common_1.HttpStatus.OK, result, 'Profile deleted successfully');
        }
        catch (error) {
            return new service_response_1.ServiceResponse(common_1.HttpStatus.INTERNAL_SERVER_ERROR, null, 'Error deleting profile', error);
        }
    }
};
exports.ProfilesService = ProfilesService;
exports.ProfilesService = ProfilesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(profile_entity_1.Profiles)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProfilesService);
//# sourceMappingURL=profiles.service.js.map