import { Component } from '@angular/core';
import { CollapseService } from '../../services/collapse.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

  constructor(public collaspeService : CollapseService) { }

  ngOnInit(): void {
  }

}
