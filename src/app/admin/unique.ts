import { PipeTransform, Pipe } from '@angular/core';
import * as moment from 'moment';
@Pipe({
    name: 'unique',
    pure:false
})
export class UniquePipe implements PipeTransform {

    transform(value: any, args?: any): any {

        // Remove the duplicate elements
        let uniqueArray = value.filter(function (el, index, array) { 
          return array.indexOf (el) == index;
        });
    
        return uniqueArray;
      }
}