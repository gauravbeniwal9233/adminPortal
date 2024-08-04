import { Component } from '@angular/core';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'admin';

  // ! LinkedIn logo
  myLinkedInIcon = faLinkedin;

  ngOnInit() {
    // ! Toastr
    // this.toaster.success('Hello', 'Welcome to Admin');
    // this.toaster.error('Hello', 'You are not authorized to access this page');
    // this.toaster.warning('Hello', 'This is a warning message');

    // ! Sweet Alert
      // Use swalWithBootstrapButtons in a method or lifecycle hook
      // this.showAlert();
  }

  constructor(
    private toaster : ToastrService,
  ){}







  // ! Sweet Alerts
  //   // Declare swalWithBootstrapButtons as a property of the class
  //   private swalWithBootstrapButtons = Swal.mixin({
  //     customClass: {
  //       confirmButton: 'btn btn-success',
  //       cancelButton: 'btn btn-danger',
  //     },
  //     buttonsStyling: false,
  //   });

  //   // Method to show the SweetAlert
  // private showAlert() {
  //   this.swalWithBootstrapButtons
  //     .fire({
  //       title: 'Are you sure?',
  //       text: "You won't be able to revert this!",
  //       icon: 'warning',
  //       showCancelButton: true,
  //       confirmButtonText: 'Yes, delete it!',
  //       cancelButtonText: 'No, cancel!',
  //       reverseButtons: true,
  //     })
  //     .then((result) => {
  //       if (result.isConfirmed) {
  //         this.swalWithBootstrapButtons.fire({
  //           title: 'Deleted!',
  //           text: 'Your file has been deleted.',
  //           icon: 'success',
  //         });
  //       } else if (result.dismiss === Swal.DismissReason.cancel) {
  //         this.swalWithBootstrapButtons.fire({
  //           title: 'Cancelled',
  //           text: 'Your imaginary file is safe :)',
  //           icon: 'error',
  //         });
  //       }
  //     });
  // }

}
