import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from '../../../shared/services/http.service';
import { MustMatchValidator } from '../../../shared/validations/validations.validator';
import { Global } from '../../../shared/utility/global';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  submitted: boolean = false;
  @ViewChild('nav') elnav: any;
  constructor(
    private formBuilder: FormBuilder,
    private toaster: ToastrService,
    private httpService: HttpService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.setLoginForm();
    this.setRegisterForm();
  }

  setLoginForm() {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  setRegisterForm() {
    // this.registerForm = this.formBuilder.group(
    //   {
    //     firstName: [
    //       '',
    //       Validators.compose([
    //         Validators.required,
    //         Validators.minLength(3),
    //         Validators.maxLength(10),
    //       ]),
    //     ],
    //     lastName: [
    //       '',
    //       Validators.compose([
    //         Validators.required,
    //         Validators.minLength(3),
    //         Validators.maxLength(10),
    //       ]),
    //     ],
    //     email: [
    //       '',
    //       Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]),
    //     ],
    //     userTypeId: [1],
    //     password: [
    //       '',
    //       Validators.compose([
    //         Validators.required,
    //         Validators.pattern(
    //           /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/
    //         ),
    //       ]),
    //     ],
    //     confirmPassword: ['', Validators.compose([Validators.required])],
    //   },
    //   {
    //     validators: MustMatchValidator('password', 'confirmPassword'),
    //   }
    // );
    this.registerForm = new FormGroup(
      {
        firstName: new FormControl(
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(10),
          ]),
        ),
        lastName: new FormControl(
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(10),
          ]),
        ),
        email: new FormControl(
          '',
          Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]),
        ),
        userTypeId: new FormControl(1),
        password: new FormControl(
          '',
          Validators.compose([
            Validators.required,
            Validators.pattern(
              /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/
            ),
          ]),
        ),
        confirmPassword: new FormControl('', Validators.compose([Validators.required]))
      },
      MustMatchValidator('password', 'confirmPassword'));
  }

  get ctrl() {
    return this.registerForm.controls;
  }

  login() {
    if (this.loginForm.get('userName')?.value === '') {
      this.toaster.error('User Name is required !!', 'Login');
    } else if (this.loginForm.get('password')?.value === '') {
      this.toaster.error('Password is required !!', 'Login');
    } else {
      if (this.loginForm.valid) {
        // debugger;
        this.httpService
          .post(
            Global.BASE_API_PATH + 'UserMaster/Login/',
            this.loginForm.value
          )
          .subscribe((res) => {
            console.log(res);
            if (res.isSuccess) {
              // debugger;
              this.authService.authLogin(res.data);
              this.loginForm.reset();

            } else {
              this.toaster.error(res.errors[0], "Login")
            }
          });
      }
    }
  }

  register(formData: FormGroup) {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }
    this.httpService
      .post(Global.BASE_API_PATH + 'UserMaster/Save/', formData.value)
      .subscribe((res) => {
        console.log(res);
        if (res.success) {
          this.toaster.success('Registered Successfully !!', 'Registration');
          this.registerForm.reset({
            firstName: '',
            lastName: '',
            email: '',
            userTypeId: 1,
            password: '',
            confirmPassword: '',
          });
          this.submitted = false;
          this.elnav.select('logintab');
        } else {
          this.toaster.error(res.errors[0], 'Registration');
        }
      });
  }
}