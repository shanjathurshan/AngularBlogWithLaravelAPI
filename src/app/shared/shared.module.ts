import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { ColumnOneComponent } from './column-one/column-one.component';


@NgModule({
  declarations: [ColumnOneComponent],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports: [
    ColumnOneComponent
  ]
})
export class SharedModule { }
