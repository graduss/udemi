import { Module } from '@nestjs/common';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportEntit } from './report.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReportEntit])],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}
