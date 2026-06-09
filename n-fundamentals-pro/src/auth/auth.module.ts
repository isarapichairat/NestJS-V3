import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ArtistsModule } from 'src/artists/artists.module';
import { authConstants } from './auth.constants';
import { JwtStrategy } from './jwt-strategy';


@Module({
  imports: [UsersModule, ArtistsModule, JwtModule.register({ secret: authConstants.secret, 
    signOptions: {expiresIn: '1d',
      },})],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
