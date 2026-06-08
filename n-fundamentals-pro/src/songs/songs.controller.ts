import { Controller, Delete, Post, Get, Put, Body, HttpException, HttpStatus, Param, ParseIntPipe, Inject, Scope, Query, DefaultValuePipe } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './dto/create-song-dto';
import type { Connection } from 'src/common/constatnts/connection';
import { Song } from './song.entity';
import { DeleteResult } from 'typeorm';
import { UpdateSongDto } from './dto/update-song.dto';
import { UpdateResult } from 'typeorm';
import { Pagination } from 'nestjs-typeorm-paginate';


@Controller({path: 'songs', scope: Scope.REQUEST})
export class SongsController {

        constructor(private songsService: SongsService,
                @Inject('CONNECTION')
                private connection: Connection,
        ){
                console.log(`this is connection string ${this.connection.CONNECTION_STRING}`);
        }

        @Post()
        create(@Body() createSongDTO : CreateSongDTO): Promise<Song>
        {
                return this.songsService.create(createSongDTO);
        }
        @Get()
        findAll(
                @Query('page', new DefaultValuePipe(1), ParseIntPipe)
                page = 1,
                @Query('limit', new DefaultValuePipe(10), ParseIntPipe)
                limit = 10,
        ): Promise<Pagination<Song>> {
                limit = limit > 100 ? 100 : limit;
                return this.songsService.paginate({
                        page,
                        limit,
                });
        }

        @Get(':id')
        findOne(
                @Param('id',new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE}))
                id: number,
        ) : Promise<Song | null>{
                return this.songsService.findOne(id);
        }

        @Put(':id')
        update(
                @Param('id', ParseIntPipe) id: number,
                @Body() updateSongDTO: UpdateSongDto,
        ): Promise<UpdateResult>{
                 return this.songsService.update(id, updateSongDTO);
        }

        @Delete(':id')
        delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult>{
                return this.songsService.remove(id);
        }
}
