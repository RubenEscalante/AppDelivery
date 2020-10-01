import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paginacion',
})
export class PaginacionPipe implements PipeTransform {
  transform(value: any[], page_size: number, page_number: number): any[] {
    if (!value.length) return [];
    if (page_size === 0) {
      return value;
    }
    page_size = page_size || 5;
    page_number = page_number || 1;
    --page_number;
    return value.slice(page_number * page_size, (page_number + 1) * page_size);
  }
}

