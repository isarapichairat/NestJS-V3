import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import { LoginDTO } from 'src/auth/dto/login.dto';
import * as bcrypt from "bcryptjs";


@Injectable()
export class UsersService {
        constructor(
                @InjectRepository(User)
                private userRepository: Repository<User>,
        ) { }

        async create(userDTO: CreateUserDTO): Promise<User> {
                const salt = await bcrypt.genSalt(); // 2.
                userDTO.password = await bcrypt.hash(userDTO.password, salt); // 3.
                const user = await this.userRepository.save(userDTO); // 4.
                delete (user as Partial<User>).password; // 5.
                return user; // 6.
        }

        async findOne(data: LoginDTO): Promise<User> {
                const user = await this.userRepository.findOneBy({ email: data.email });
                if (!user) {
                        throw new UnauthorizedException('Could not find user');
                }
                return user;
        }
}