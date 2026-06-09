import {
        Column,
        Entity,
        OneToMany,
        PrimaryGeneratedColumn
} from "typeorm";
import { Playlist } from 'src/playlists/playlist.entity';


@Entity("users")

export class User {

        @PrimaryGeneratedColumn()
        id!: number;

        @Column()
        firstName!: string;

        @Column()
        lastName!: string;

        @Column()
        email!: string;

        @Column()
        password!: string;

        @OneToMany(() => Playlist, (playList) => playList.user)
        playLists!: Playlist[];

}