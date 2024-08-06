import { Component, Input } from '@angular/core';
import * as feather from 'feather-icons';

@Component({
  selector: 'app-feather-icon',
  templateUrl: './feather-icon.component.html',
  styleUrl: './feather-icon.component.scss'
})
export class FeatherIconComponent {
  @Input('icon') feathericon: any;

  constructor() { }

  ngOnInit(): void {
   
  }

  ngAfterViewInit(){
    feather.replace();
  }
}
