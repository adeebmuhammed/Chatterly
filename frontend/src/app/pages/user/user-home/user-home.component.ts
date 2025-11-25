import { Component } from '@angular/core';
import { UserHeaderComponent } from '../../../components/user/user-header/user-header.component';

@Component({
  selector: 'app-user-home',
  imports: [
    UserHeaderComponent
  ],
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.css'
})
export class UserHomeComponent {

}
