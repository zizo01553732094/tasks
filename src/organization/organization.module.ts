import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrganizationController } from './organization.controller';
import { OrganizationService } from './organization.service';
import { Organization, OrganizationSchema } from './organization.schema'; // Organization entity
import { AuthModule } from '../auth/auth.module'; // Importing AuthModule for dependency injection

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Organization.name, schema: OrganizationSchema }]),
    AuthModule, // Inject AuthModule if you need authentication for the organization routes
  ],
  controllers: [OrganizationController],
  providers: [OrganizationService],
})
export class OrganizationModule {}
