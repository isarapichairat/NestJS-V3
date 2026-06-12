import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import { LoginDTO } from 'src/auth/dto/login.dto';
import * as bcrypt from "bcryptjs";
import { v4 as uuid4 } from "uuid";


@Injectable()
export class UsersService {
        constructor(
                @InjectRepository(User)
                private userRepository: Repository<User>,
        ) { }

        async create(userDTO: CreateUserDTO): Promise<User> {
                const user = new User();
                user.firstName = userDTO.firstName;
                user.lastName = userDTO.lastName;
                user.email = userDTO.email;
                user.apiKey = uuid4();

                const salt = await bcrypt.genSalt(); // 2.
                user.password = await bcrypt.hash(userDTO.password, salt); // 3.

                const savedUser = await this.userRepository.save(user);
                //delete savedUser.password;
                return savedUser;
        }

        async findOne(data: LoginDTO): Promise<User> {
                const user = await this.userRepository.findOneBy({ email: data.email });
                if (!user) {
                        throw new UnauthorizedException('Could not find user');
                }
                return user;
        }
        async findById(id: number): Promise<User> {
                const user = await this.userRepository.findOneBy({ id: id });
                if (!user) {
                        throw new NotFoundException('User not found');
                }
                return user;
        }

        async updateSecretKey(userId, secret: string): Promise<UpdateResult> {
                return this.userRepository.update(
                        { id: userId },
                        {
                                twoFASecret: secret,
                                enable2FA: true,
                        }
                )
        }

        async disable2FA(userId: number): Promise<UpdateResult> {
                return this.userRepository.update(
                        { id: userId },
                        {
                                enable2FA: false,
                                twoFASecret: '',

                        },
                );
        }


        async findByApiKey(apiKey: string): Promise<User> {
                const user = await this.userRepository.findOneBy({ apiKey });
                if (!user) {
                        throw new NotFoundException('Invalid API key');
                }
                return user;
        }
}