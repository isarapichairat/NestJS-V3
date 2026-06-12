//src/songs/schemas/song.ts
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
export type SongDocument = HydratedDocument<Song>;
@Schema()
export class Song {
        @Prop({
                required: true,
        })
        title: string;
        @Prop({
                required: true,
        })
        releasedDate: Date;
        @Prop({
                required: true,
        })
        duration: string;
        lyrics: string;
}
export const SongSchema = SchemaFactory.createForClass(Song);