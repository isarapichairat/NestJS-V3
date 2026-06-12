import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artist } from './artist.entity';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private artistRepo: Repository<Artist>,
  ) {}

  async findArtist(userId: number): Promise<Artist | null> {
    const artist = await this.artistRepo.findOneBy({ user: { id: userId } });
    if (!artist) return null;
    return artist;
  }
}