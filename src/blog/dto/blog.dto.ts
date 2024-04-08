import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { GraphQLUpload } from 'graphql-upload-ts';
import { Stream } from 'stream';

export interface FileUpload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => Stream;
}

@InputType()
export class BlogRequestDTO {
  @Field()
  @IsString()
  readonly title: string;

  @Field()
  @IsString()
  readonly content: string;

  @Field(() => GraphQLUpload)
  readonly image: Promise<FileUpload>;
}

@InputType()
export class BlogRequestUpdateDTO {
  @Field()
  @IsString()
  readonly title: string;

  @Field()
  @IsString()
  readonly content: string;

  @Field(() => GraphQLUpload)
  readonly image: Promise<FileUpload>;
}

@ObjectType()
export class BlogResponseDTO {
  @Field(() => String)
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  content: string;

  @Field(() => String)
  image: string;
}
