import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from 'src/entities/company.entity';
import { ServiceResponse } from 'src/helpers/service-response';
import { Repository } from 'typeorm';

@Injectable()
export class CompanyService {
    constructor(
        @InjectRepository(Company)
        private readonly companyRepo: Repository<Company>,
    ) { }

    async create(data: Partial<Company>): Promise<ServiceResponse<Company | null>> {
        try {
            const company = this.companyRepo.create(data);
            const saved = await this.companyRepo.save(company);
            return new ServiceResponse(HttpStatus.CREATED, saved);
        } catch (error) {
            return new ServiceResponse(HttpStatus.INTERNAL_SERVER_ERROR, null, 'Error creating company', error);
        }
    }

    async findAll(): Promise<ServiceResponse<Company[] | null>> {
        try {
            const companies = await this.companyRepo.find();
            return new ServiceResponse(HttpStatus.OK, companies);
        } catch (error) {
            return new ServiceResponse(HttpStatus.INTERNAL_SERVER_ERROR, null, 'Error fetching companies', error);
        }
    }

    async findOne(id: number): Promise<ServiceResponse<Company | null>> {
        try {
            const company = await this.companyRepo.findOne({ where: { id } });
            if (!company) {
                return new ServiceResponse(HttpStatus.NOT_FOUND, null, 'Company not found');
            }
            return new ServiceResponse(HttpStatus.OK, company);
        } catch (error) {
            return new ServiceResponse(HttpStatus.INTERNAL_SERVER_ERROR, null, 'Error fetching company', error);
        }
    }

    async update(id: number, data: Partial<Company>): Promise<ServiceResponse<any>> {
        try {
            const result = await this.companyRepo.update(id, data);
            if (result.affected === 0) {
                return new ServiceResponse(HttpStatus.NOT_FOUND, null, 'Company not found');
            }
            return new ServiceResponse(HttpStatus.OK, result, 'Company updated successfully');
        } catch (error) {
            return new ServiceResponse(HttpStatus.INTERNAL_SERVER_ERROR, null, 'Error updating company', error);
        }
    }

    async remove(id: number): Promise<ServiceResponse<any>> {
        try {
            const result = await this.companyRepo.softDelete(id);
            if (result.affected === 0) {
                return new ServiceResponse(HttpStatus.NOT_FOUND, null, 'Company not found');
            }
            return new ServiceResponse(HttpStatus.OK, result, 'Company deleted successfully');
        } catch (error) {
            return new ServiceResponse(HttpStatus.INTERNAL_SERVER_ERROR, null, 'Error deleting company', error);
        }
    }

}
