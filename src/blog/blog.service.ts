import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BlogRequestDTO, BlogRequestUpdateDTO } from './dto/blog.dto';
import { createWriteStream } from 'fs';
import { env } from 'process';

@Injectable()
export class BlogService {
  constructor(private prisma: PrismaService) {}

  async createBlog({ title, content, image }: BlogRequestDTO) {
    try {
      const { createReadStream, filename } = await image;
      const fileStream = createReadStream();

      fileStream.pipe(createWriteStream(`./public/${filename}`));

      const request = await this.prisma.blog.create({
        data: {
          title,
          content,
          image: `${env.DOMAIN}/${filename}`,
        },
      });

      return request;
    } catch (error) {
      throw new HttpException(error, 500, { cause: new Error('Error') });
    }
  }

  async getBlogs(page: number) {
    try {
      const response = await this.prisma.blog.findMany({
        take: page || 5,
        orderBy: [
          {
            createdAt: 'desc',
          },
        ],
      });
      return response;
    } catch (error) {
      throw new HttpException(error, 500, { cause: new Error('Error') });
    }
  }

  async getBlogById(id: number) {
    try {
      const response = await this.prisma.blog.findUnique({
        where: {
          id,
        },
      });
      return response;
    } catch (error) {
      throw new HttpException(error, 500, { cause: new Error('Error') });
    }
  }

  async updateBlog(id: number, body: BlogRequestUpdateDTO) {
    try {
      const { createReadStream, filename } = await body.image;
      const fileStream = createReadStream();

      fileStream.pipe(createWriteStream(`./public/${filename}`));
      const response = await this.prisma.blog.update({
        where: {
          id,
        },
        data: {
          title: body.title,
          content: body.content,
          image: `${env.DOMAIN}/${filename}`,
        },
      });

      return response;
    } catch (error) {
      throw new HttpException(error, 500, { cause: new Error('Error') });
    }
  }

  async deleteBlog(id: number) {
    try {
      const response = await this.prisma.blog.delete({
        where: {
          id,
        },
      });

      return response;
    } catch (error) {
      throw new HttpException(error, 500, { cause: new Error('Error') });
    }
  }
}
