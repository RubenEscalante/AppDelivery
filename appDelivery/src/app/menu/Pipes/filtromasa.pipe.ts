import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filtromasa',
})
export class FiltromasaPipe implements PipeTransform {
  transform(value: any = [],  propName: string): any[] {
    const ArrayResultante = [];
    console.log(propName);

    try {
      if (value.length === 0 || propName === '') {
        return value;
      }

      for (const item of value) {
        if (item.preferencias.masa === null) {
          console.log('Es nulo');
        } else {
          if (item.preferencias.masa === propName) {
            ArrayResultante.push(item);
            console.log(item.preferencias.masa);
          }
        }

      }

      return ArrayResultante;
    } catch (error) {
      console.log('Pipe filtro tiene parametro nulo');
    }
  }
}

