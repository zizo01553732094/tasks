import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('organization')
@UseGuards(JwtAuthGuard)
export class OrganizationController {
  constructor(private organizationService: OrganizationService) {}

  @Post()
  create(@Body() body: any) {
    return this.organizationService.createOrganization(body.name, body.description);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.organizationService.findOrganizationById(id);
  }

  @Get()
  findAll() {
    return this.organizationService.findAllOrganizations();
  }
}
