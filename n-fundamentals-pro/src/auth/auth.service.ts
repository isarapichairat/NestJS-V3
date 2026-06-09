import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDTO } from './dto/login.dto';
import { User } from 'src/users/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
        constructor(private userService: UsersService) { }

        async login(loginDTO: LoginDTO): Promise<Omit<User, 'password'>> {
                const user = await this.userService.findOne(loginDTO);
                const passwordMatched = await bcrypt.compare(loginDTO.password, user.password);

                if (passwordMatched) {
                        const { password, ...result } = user;
                        return result;
                } else {
                        throw new UnauthorizedException('Password does not match');
                }
        }
}