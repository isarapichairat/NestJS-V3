import { IsArray, IsDateString, IsNotEmpty, IsString, Matches } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSongDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  artists: string[];

  @IsDateString()
  @IsNotEmpty()
  releaseDate: string;

  @IsNotEmpty()
  @Matches(/^([01]\d|2[0-3]):[0-5]\d$/, {
    message: 'duration must be a valid representation of military time in the format HH:MM',
  })
  duration: string;
}