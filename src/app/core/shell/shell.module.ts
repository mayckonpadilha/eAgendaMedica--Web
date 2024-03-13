import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatSidenavModule } from '@angular/material/sidenav';
import { SharedModule } from 'src/app/shared/shared.module';
import { ShellComponent } from './shell.component';



@NgModule({
  declarations: [ShellComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatSidenavModule,
    SharedModule
  ],
  exports: [ShellComponent],
})
export class ShellModule { }
