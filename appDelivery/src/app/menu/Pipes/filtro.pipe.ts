import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filtro',
})
export class FiltroPipe implements PipeTransform {
  transform(value: any = [], filtroString: string, propName: string): any[] {
    const ArrayResultante = [];
    try {
      if (value.length === 0 || filtroString === '' || propName === '') {
        return value;
      }

      for (const item of value) {
        if (item[propName] === filtroString) {
          ArrayResultante.push(item);
        }
      }
      return ArrayResultante;
    } catch (error) {
      console.log('Pipe filtro tiene parametro nulo');
    }
  }
}

