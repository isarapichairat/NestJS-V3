import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import path from 'path';
import { SongsController } from './songs/songs.controller';
import { DevConfigService } from './common/providers/DevConfigService';
import { DataSource } from 'typeorm';
import { Song } from './songs/song.entity';


const devConfig = {port: 3000};
const proConfig = {port: 4000};
@Module({
  imports: [TypeOrmModule.forRoot(
    {
      type: 'postgres',
      database: 'spotify-clone',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      entities: [Song],
      synchronize: true,
    }
  ),
    SongsModule],
  controllers: [AppController],
  providers: [AppService,{
    provide: DevConfigService,
    useClass: DevConfigService,
  },
  {
    provide: 'CONFIG',
    useFactory: () => {
      return process.env.NODE_ENV === 'development' ? devConfig : proConfig
    }
  }
],
})
export class AppModule implements NestModule{
  constructor(private dataSource: DataSource){
    console.log('dbName', dataSource.driver.database);
  }
  configure(consumer: MiddlewareConsumer) {
    //consumer.apply(LoggerMiddleware).forRoutes('songs');
    //consumer.apply(LoggerMiddleware).forRoutes({path: 'songs', method: RequestMethod.POST});//option 2

    consumer.apply(LoggerMiddleware).forRoutes(SongsController);
  }
}
