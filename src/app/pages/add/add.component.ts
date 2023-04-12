import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {WeatherService} from '../../services/weather.service';
import {FireBaseService} from '../../services/firebase.service';
import {first} from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit, OnDestroy {

  temp: any;
  city = 'Cary';
  state: any
  capitals: any[] = [];
  countries: any[] = [];
  selectedCity: any;
  cardCity: any;
  showNote = false;
  followedCM = false;
  sub1: Subscription = new Subscription;


  constructor(public http: HttpClient, public weather: WeatherService, public fb: FireBaseService) {
  }

  ngOnInit() {
    // getting the city placeID
    this.weather.getWeather(this.city).subscribe((payload: any) => {
      this.state = payload.weather[0].main;
      this.temp = Math.ceil(Number(payload.main.temp));
    });

    this.http.get('https://restcountries.com/v3.1/all').pipe((first())).subscribe((countries: any)  => {
      this.countries =countries;
      this.countries.forEach((country) => {
        
        if(country.capital && country.capital.length == 1){
          console.log(country)
          this.capitals.push(country.capital[0].toLowerCase( ));
        }
       
        
      });
     
      this.capitals.sort();
    });

    this.sub1 = this.fb.getCities().subscribe((cities) => {
      Object.values(cities).forEach((city: any) => {
        if (city.name === 'Cary') {
          this.followedCM = true;
        }
      });
    });
  }

  selectCity(city: any) {
    if (this.capitals.includes(city)) {
      this.cardCity = city;
      this.showNote = false;
    } else if (city.leading > 0) {
      this.showNote = true;
    }
  }

  addCityOfTheMonth() {
    this.fb.addCity('Cary').subscribe(() => {
      this.followedCM = true;
    });
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
  }

}
