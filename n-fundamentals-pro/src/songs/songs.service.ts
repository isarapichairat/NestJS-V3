import { Injectable } from '@nestjs/common';

@Injectable()
export class SongsService {
        //local db
        //local array

        private readonly songs: any = [];

        create(song: any){
                //save this song to db
                this.songs.push(song);
                return this.songs;
        }
        findAll(){
                //fetch the song from db
                //Errror comes while fetching the data from db
                throw new Error('Error in db while fetching recode')
                return this.songs;
        }
}
