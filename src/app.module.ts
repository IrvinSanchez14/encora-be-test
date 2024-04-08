import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import {
  DirectiveLocation,
  GraphQLDirective,
  GraphQLFormattedError,
} from 'graphql';

import { PrismaModule } from './prisma/prisma.module';
import { join } from 'path';
import { BlogModule } from './blog/blog.module';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    PrismaModule,
    BlogModule,
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      installSubscriptionHandlers: true,
      buildSchemaOptions: {
        directives: [
          new GraphQLDirective({
            name: 'upper',
            locations: [DirectiveLocation.FIELD_DEFINITION],
          }),
        ],
      },
      formatError: (error) => {
        const originalError = error.extensions
          ?.originalError as GraphQLFormattedError;

        if (!originalError) {
          return {
            message: error.message,
            code: error.extensions?.code,
          };
        }
        return {
          message: originalError.message,
          code: error.extensions?.code,
        };
      },
      context: ({ req, res, payload, connection }) => ({
        req,
        res,
        payload,
        connection,
        headers: req.headers,
      }),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../public'),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
