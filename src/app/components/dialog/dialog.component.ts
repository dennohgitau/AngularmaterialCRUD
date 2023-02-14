import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { MatDialogRef } from '@angular/material/dialog'
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  freshnessList = ["Brand New", "Second Hand", "Refurbished"]
  productForm !: FormGroup;

  constructor (private snackBar: MatSnackBar,private formBuilder : FormBuilder, private api: ApiService, private dialogRef: MatDialogRef<DialogComponent>){

  }

  ngOnInit(): void{
    this.productForm = this.formBuilder.group({
    productName: ['', Validators.required],
    category: ['', Validators.required],
    freshness: ['', Validators.required],
    price: ['', Validators.required],
    comment: ['', Validators.required],
    date: ['', Validators.required]

    })
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }
  addProduct(){
    if(this.productForm.valid){
      this.api.postProduct(this.productForm.value)
      .subscribe({
        next:(res)=>{
          alert("Product added Successfully")
          this.productForm.reset();
          this.dialogRef.close('save');

        },
        error:()=>{
          alert("Error while adding the Product")
        }
      })
    }
  }

}
