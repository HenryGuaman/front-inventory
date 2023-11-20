import { Component, inject , OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from 'src/app/modules/shared/services/category.service';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent implements OnInit{

  public categoryForm!: FormGroup;
  estadoFormulario: string ="Agregar";
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<NewCategoryComponent>); 
  private categoryService = inject(CategoryService);
  public data = inject(MAT_DIALOG_DATA);



  ngOnInit(): void {
    this.estadoFormulario = "Agregar"
    console.log(this.data)

    this.categoryForm = this.fb.group({
      name: ['',Validators.required],
      description: ['',Validators.required]
    })

    if(this.data != null){
      this.updateForm(this.data);
      this.estadoFormulario="Actualizar";
    }
  }
  onSave(){
    let data ={
      name: this.categoryForm.get('name')?.value,
      description: this.categoryForm.get('description')?.value
    }
    if(data !=null ){
      //update registry
      this.categoryService.updateCategory(data, this.data.id)
            .subscribe((data:any)=>{
              this.dialogRef.close(1);
            }, (error:any)=>{
              this.dialogRef.close(2);
            })
    }else{
      //create registry
      this.categoryService.saveCategories(data)
          .subscribe((data: any)=> {
            console.log(data);
            this.dialogRef.close(1);
          },(error: any) =>{
            this.dialogRef.close(2);
          })
    }
    
  }

  onCancel(){
    this.dialogRef.close(3)
  }

  updateForm(data: any){
    this.categoryForm = this.fb.group({
      name: [data.name, Validators.required],
      description: [data.description, Validators.required]
    });

  }

}
