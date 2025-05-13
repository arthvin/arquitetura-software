import { Controller, Get, Query } from '@nestjs/common';
import { NameService } from '../services/name.service';
import { AnalysisService } from '../services/analysis.service';

@Controller('names')
export class NameController {
  constructor(
    private readonly nameService: NameService,
    private readonly analysisService: AnalysisService,
  ) {}

  @Get('evolucao')
  async getEvolution(
    @Query('name') name: string,
    @Query('start') start: number,
    @Query('end') end: number,
  ) {
    const data = await this.nameService.getNameData(name);
    return this.analysisService.getRankingEvolution(data, start, end);
  }

  @Get('comparar')
  async compareNames(
    @Query('name1') name1: string,
    @Query('name2') name2: string,
  ) {
    const d1 = await this.nameService.getNameData(name1);
    const d2 = await this.nameService.getNameData(name2);
    return this.analysisService.compareNames(d1, d2);
  }

  @Get('localidade')
  async namesByLocality(
    @Query('uf') uf: number,
  ) {
    const common = ['Maria', 'Jose', 'Ana'];
    const data = await Promise.all(
      common.map((n) => this.nameService.getNameByLocality(n, uf)),
    );

    return data.map((nameData, idx) => ({
      name: common[idx],
      data: nameData[0].res,
    }));
  }
}
