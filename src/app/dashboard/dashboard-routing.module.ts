import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPage } from './dashboard.page';
import { AuthenticationService } from '../authentication.service';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage,
    canActivate : [AuthenticationService],
    children: [
      {
        path: 'home',
    loadChildren: () => import('../home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'calculator',
        loadChildren: () => import('../calculator/calculator.module').then( m => m.CalculatorPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}
