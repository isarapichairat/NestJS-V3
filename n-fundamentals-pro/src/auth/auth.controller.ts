import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { CreateUserDTO } from "src/users/dto/create-user.dto";
import { User } from "src/users/user.entity";
import { UsersService } from "src/users/users.service";
import { AuthService } from "./auth.service";
import { LoginDTO } from "./dto/login.dto";
import { JwtAuthGaurd } from "./jwt-guard";
import { Enable2FAType } from "./types";
import { ValidateTokenDTO } from "./dto/validate-token.dto";
import { UpdateResult } from "typeorm";
import { LoginResponseType } from "./types";
import { AuthGuard } from "@nestjs/passport";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { ApiBody } from "@nestjs/swagger";

@Controller("auth")
@ApiTags("auth")
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) { }

  @Post("signup")
  @ApiOperation({ summary: 'Register new user' })
  @ApiResponse({
    status: 201,
    description: 'It will return the user in the response',
  })
  signup(@Body()
  userDTO: CreateUserDTO,
  ): Promise<User> {
    return this.userService.create(userDTO);
  }
  @ApiBody({ type: LoginDTO })
  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({
    status: 200,
    description: 'It will give you the access_token in the response',
  })
  async login(@Body() loginDTO: LoginDTO): Promise<LoginResponseType> {
    return this.authService.login(loginDTO);
  }

  @Get('enable-2fa')
  @UseGuards(JwtAuthGaurd)
  enable2FA(
    @Request()
    req,
  ): Promise<Enable2FAType> {
    console.log(req.user);
    return this.authService.enable2FA(req.user.userId);
  }

  @Post('validate-2fa')
  @UseGuards(JwtAuthGaurd)
  validate2FA(
    @Request()
    req,
    @Body()
    ValidateTokenDTO: ValidateTokenDTO,
  ): Promise<{ verified: boolean }> {
    return this.authService.validate2FAToken(
      req.user.userId,
      ValidateTokenDTO.token,
    );
  }

  @Get('disable-2fa')
  @UseGuards(JwtAuthGaurd)
  disable2FA(
    @Request()
    req,
  ): Promise<UpdateResult> {
    return this.authService.disable2FA(req.user.userId);
  }


  //auth.controller.ts
  @Get('profile')
  @UseGuards(AuthGuard('bearer'))
  getProfile(
    @Request()
    req,
  ) {
    delete req.user.password;
    return {
      msg: 'authenticated with api key',
      user: req.user,
    };
  }

  @Get('test')
  testEnv() {
    return this.authService.getEnvVariables();
  }
}