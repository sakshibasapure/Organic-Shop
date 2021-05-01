import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  private formData = new FormData();
  //productForm: FormGroup;
  product: Product = new Product();
  productId;
  categoryList: [];
  category$;
  private unsubscribe$ = new Subject<void>();
  

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
    ) { }
      //const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
      productForm = this.fb.group({
        productId: 0,
        productName: ['', Validators.required],
        description: ['', Validators.required],
        price: ['', [Validators.required, Validators.min(0)]],
        category: ['', Validators.required],
        coverImagePath: ['', [Validators.required]]
       
      });
    
  
  get productName() {
    return this.productForm.get('productName');
  }

  get description() {
    return this.productForm.get('description');
  }
  
  get price() {
    return this.productForm.get('price');
  }

  get category() {
    return this.productForm.get('category');
  }


  get coverImagePath() {
    return this.productForm.get('coverImagePath');
  }

  ngOnInit() {
    this.productService.categories$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (categoryData: []) => {
          this.categoryList = categoryData;
        }, error => {
          console.log('Error ocurred while fetching category List : ', error);
        });


  }

  /*fetchProductData() {
   
    this.productService.getProductById(this.productId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (result: Product) => {
          this.setProductFormData(result);
        }, error => {
          console.log('Error ocurred while fetching product data : ', error);
        });
  }*/

  onFormSubmit() {
    if (!this.productForm.valid) {
      console.log("HEre is a problem");
      return;
    }

    this.formData.append('productFormData', JSON.stringify(this.productForm.value));

    /*if (this.productId) {
      this.editProductDetails();
    } else {
      this.saveProductDetails();
    }*/
  
    this.saveProductDetails();
   
    
  }

  /*editProductDetails() {
    this.productService.updateProductDetails(this.formData)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        () => {
          this.router.navigate(['/admin/products']);
        }, error => {
          console.log('Error ocurred while updating product data : ', error);
        });
  }*/

  saveProductDetails() {
    this.productService.addProduct(this.productForm.value)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        () => {
          console.log("Product added successfully!")
          this.router.navigate(['/admin/products']);
        }, error => {
          this.productForm.reset();
          console.log('Error ocurred while adding product data : ', error);
        });
  }

  


  cancel() {
    this.router.navigate(['/admin/products']);
  }

  /*setProductFormData(productFormData) {
    this.productForm.setValue({
      productId: productFormData.productId,
      productName: productFormData.productName,
      description: productFormData.description,
      category: productFormData.category,
      price: productFormData.price,
      coverImagePath: productFormData.coverImagePath
    
    });
  }*/



  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}