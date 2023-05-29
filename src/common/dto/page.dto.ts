import { IsArray } from 'class-validator';

import { PageMetaDto } from './page-meta.dto';

export class PageDto<T> {
  @IsArray()
  readonly result: T[];

  readonly meta: PageMetaDto;

  constructor(result: T[], meta: PageMetaDto) {
    this.result = result;
    this.meta = meta;
  }
}
