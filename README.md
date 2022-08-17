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

### Session

First, we created authenticated.guard file, for working with sessions. There we will export AuthenticateGuard, with canActivate method that reads data from context and uses passport methods to check if user is authenticated. Then we will use guard on protected route of app.controller and pass AuthenticatedGuard. At this point, error request.isAuthenticated() could be thrown. We need to install session module using command:
npm install express-session
In main.ts file we are adding some imports for session and passport, and then configure app to use session configuration we provide, as wel as passport.initialize() and passport.session().
Finally we need to create session.serializer.ts file that will contain methods to serialize/deserialize session object (user). Session serializer need to be registered into auth.module and in the providers of the same file we need to add register to PassportModule with session: true as a object. Not sure that this last part (registering) is needed.
One last thing to do is to add async method canActivate() into LocalAuthGuard, where we will trigger super.logIn(). This is needed for sessions.
