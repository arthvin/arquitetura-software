import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { NameController } from './controller/name.controller';
import { NameService } from './services/name.service';
import { AnalysisService } from './services/analysis.service';

@Module({
  imports: [HttpModule],
  controllers: [NameController],
  providers: [NameService, AnalysisService],
})
export class AppModule {}
