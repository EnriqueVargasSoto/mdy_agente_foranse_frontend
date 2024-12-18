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

  /* vc_usuario: string = '';
  vc_clave: string = ''; */

  showToast: boolean = false;  // Controla la visibilidad del toast

  credenciales: Credenciales = {};

  loginForm: FormGroup;

  base_url = 'http://10.200.40.71:8000/api/';

  mensaje_error: string = '';

  constructor(private authService: AuthService, private router: Router, private http: HttpClient,private fb: FormBuilder){
    this.loginForm = this.fb.group({
      vc_usuario: ['', [Validators.required]],
      vc_clave: ['', [Validators.required, Validators.minLength(6)]],
    });

    // Detecta cambios en el campo `usuario` para transformarlos en tiempo real
    this.loginForm.get('vc_usuario')?.valueChanges.subscribe((value) => {
      this.loginForm.get('vc_usuario')?.setValue(value.toUpperCase(), { emitEvent: false });
    });
  }

  login(){
    console.log(this.loginForm.value);
    this.http.post(this.base_url+'auth/login', this.loginForm.value).subscribe((resp: any) => {
      console.log(resp);
      this.authService.login(resp.data);
    return this.router.navigate(['/dashboard']);
    }, (error) =>{
      this.mensaje_error = error.error.error;
      this.showToastMessage()
    });

  }

  // Función para mostrar el toast
  showToastMessage(): void {
    this.showToast = true;  // Muestra el toast
    // Opcional: Cerrar el toast automáticamente después de 3 segundos
    /* setTimeout(() => {
      this.closeToast();
    }, 3000);  */// 3000 ms = 3 segundos
  }

  // Función para cerrar el toast
  closeToast(): void {
    this.showToast = false;  // Oculta el toast
  }

}
