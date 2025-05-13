import { Injectable } from '@nestjs/common';

@Injectable()
export class AnalysisService {
  getRankingEvolution(data: any, start: number, end: number) {
    const results = data[0].res.filter((entry) => {
      const decade = parseInt(entry.periodo.split('[')[1].split(',')[0]);
      return decade >= start && decade <= end;
    });

    return results.map((r) => ({
      decade: r.periodo,
      frequency: r.frequencia,
    }));
  }

  compareNames(data1: any, data2: any) {
    const decades1 = data1[0].res;
    const decades2 = data2[0].res;

    return decades1.map((d1, index) => ({
      decade: d1.periodo,
      name1: d1.frequencia,
      name2: decades2[index]?.frequencia || 0,
    }));
  }
}
