import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { BusinessService } from 'src/business/business.service';
import { AuthenticatedUser } from '../interfaces/authenticated-user.interface';

@Injectable()
export class OwnerGuard implements CanActivate {
  constructor(
    private readonly businessService: BusinessService,
    private readonly reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as AuthenticatedUser; // Authenticated user (extracted from JWT token)
    const businessId = request.params.id; // Business ID from URL

    if (!user || !businessId) {
      throw new ForbiddenException('Unauthorized');
    }

    const business = await this.businessService.findOne(Number(businessId));

    if (!business) {
      throw new ForbiddenException('Business not found');
    }

    if (business.ownerId !== user.sub) {
      throw new ForbiddenException('You do not have permission to access this business');
    }

    return true;
  }
}
