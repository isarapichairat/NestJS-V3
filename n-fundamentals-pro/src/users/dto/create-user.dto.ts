import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class CreateUserDTO {
        @ApiProperty({
                example: "Jane",
                description: "Provide the first name of the user",
        })
        @IsString()
        @IsNotEmpty()
        firstName: string;


        @ApiProperty({
                example: "Doe",
                description: "provide the lastName of the user",
        })
        @IsString()
        @IsNotEmpty()
        lastName: string;


        @ApiProperty({
                example: "jane_doe@gmail.com",
                description: "Provide the email of the user",
        })
        @IsEmail()
        @IsNotEmpty()
        email: string;


        @ApiProperty({
                example: "test123#@",
                description: "Provide the password of the user",
        })
        @IsString()
        @IsNotEmpty()
        password: string;
}
