import { Injectable } from '@angular/core';
import { Menu } from '../interface/Menu.interface';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  constructor() {}
  MENUITEMS: Menu[] = [
    {
      title: 'Dashboard',
      path: 'dashboard/default',
      icon: 'home',
      type: 'link',
      active: true,
    },
    {
      title: 'Products',
      icon: 'box',
      type: 'menu',
      active: false,
      children: [
        {
          title: 'Manage',
          type: 'menu',
          active: false,
          children: [
            {
              title: 'Product List',
              path: 'products/manage/product-list',
              type: 'link',
            },
            {
              title: 'Add Product',
              path: 'products/manage/add-product',
              type: 'link',
            },
          ],
        },
      ],
    },
    {
      title: 'Sales',
      path: 'dashboard/default',
      icon: 'dollar-sign',
      type: 'menu',
      active: false,
      children: [
        {
          title: 'Orders',
          path: 'sales/orders',
          type: 'link',
        },
        {
          title: 'Transactions',
          path: 'sales/transactions',
          type: 'link',
        },
      ],
    },
    {
      title: 'Masters',
      icon: 'clipboard',
      type: 'menu',
      active: false,
      children: [
        { title: 'BrandLogo', type: 'link', path: 'masters/brandlogo' },
        { title: 'Category', type: 'link', path: 'masters/category' },
        { title: 'Tag', type: 'link', path: 'masters/tag' },
        { title: 'Size', type: 'link', path: 'masters/size' },
        { title: 'Color', type: 'link', path: 'masters/color' },
        { title: 'Usertype', type: 'link', path: 'masters/usertype' },
      ],
    },
    {
      title: 'Users',
      icon: 'user-plus',
      type: 'menu',
      active: false,
      children: [
        { title: 'User List', type: 'link', path: 'users/list-user' },
        { title: 'Add User', type: 'link', path: 'users/add-user' },
      ],
    },
    {
      title: 'Settings',
      icon: 'settings',
      type: 'menu',
      active: false,
      children: [{ title: 'Profile', type: 'link', path: 'settings/profile' }],
    },
    {
      title: 'Reports',
      path: 'reports',
      icon: 'bar-chart',
      type: 'link',
      active: false,
    },
    {
      title: 'Invoice',
      path: 'invoice',
      icon: 'archive',
      type: 'link',
      active: false,
    },
    {
      title: 'Logout',
      path: 'auth/login',
      icon: 'log-out',
      type: 'link',
      active: false,
    },
  ];
}