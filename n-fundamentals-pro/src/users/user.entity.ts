import {
        Column,
        Entity,
        OneToMany,
        PrimaryGeneratedColumn
} from "typeorm";
import { Playlist } from 'src/playlists/playlist.entity';
import { Exclude } from "class-transformer";


@Entity("users")

export class User {

        @PrimaryGeneratedColumn()
        id!: number;

        @Column()
        firstName!: string;

        @Column()
        lastName!: string;

        @Column({ unique: true })
        email!: string;

        @Column()
        @Exclude()
        password!: string;

        @OneToMany(() => Playlist, (playList) => playList.user)
        playLists!: Playlist[];

        // user.entity.ts
        @Column({ nullable: true, type: 'text' })
        twoFASecret: string;
        @Column({ default: false, type: 'boolean' })
        enable2FA: boolean;

        @Column()
        apiKey: string;

}