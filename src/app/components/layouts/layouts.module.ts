import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//for editor
import { LayoutsComponent } from './layouts.component';

@NgModule({
  // tslint:disable-next-line: max-line-length
  declarations: [LayoutsComponent],
  imports: [
    RouterModule,
    CommonModule
  ],
  providers: [
    ],
 
})
export class LayoutsModule { }