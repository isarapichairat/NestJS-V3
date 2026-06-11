import { Controller, Delete, Post, Get, Put, Body, HttpException, HttpStatus, Param, ParseIntPipe, Inject, Scope, Query, DefaultValuePipe, UseGuards } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './dto/create-song-dto';
import type { Connection } from 'src/common/constatnts/connection';
import { Song } from './song.entity';
import { DeleteResult } from 'typeorm';
import { UpdateSongDto } from './dto/update-song.dto';
import { UpdateResult } from 'typeorm';
import { Pagination } from 'nestjs-typeorm-paginate';
import { ArtistJwtGuard } from 'src/auth/artists-jwt-guard';
import { Request } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('songs')
@ApiTags('songs')
export class SongsController {

        constructor(private songsService: SongsService) { }

        @Post()
        @UseGuards(ArtistJwtGuard)
        create(@Body() createSongDTO: CreateSongDTO,
                @Request()
                request,): Promise<Song> {
                        console.log(`request.user:`,request.user);
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
                @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
                id: number,
        ): Promise<Song | null> {
                return this.songsService.findOne(id);
        }

        @Put(':id')
        update(
                @Param('id', ParseIntPipe) id: number,
                @Body() updateSongDTO: UpdateSongDto,
        ): Promise<UpdateResult> {
                return this.songsService.update(id, updateSongDTO);
        }

        @Delete(':id')
        delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
                return this.songsService.remove(id);
        }
}
