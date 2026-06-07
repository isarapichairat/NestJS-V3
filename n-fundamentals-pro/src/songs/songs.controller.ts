import { Controller, Delete, Post, Get, Put, Body } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './dto/create-song-dto';


@Controller('songs')
export class SongsController {

        constructor(private songService: SongsService){}

        @Post()
        create(@Body() createSongDTO : CreateSongDTO){
                return this.songService.create(createSongDTO);
        }
        @Get()
        findAll(){
                return this.songService.findAll();
        }

        @Get(':id')
        findOne(){
                return 'fetch song on the based on id';
        }

        @Put(':id')
        update(){
                return 'update song on the based on id';
        }

        @Delete(':id')
        delete(){
                return 'delete song on the based on id';
        }
}
