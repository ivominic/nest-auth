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
