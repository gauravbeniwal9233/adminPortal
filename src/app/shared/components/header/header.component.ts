import { Component } from '@angular/core';
import { CollapseService } from '../../services/collapse.service';
import { Global } from '../../utility/global';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  userImage: string = "assets/images/ProfilePhoto1.png";

  constructor(public collaspeService : CollapseService) { }

  ngOnInit(): void {
    let userDetailsString = localStorage.getItem('userDetails') || '{}'; // Provide a default empty object
    let userDetails = JSON.parse(userDetailsString);
    
    this.userImage = (userDetails.imagePath == "" || userDetails.imagePath == null) ? "assets/images/ProfilePhoto1.png" :
      Global.BASE_USERS_IMAGES_PATH + userDetails.imagePath;
  }

  collapseSidebar() {
    this.collaspeService.openSidebar = !this.collaspeService.openSidebar;
  }
}
