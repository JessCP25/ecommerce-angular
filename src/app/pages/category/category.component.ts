import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  categoryId: string | null = null;
  productId: string | null = null;
  limit = 10;
  offset = 0;
  products: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((paramMap) => {
          this.categoryId = paramMap.get('id');
          if (this.categoryId !== null) {
            return this.productService.getByCategory(
              this.categoryId!,
              this.limit,
              this.offset
            );
          }
          return [];
        })
      )
      .subscribe((res) => {
        this.products = res;
      });
    this.route.queryParamMap.subscribe((params)=>{
      this.productId = params.get('product');
    })
  }

  // getProducts() {
  //   this.productService
  //     .getByCategory(this.categoryId!, this.limit, this.offset)
  //     .subscribe({
  //       next: (res) => {
  //         this.products = res;
  //       },
  //     });
  // }

  loadMore() {
    this.productService
      .getByCategory(this.categoryId!, this.limit, this.offset)
      .subscribe((data) => {
        this.products = this.products.concat(data);
        this.offset += this.limit;
      });
  }
}
