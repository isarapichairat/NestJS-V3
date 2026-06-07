import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { connect } from 'http2';
import { connection } from 'src/common/constatnts/connection';

const mockSongsService = {
  findAll(){
    return [{ id: 1, title: 'Lasting Love', artists: ['Siagla']}];
  }
}
@Module({
  controllers: [SongsController],
  providers: [
    SongsService,
    // {
    //   provide: SongsService,
    //   useClass: SongsService,
    // },
    // {
    //   provide: SongsService,
    //   useValue: mockSongsService,
    // },
    {
      provide: 'CONNECTION',
      useValue: connection,
    },


    ]
})
export class SongsModule {}
