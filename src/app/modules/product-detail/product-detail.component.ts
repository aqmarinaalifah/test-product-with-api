import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { ProductService } from '../home/home.service';
import { Product } from '../home/home.type';
import { MessageService } from 'primeng/api';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CurrencyPipe, CommonModule, ProgressSpinnerModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
  providers: [MessageService, CurrencyPipe],
})
export class ProductDetailComponent implements OnInit {
  productDetail!: Product;
  id: any;
  isloading: boolean = true;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _productService: ProductService,
    private _router: Router,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.id = this._activatedRoute.snapshot.paramMap.get('id');
    this._productService.getProductById(this.id).subscribe(
      (response) => {
        this.isloading = false;
        this.productDetail = response;
      },
      (error) => {
        this.isloading = false;
        this.messageService.add({
          severity: 'error',
          summary: error.error.message,
          styleClass: 'bg-red-100',
        });
      },
    );
  }

  onBack(): void {
    this._router.navigate(['./home']);
  }
}
