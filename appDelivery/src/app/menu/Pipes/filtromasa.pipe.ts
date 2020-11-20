import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filtromasa',
})
export class FiltromasaPipe implements PipeTransform {
  transform(value: any = [],  propName: string): any[] {
    const ArrayResultante = [];


    try {
      if (value.length === 0 || propName === '') {
        return value;
      }

      for (const item of value) {
        if (item.preferencias.masa === null) {

        } else {
          if (item.preferencias.masa === propName) {
            ArrayResultante.push(item);

          }
        }

      }

      return ArrayResultante;
    } catch (error) {

    }
  }
}

