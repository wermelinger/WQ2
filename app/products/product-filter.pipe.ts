import { Pipe, PipeTransform } from 'angular2/core';
import { IProduct } from './product';

@Pipe({
    name: 'productFilter'
})
export class ProductFilterPipe implements PipeTransform {
    transform(value: IProduct[], args: string[]): IProduct[] {
        let filter: string = args[0].toLocaleLowerCase ? args[0] : null;
        return filter ? value.filter((p: IProduct) => p.productName.toLocaleLowerCase().indexOf(filter) != -1) : value;
    }
}