import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ForgetpasswordService } from 'src/app/Core/Services/forgetpassword.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss']
})
export class ForgetpasswordComponent {

  constructor(private _ForgetpasswordService:ForgetpasswordService,
    private _Router:Router){}

  step1:boolean=true;
  step2:boolean=false;
  step3:boolean=false;
  email:string ='';

  userMsg:string = '';



  forgetForm:FormGroup = new FormGroup({
    email: new FormControl('')
  })

  resetCodeForm:FormGroup = new FormGroup({
    resetCode: new FormControl('')
  })


  resetPassword:FormGroup = new FormGroup({
    newPassword: new FormControl('',[Validators.pattern(/^[a-zA-Z0-9_@]{6,}$/)])
  })

  forgetPassword():void{
    let userEmail = this.forgetForm.value;
    this.email = userEmail.email;

    this._ForgetpasswordService.forgetPassword(userEmail).subscribe({
      next:(response)=>{
        console.log(response);
        this.userMsg = response.message;
        this.step1 = false;
        this.step2 = true;
        
      },
       error:(err)=>{
        this.userMsg = err.error.message
       }
    })
  }

  resetCode():void{
    let resetCode = this.resetCodeForm.value;
    this._ForgetpasswordService.resetCode(resetCode).subscribe({
      next:(response)=>{
        console.log(response);
        this.userMsg = response.status;
        this.step2 = false;
        this.step3 = true;
        
      },
      error:(err)=>{
        this.userMsg = err.error.message
       }
    })
  }

  newPassword():void{
    let resetPassword = this.resetPassword.value;
    resetPassword.email = this.email;

    this._ForgetpasswordService.resetPassword(resetPassword).subscribe({
      next:(response)=>{
        console.log(response);
        if(response.token ){
          localStorage.setItem('etoken',response.token);
          this._Router.navigate(['/home'])
        }
      },
      error:(err)=>{
        this.userMsg = err.error.message
       }
    })

  }
}
