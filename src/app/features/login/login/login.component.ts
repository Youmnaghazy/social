import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  loading:WritableSignal<boolean>=signal(false)
  msgError:string=''
private readonly authService=inject(AuthService)
private readonly router=inject(Router)
private readonly fb = inject(FormBuilder)

loginForm:FormGroup = this.fb.group({
       email:['' , [Validators.required , Validators.email]],

     password:['' , [Validators.required ,
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/),

     ]]

})
  // loginForm: FormGroup = new FormGroup({

  //    email:new FormControl(null , [Validators.required , Validators.email]),

  //    password:new FormControl(null , [Validators.required ,
  //     Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/),

  //    ])
  // })

  login(){
if(this.loginForm.valid){
this.loading.set(true)

  console.log(this.loginForm.value);
      this.authService.signIn(this.loginForm.value).subscribe({
        next:(res)=>{
          console.log(res);
          localStorage.setItem('socialToken',res.data.token)
          localStorage.setItem('socialUser',JSON.stringify(res.data.user))
          //navigate to login
            this.loading.set(false)
          this.router.navigate(['/feeds'])


        },
        error:(err)=>{
          console.log(err);
          this.msgError=err.error.message
          this.loading.set(false)
          //show error

        }
      })

}
else{
  this.loginForm.markAllAsTouched()
}

  }

  togglePass(pass:any){
    if(pass.type==='password'){
      pass.type='text'
    }
    else{
      pass.type='password'
    }

  }
}
