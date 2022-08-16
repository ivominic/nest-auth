import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {
    async function validateUser(
      username: string,
      password: string,
    ): Promise<any> {
      const user = await this.usersService.findOne(username);

      if (user && user.password === password) {
        //This way we return user object without username and password value
        const { username, password, ...rest } = user;
        return rest;
      }
      return null;
    }
  }
}
