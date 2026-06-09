import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Playlist } from "./playlist.entity";
import { Song } from "src/songs/song.entity";
import { User } from "src/users/user.entity";
import { PlayListsController } from "./playlists.controller";
import { PlayListsService } from "./playlists.service";

@Module({
        imports: [TypeOrmModule.forFeature([Playlist, Song, User])],
        controllers: [PlayListsController],
        providers: [PlayListsService],
})

export class PlayListModule {}