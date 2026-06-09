import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDTO } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginDTO: LoginDTO): Promise<{ accessToken: string }> {
    const user = await this.userService.findOne(loginDTO);

    const passwordMatched = await bcrypt.compare(loginDTO.password, user.password);

    if (passwordMatched){
        delete (user as Partial<User>).password;
        const payload = {email:user.email,sub: user.id};

        return {
                accessToken: this.jwtService.sign(payload),
        };
    }else {
        throw new UnauthorizedException('Password does not match');
    }
  }
}