import { CompanyService } from './company.service';
import { Company } from 'src/entities/company.entity';
import { ServiceResponse } from 'src/helpers/service-response';
export declare class CompanyController {
    private readonly service;
    ß: any;
    constructor(service: CompanyService);
    create(body: Partial<Company>): Promise<ServiceResponse<any>>;
    findAll(): Promise<ServiceResponse<any>>;
    findOne(id: string): Promise<ServiceResponse<any>>;
    update(id: string, body: Partial<Company>): Promise<ServiceResponse<any>>;
    remove(id: string): Promise<ServiceResponse<any>>;
}
