import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Song,SongSchema } from './schemas/song';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Song.name, schema: SongSchema }]), //1
  ],
  controllers: [SongsController],
  providers: [SongsService]
})
export class SongsModule { }
