import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import appConfig from 'config/app.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOpt } from 'database/data-source';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { CommunityModule } from './modules/community/community.module';
import { NewsModule } from './modules/news/news.module';
import { TrustedSourceModule } from './modules/trusted_source/trusted_source.module';
import { DebunkingModule } from './modules/debunking/debunking.module';
import { EventsModule } from './modules/events/events.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '/public/'),
      serveStaticOptions: { index: false },
    }),
    ConfigModule.forRoot({
      load: [appConfig],
    }),
    TypeOrmModule.forRoot({
      ...dataSourceOpt,
      autoLoadEntities: true,
    }),
    UsersModule,
    AuthModule,
    NewsModule,
    DebunkingModule,
    TrustedSourceModule,
    CommunityModule,
    EventsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
