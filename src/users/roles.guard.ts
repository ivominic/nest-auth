import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './entities/role.enum';
import { User } from './entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    //const { user } = context.switchToHttp().getRequest();
    //Get user from token, or uncomment previous line to get user from session.
    const user: User = {
      name: 'John',
      roles: [Role.ADMIN],
    };
    //console.log('context', context.switchToHttp().getRequest());
    //console.log('USER', user);
    //console.log('ROLES', requiredRoles);

    //return true;
    return requiredRoles.some((role) => user.roles.includes(role));
  }
}
