import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BlogService } from './blog.service';
import {
  BlogRequestDTO,
  BlogRequestUpdateDTO,
  BlogResponseDTO,
} from './dto/blog.dto';
import { HttpException } from '@nestjs/common';

@Resolver(() => {})
export class BlogResolver {
  constructor(private readonly blogService: BlogService) {}

  @Mutation(() => BlogResponseDTO)
  async createBlog(@Args('body') body: BlogRequestDTO): Promise<any> {
    try {
      return this.blogService.createBlog(body);
    } catch (error) {
      throw new HttpException(error, 500, { cause: new Error('Error') });
    }
  }

  @Mutation(() => BlogResponseDTO)
  async updateBlog(
    @Args('id') id: number,
    @Args('body') body: BlogRequestUpdateDTO,
  ): Promise<any> {
    try {
      return this.blogService.updateBlog(id, body);
    } catch (error) {
      throw new HttpException(error, 500, { cause: new Error('Error') });
    }
  }

  @Mutation(() => BlogResponseDTO)
  async deleteBlog(@Args('id') id: number): Promise<any> {
    try {
      return this.blogService.deleteBlog(id);
    } catch (error) {
      throw new HttpException(error, 500, { cause: new Error('Error') });
    }
  }

  @Query(() => [BlogResponseDTO])
  async getBlogs(@Args('page') page: number): Promise<any> {
    try {
      return this.blogService.getBlogs(page);
    } catch (error) {
      throw new HttpException(error, 500, { cause: new Error('Error') });
    }
  }

  @Query(() => BlogResponseDTO)
  async getBlogById(@Args('id') id: number): Promise<any> {
    try {
      return this.blogService.getBlogById(id);
    } catch (error) {
      throw new HttpException(error, 500, { cause: new Error('Error') });
    }
  }
}
