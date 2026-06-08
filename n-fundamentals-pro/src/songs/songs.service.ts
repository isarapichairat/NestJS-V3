import { Injectable, Scope } from '@nestjs/common';

@Injectable(
//{scope: Scope.TRANSIENT,}
)
export class SongsService {
  private readonly songs: any[] = [];

  create(song: any) {
    this.songs.push(song);
    return this.songs;
  }

  findAll() {
    return this.songs;
  }
}