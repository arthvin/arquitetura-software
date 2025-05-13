import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class NameService {
  constructor(private readonly httpService: HttpService) {}

  async getNameData(name: string) {
    const url = `https://servicodados.ibge.gov.br/api/v2/censos/nomes/${name}`;
    const response = await firstValueFrom(this.httpService.get(url));
    return response.data;
  }

  async getNameByLocality(name: string, uf: number) {
    const url = `https://servicodados.ibge.gov.br/api/v2/censos/nomes/${name}?localidade=${uf}`;
    const response = await firstValueFrom(this.httpService.get(url));
    return response.data;
  }
}
