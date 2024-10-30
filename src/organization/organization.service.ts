import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Organization } from './organization.schema';

@Injectable()
export class OrganizationService {
  constructor(@InjectModel(Organization.name) private organizationModel: Model<Organization>) {}

  async createOrganization(name: string, description: string) {
    const newOrg = new this.organizationModel({ name, description });
    return newOrg.save();
  }

  async findOrganizationById(id: string) {
    return this.organizationModel.findById(id);
  }

  async findAllOrganizations() {
    return this.organizationModel.find();
  }
}
