import { Injectable, Scope } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Song } from './song.entity';
import { CreateSongDTO } from './dto/create-song-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateSongDto } from './dto/update-song.dto';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Artist } from 'src/artist/artist.entity';

@Injectable(
//{scope: Scope.TRANSIENT,}
)
export class SongsService {

  constructor(
    @InjectRepository(Song)
    private songsRepository: Repository<Song>,
    @InjectRepository(Artist)
    private artistsRepository: Repository<Artist>) { }


   async create(songDTO: CreateSongDTO) :Promise<Song> {
    const song = new Song();
    song.title = songDTO.title;
    song.artistNames = songDTO.artists;
    song.duration = songDTO.duration;
    song.lyrics = songDTO.lyrics;
    song.releasedDate = songDTO.releasedDate;

    //find all the artist on the base on id
    const artists = await this.artistsRepository.findByIds(songDTO.artists);


    //set the relation ith artist and songs
    song.artists = artists;

    return  this.songsRepository.save(song);
  }

  findAll() : Promise<Song[]> {
        return this.songsRepository.find()
    //return this.songs;
  }

  findOne(id: number): Promise<Song | null> {
    return this.songsRepository.findOneBy({ id });
  }

   remove(id: number): Promise<DeleteResult> {
     return this.songsRepository.delete(id);
    
  }

  update(id: number, recordToUpdate: UpdateSongDto): Promise<UpdateResult> {
    // const updateData = { ...recordToUpdate } as any;
    // if (updateData.artists !== undefined) {
    //   updateData.artistNames = updateData.artists;
    //   delete updateData.artists;
    // }
    return this.songsRepository.update(id, recordToUpdate);
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<Song>> {
    const queryBuilder = this.songsRepository.createQueryBuilder('c');
    queryBuilder.orderBy('c.releasedDate', 'DESC');

    return paginate<Song>(queryBuilder, options);
  }

  
}

