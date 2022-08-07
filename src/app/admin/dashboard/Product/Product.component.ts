import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { HomeDto } from 'src/app/core/DTOs/Home/HomeDto';
import { ProductDto } from 'src/app/core/DTOs/Products/ProductDto';
import { PromotionDto } from 'src/app/core/DTOs/Promotions/PromotionDto';

@Component({
  selector: 'app-test',
  templateUrl: './Product.component.html',
  styleUrls: ['./Product.component.sass']
})
export class ProductComponent implements OnInit {


  homes: HomeDto[];
  products: ProductDto[];
  promotions: PromotionDto[];
  sortOptions: SelectItem[];

  sortKey: string;

  sortField: string;

  sortOrder: number;
  Productervice: any;
  constructor() { }

  ngOnInit(): void {
    /* this.Productervice.getAll().subscribe( data => {
      this.products = data
      console.log(this.products);
    }, error => console.log(error));
 */
    this.Productervice.create()

    this.sortOptions = [
      {label: 'Newest First', value: '!year'},
      {label: 'Oldest First', value: 'year'},
      {label: 'Brand', value: 'brand'}
  ];

  $('.grid-nogutter').addClass('row');
  }

  onSortChange(event) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
    }
    else {
        this.sortOrder = 1;
        this.sortField = value;
    }
}

}
