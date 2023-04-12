import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs';
import {FireBaseService} from '../../services/firebase.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
  })
  export class HomeComponent implements OnInit {
    cities!: Observable<any>;

    constructor(private fireBaseService: FireBaseService) {
    }

    ngOnInit() {
      this.cities = this.fireBaseService.getCities();
     }
      
}

export class City{
  name: string = "";
}