import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DbOperation } from '../../../shared/utility/db-operation';
import { HttpService } from '../../../shared/services/http.service';
import { ToastrService } from 'ngx-toastr';
import {
  CharFieldValidator,
  NoWhiteSpaceValidator,
} from '../../../shared/validations/validations.validator';
import { environment } from '../../../../environments/environment.prod';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-size',
  templateUrl: './size.component.html',
  styleUrl: './size.component.scss',
})
export class SizeComponent implements OnInit, OnDestroy {
  addForm!: FormGroup;
  buttonText?: string;
  dbOps?: DbOperation;
  objRows: any[] | null = null;
  objRow: any | null = null;

  @ViewChild('nav') elnav: any;

  formErrors = {
    name: '',
  };

  validationMessage = {
    name: {
      required: 'Name is required',
      minlength: 'Name cannot be less than 1 character long',
      maxlength: 'Name cannot be more than 10 character long',
      validCharField: 'Name must contain characters and space only',
      NoWhiteSpaceValidator: 'Only whitespaces is not allowed',
    }
  };

  constructor(
    private httpService: HttpService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.setFormState();
    this.getData();
  }
  setFormState() {
    this.buttonText = 'Add';
    this.dbOps = DbOperation.create;
    this.addForm = this.fb.group({
      id: [0],
      name: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(10),
          CharFieldValidator.validCharField,
          NoWhiteSpaceValidator.noWhiteSpaceValidator,
        ]),
      ],
    });
    this.addForm.valueChanges.subscribe(() => {
      this.onvalueChanges();
    });
  }
  onvalueChanges() {
    if (!this.addForm) {
      return;
    }
    for (const field of Object.keys(this.formErrors)) {
      this.formErrors[field] = "";

      const control = this.addForm.get(field);
      if (control && control.dirty && control.invalid) {
        const message = this.validationMessage[field];
        for (const key of Object.keys(control.errors)) {
          if(key != 'required'){

            this.formErrors[field] += message[key] + " ";
          }
        }
      }
    }
  }
  get ctrl() {
    return this.addForm.controls;
  }

  submit() {
    if (this.addForm.invalid) {
      return;
    }

    switch (this.dbOps) {
      case DbOperation.create:
        this.httpService
          .post(
            environment.BASE_API_PATH + 'SizeMaster/Save/',
            this.addForm.value
          )
          .subscribe((res) => {
            if (res.isSuccess) {
              this.toastr.success('Record Saved !!', 'Size Master');
              this.resetForm();
            } else {
              this.toastr.error(res.errors[0], 'Size Master');
            }
          });
        break;
      case DbOperation.update:
        this.httpService
          .post(
            environment.BASE_API_PATH + 'SizeMaster/Update/',
            this.addForm.value
          )
          .subscribe((res) => {
            if (res.isSuccess) {
              this.toastr.success('Record Updated !!', 'Size Master');
              this.resetForm();
            } else {
              this.toastr.error(res.errors[0], 'Size Master');
            }
          });
        break;
    }
  }

  resetForm() {
    this.addForm.reset({
      id: 0,
      name: '',
    });

    this.buttonText = 'Add';
    this.dbOps = DbOperation.create;
    this.getData();
    this.elnav.select('viewtab');
  }

  cancelForm() {
    this.addForm.reset({
      id: 0,
      name: '',
    });

    this.buttonText = 'Add';
    this.dbOps = DbOperation.create;
    this.elnav.select('viewtab');
  }

  getData() {
    this.httpService
      .get(environment.BASE_API_PATH + 'SizeMaster/GetAll/')
      .subscribe((res) => {
        if (res.success) {
          this.objRows = res.data;
        } else {
          this.toastr.error(res.errors[0], 'Size Master');
        }
      });
  }
  edit(id: number) {
    this.buttonText = 'Update';
    this.dbOps = DbOperation.update;
    this.elnav.select('addtab');

    this.objRow = this.objRows!.find((x) => x.id === id);
    this.addForm.patchValue(this.objRow);
  }

  delete(id: number) {
    let obj = {
      id: id,
    };

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.httpService
            .post(environment.BASE_API_PATH + 'SizeMaster/Delete/', obj)
            .subscribe((res) => {
              if (res.success) {
                // this.toastr.success("Record Deleted !!", "Size Master");
                swalWithBootstrapButtons.fire({
                  title: 'Deleted!',
                  text: 'Your record has been deleted.',
                  icon: 'success',
                });
                this.getData();
              } else {
                this.toastr.error(res.errors[0], 'Size Master');
              }
            });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: 'Cancelled',
            text: 'Your record is safe :)',
            icon: 'error',
          });
        }
      });
  }

  ngOnDestroy(): void {
    this.objRows = null;
    this.objRow = null;
  }

  tabChange(event: any) {
    console.log(event);
    this.addForm.reset({
      id: 0,
      name: '',
    });

    this.buttonText = 'Add';
    this.dbOps = DbOperation.create;
  }
}
