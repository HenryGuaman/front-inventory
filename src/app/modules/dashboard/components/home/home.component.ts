import { Component, OnInit, inject } from '@angular/core';
import { Chart } from 'chart.js';
import { ProductElement } from 'src/app/modules/product/product/product.component';
import { ProductService } from 'src/app/modules/shared/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  
  private productService = inject(ProductService)
  chartBar: any;
  chartDoughnut: any;


  ngOnInit(): void {
   this.getProducts(); 
  }

  getProducts(){
    this.productService.getProducts()
          .subscribe((data: any) => {
            console.log("Respuesta de productos: ", data);
            this.processProductResponse(data);
          },(error: any)=>{
            console.log("Error en productos: ", error);
          })
  }

  processProductResponse(resp: any){
    const nameProduct: String [] = [];
    const account: number[] = [];

    if(resp.metadata[0].code == "00"){
      let listCProdcut = resp.product.products;

      listCProdcut.forEach((element: ProductElement)=>{
        nameProduct.push(element.name);
        account.push(element.account);
      });

      //Muestra grafico de barras
      this.chartBar = new Chart('canvas-bar',{
        type: 'bar',
        data: {
          labels: nameProduct,
          datasets: [
            {label: 'Productos', data: account}
          ]
        }
      });
      
      //Muestra grafico de barras
      this.chartDoughnut = new Chart('canvas-doughnut',{
        type: 'doughnut',
        data: {
          labels: nameProduct,
          datasets: [
            {label: 'Productos', data: account}
          ]
        }
      });
    }
  }
}
