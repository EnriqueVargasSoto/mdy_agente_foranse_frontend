import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Dismiss } from 'flowbite';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Credenciales } from '../../interfaces/interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  showToast: boolean = false;

  loginForm: FormGroup;

  base_url = 'http://18.189.173.243/api/';//'http://10.200.40.71:8000/api/';

  mensaje_error: string = '';

  showPassword = false;

  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router, private http: HttpClient,private fb: FormBuilder){
    this.loginForm = this.fb.group({
      vc_usuario: ['', [Validators.required]],
      vc_clave: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.loginForm.get('vc_usuario')?.valueChanges.subscribe((value) => {
      this.loginForm.get('vc_usuario')?.setValue(value.toUpperCase(), { emitEvent: false });
    });
  }

  login(){
    this.http.post(this.base_url+'auth/login', this.loginForm.value).subscribe((resp: any) => {

      this.authService.login(resp.data);
      return this.router.navigate(['/dashboard']);
    }, (error) =>{
      this.mensaje_error = error.error.error;
      this.showToastMessage()
    });

  }

  showToastMessage(): void {
    this.showToast = true;
    // Opcional: Cerrar el toast automáticamente después de 3 segundos
    /* setTimeout(() => {
      this.closeToast();
    }, 3000);  */// 3000 ms = 3 segundos
  }

  closeToast(): void {
    this.showToast = false;
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

}
