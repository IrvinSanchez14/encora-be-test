import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { BlogService } from './blog.service';
import { BlogResolver } from './blog.resolver';

@Module({
  imports: [PrismaModule],
  providers: [PrismaService, BlogResolver, BlogService],
  exports: [],
})
export class BlogModule {}
