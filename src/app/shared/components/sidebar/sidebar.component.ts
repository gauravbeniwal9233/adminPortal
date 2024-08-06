import { Component } from '@angular/core';
import { Global } from '../../utility/global';
import { MenuService } from '../../services/menu.service';
import { Menu } from '../../interface/Menu.interface';
import { AuthService } from '../../../components/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  userImage: string = "assets/images/ProfilePhoto1.png";
  logoImage: string = "assets/images/logo.png";
  fullName: string = "";
  emailId: string = "";
  menuItems: Menu[] = [];

  constructor(
    private menuService: MenuService, 
    private authService: AuthService
  ) { }

  ngOnInit(): void {


    let userDetailsString = localStorage.getItem('userDetails') || '{}'; // Provide a default empty object
    let userDetails = JSON.parse(userDetailsString);
    this.fullName = `${userDetails.firstName} ${userDetails.lastName}`;
    this.emailId = `${userDetails.email}`;
    this.userImage = (userDetails.imagePath == "" || userDetails.imagePath == null) ? "assets/images/ProfilePhoto1.png" :
      Global.BASE_USERS_IMAGES_PATH + userDetails.imagePath;

    this.menuItems = this.menuService.MENUITEMS;
  }

  toggleNavActive(menuItem: Menu) {
    menuItem.active = !menuItem.active;
  }

}
