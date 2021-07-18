import {HttpParams} from '@angular/common/http';

export const DEFAULT_PAGE_SIZE = 10;
export const EMPTY_PAGE: Page<any> = {content: [], number: 0, totalElements: 0, totalPages: 0};

export interface Page<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  number: number;
}

export interface Pageable {
  page: number;
  size: number;
  sort?: { key: string; value: string };
}

export class PageRequest implements Pageable {
  page = 1;
  size = DEFAULT_PAGE_SIZE;
  sort?: { key: string; value: string };
}

export function pageParams<T>(query?: T, pageable?: Pageable): HttpParams {
  let params = new HttpParams()
    .set('page', pageable ? (pageable.page - 1).toString() : '0')
    .set('size', pageable ? pageable.size.toString() : DEFAULT_PAGE_SIZE.toString());

  if (pageable && pageable.sort) {
    params = params.set('sort', pageable.sort.value === 'ascend' ? `${pageable.sort.key},ASC` : `${pageable.sort.key},DESC`);
  }

  if (query) {
    Object.keys(query).forEach(key => {
      let value = (query as any)[key];
      if (value === '') {
        return;
      }
      if (value instanceof Date) {
        value = value.toISOString();
      }
      params = params.set(key, value);
    });
  }

  return params;
}
