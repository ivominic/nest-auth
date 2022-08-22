# Authentication and authorizations

## Passport

We are going to use passport module, for authentication in nestjs. Installing it with the following command:
npm install --save @nestjs/passport passport passport-local
We can install types for strategies, using command:
npm install --save-dev @types/passport-local

## Users & auth

After that, created resource users using command:
nest g resource users
Create export type User in users.service file, and then async method findOne(username).
In users module, we are adding exports [UsersService] to be able to use it from other modules.
Then we are going to create an auth module and a service, and importing UserService. Then we create validateUser async function that returns user object if username and password match with some of existing users.
After that we create auth module and service, and create file local.strategy.ts in the same folder. There we need to call super() inside of the constructor. Additional configuration, if needed, should be done in constructor, as a parameter of super(). Almost all strategies require some async validate() function. PassportModule should be added to AuthModule as well as LocalStrategy.

### Guards

We are adding, inside auth folder, file local-auth.guard.ts, that will be exporting AuthGuard for, in this case, 'local' strategy. If we would like to use Twitter strategy we would provide parameter 'twitter' instead of 'local'.
After that, we need to decorate login method, in app controller, with @UseGuards decorator and provide LocalAuthGuard as a parameter.
User that we return from validate() method of LocalStrategy is attached to @Request object.

### JWT

First, install necessary packages and types:
npm install --save @nestjs/jwt passport-jwt
npm install -D @types/passport-jwt

Inside auth.service import JwtService and create async login method that will return access_token. Then, register JwtModule inside AuthModule, registering secret and providing some basic options. From AuthModule, we need to export AuthService, to be used in other modules (AppController).
Inside auth folder will be created jwt.strategy.ts file where we are going to configure jwt strategy. Strategies are defined inside of constructor. Function validate, in this file, only returns data, because real validation has been done in super() method, using jwtFromRequest. Validate function can be used for additional logic, to read additional data about user and return those data. Data will be returned in protected route of app.controller in req.user. To invoke jwt extraction, we need to create new guard, in auth folder. We will name it jwt-auth.guard.ts. JwtStrategy needs to be added inside auth.module to register it and after that we can utilize it. After that, only thing we need to do is to add UseGuard decorator with JwtAuthGuard over each method we want to protect.

## RBAC

For role based authorization we are going to create User class inside user.entity.ts file. Also, we are going to create some enum roles in role.enum.ts file, with roles user and admin. One way to provide RBAC is to add decorator @SetMetadata('roles', ROLE.ADMIN). This way has it's drawbacks because it needs to import MetaData in all controllers. Instead, we can create file roles.decorator.ts, set Roles in that file, and provide methods with Roles decorator. Then we need to create roles guard. It is going to be done in file roles.guard.ts. If method canActivate, from this file, returns true, user can access that method, otherwise it returns 403: forbidden. Before that, we need to register RolesGuard as provider in app.module.ts. Registration is specific and that way RolesGuard is registered globally, across whole application. That is all that needs to be done. Only thing left is to implement logic inside canActivate method (roles.guard.ts) that will return true or false depending on roles user has. First line gets all required roles for accessed method, second gets user from request, and third returns true or false, depending if any user's role matches any required role.
_IMPORTANT_ This would be easier to do with session authentication. I continued to work on JWT authentication branch. Commented line const { user } = context.switchToHttp().getRequest(); extracts user from session. In our example, I created test user with fixed roles.
