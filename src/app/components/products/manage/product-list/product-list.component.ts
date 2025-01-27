import { Component, OnDestroy, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { environment } from '../../../../../environments/environment.prod';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from '../../../../shared/services/http.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit, OnDestroy {
  objRows: any[] = [];

  constructor(private _httpService: HttpService, private _toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this._httpService.get(environment.BASE_API_PATH + "ProductMaster/GetAll").subscribe(res => {
      if (res.isSuccess) {
        this.objRows = res.data;
      } else {
        this._toastr.error(res.errors[0], "Product List");
      }
    });
  }

  Edit(id: number) {
    this.router.navigate(['/products/manage/add-product'], { queryParams: { productId: id } });
  }


  Delete(id: number) {
    let obj = {
      id: id
    };

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success mx-2',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this._httpService.post(environment.BASE_API_PATH + "ProductMaster/Delete/", obj).subscribe(res => {
          if (res.isSuccess) {
            swalWithBootstrapButtons.fire(
              'Deleted!',
              'Your record has been deleted.',
              'success'
            )
            this.getData();
          } else {
            this._toastr.error(res.errors[0], "Product List");
          }
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your record is safe :)',
          'error'
        )
      }
    })


  }

  ngOnDestroy() {
    this.objRows = null;
  }

}
