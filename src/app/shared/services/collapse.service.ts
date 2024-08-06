import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CollapseService {

  openSidebar: boolean = false;

  constructor() { }
}
