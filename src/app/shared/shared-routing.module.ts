import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ColumnOneComponent } from './column-one/column-one.component';

const routes: Routes = [
  { path: 'column', component: ColumnOneComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
