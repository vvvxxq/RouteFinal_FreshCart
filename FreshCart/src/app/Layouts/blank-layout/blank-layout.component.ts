import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBlankComponent } from 'src/app/Components/nav-blank/nav-blank.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from 'src/app/Components/footer/footer.component';
import { NgxScrollTopModule } from 'ngx-scrolltop';


@Component({
  selector: 'app-blank-layout',
  standalone: true,
  imports: [CommonModule,NavBlankComponent,RouterOutlet,FooterComponent,NgxScrollTopModule],
  templateUrl: './blank-layout.component.html',
  styleUrls: ['./blank-layout.component.scss']
})
export class BlankLayoutComponent {
 
  

}
