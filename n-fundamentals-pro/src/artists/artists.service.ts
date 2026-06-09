import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artist } from './artist.entity';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private artistRepo: Repository<Artist>,
  ) {}

  async findArtist(userId: number): Promise<Artist> {
  const artist = await this.artistRepo.findOneBy({ user: { id: userId } });
  if (!artist) throw new NotFoundException(`Artist not found for user ${userId}`);
  return artist;
}
}