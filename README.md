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
