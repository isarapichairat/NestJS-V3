import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions, } from "@nestjs/typeorm";
import { DataSourceOptions } from "typeorm";
import { User } from "src/users/user.entity";
import { Playlist } from "src/playlists/playlist.entity";
import { Artist } from "src/artists/artist.entity";
import { Song } from "src/songs/song.entity";
export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (
                configService: ConfigService
        ): Promise<TypeOrmModuleOptions> => {
                return {
                        type: "postgres",
                        host: configService.get<string>("dbHost"),
                        port: configService.get<number>("dbPort"),
                        username: configService.get<string>("dbUsername"),
                        database: configService.get<string>("dbName"),
                        password: configService.get<string>("dbPassword"),
                        entities: [User, Playlist, Artist, Song],
                        synchronize: false,
                        migrations: ["dist/db/migrations/*.js"],
                };
        },
};
export const dataSourceOptions: DataSourceOptions = {
        type: "postgres",
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT ?? '5432', 10),
        username: process.env.DB_USERNAME ?? process.env.USERNAME,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD ?? process.env.PASSWORD,
         entities: [User, Playlist, Artist, Song],
        synchronize: false,
        migrations: ["dist/db/migrations/*.js"],
};