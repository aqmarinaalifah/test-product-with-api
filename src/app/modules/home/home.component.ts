import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';
import { Product } from './home.type';
import { HttpClientModule } from '@angular/common/http';
import { CarouselModule } from 'primeng/carousel';
import { ProductService } from './home.service';
import { MessageService } from 'primeng/api';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    IconFieldModule,
    InputTextModule,
    InputIconModule,
    ToastModule,
    HttpClientModule,
    CarouselModule,
    ProgressSpinnerModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [MessageService],
})
export class HomeComponent implements OnInit {
  @ViewChild('dt') dt!: Table;
  productList: Product[] = [];
  responsiveOptions: any[] | undefined;
  isloading: boolean = true;
  banner = [
    {
      id: 1,
      name: 'Freepik image shopping cart',
      source: 'assets/freepik-shopping.jpg',
    },
    {
      id: 2,
      name: 'Freepik image spring sale',
      source: 'assets/freepik-springsale.jpg',
    },
    {
      id: 3,
      name: 'Freepik image orange flash sale',
      source: 'assets/freepik-flash-sale.jpg',
    },
  ];

  constructor(
    private _productService: ProductService,
    private _router: Router,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.responsiveOptions = [
      {
        breakpoint: '1400px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1,
      },
      {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1,
      },
    ];

    this._productService.getProductList().subscribe(
      (response) => {
        this.isloading = false;
        this.productList = response.products;
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

  onDetail(id: string): void {
    this._router.navigate(['./product-detail', id]);
  }
}
