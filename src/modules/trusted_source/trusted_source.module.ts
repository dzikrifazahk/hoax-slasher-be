import { Module } from '@nestjs/common';
import { TrustedSourceService } from './trusted_source.service';
import { TrustedSourceController } from './trusted_source.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrustedSourceEntity } from './entities/trusted_source.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TrustedSourceEntity])],
  controllers: [TrustedSourceController],
  providers: [TrustedSourceService],
})
export class TrustedSourceModule {}
