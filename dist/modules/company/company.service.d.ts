import { Company } from 'src/entities/company.entity';
import { ServiceResponse } from 'src/helpers/service-response';
import { Repository } from 'typeorm';
export declare class CompanyService {
    private readonly companyRepo;
    constructor(companyRepo: Repository<Company>);
    create(data: Partial<Company>): Promise<ServiceResponse<Company | null>>;
    findAll(): Promise<ServiceResponse<Company[] | null>>;
    findOne(id: number): Promise<ServiceResponse<Company | null>>;
    update(id: number, data: Partial<Company>): Promise<ServiceResponse<any>>;
    remove(id: number): Promise<ServiceResponse<any>>;
}
