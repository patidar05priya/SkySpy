import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {WeatherService} from '../../services/weather.service';
import {FireBaseService} from '../../services/firebase.service';
import {first, map, startWith} from 'rxjs/operators';
import { Observable, Subscription, of } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit, OnDestroy {
  [x: string]: any;

  temp: any;
  city = 'Cary';
  state: any
  capitals: any[] = [];
  cities: any[] = [];
  countries: any[] = [];
  ads: any[] = [];
  selectedCity: any;
  cardCity: any;
  showNote = false;
  followedCM = false;
  sub1: Subscription = new Subscription;
  myControl = new FormControl();
  filteredOptions :Observable<string[]> = new Observable<string[]>();


  constructor(public http: HttpClient, public weather: WeatherService, public fb: FireBaseService) {
  }

  ngOnInit() {

    // getting the city placeID
    this.weather.getWeather(this.city).subscribe((payload: any) => {
      this.state = payload.weather[0].main;
      this.temp = Math.ceil(Number(payload.main.temp));
    });

    ///https://countriesnow.space/api/v0.1/countries/population/cities    
    this.http.get("https://countriesnow.space/api/v0.1/countries/population/cities").pipe(first()).subscribe((countries: any) => {
        this.ads  = countries['data'];
        this.ads.forEach((c) =>{
          this.capitals.push(c.city.toLowerCase());
        })
      });
  
    this.sub1 = this.fb.getCities().subscribe((cities) => {
      Object.values(cities).forEach((city: any) => {
        if (city.name === 'Cary') {
          this.followedCM = true;
        }
      });
    });

    this.filteredOptions = this.myControl.valueChanges;

  }

  selectCity(city: any) {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(city),
        map(value => this._filter(value)));
    
   this.filteredOptions.subscribe(val =>{
    if (this.capitals.includes(val[0])) {
      this.cardCity = city;
      this.showNote = false;
    }else{
      this.showNote = true;
    }
     
    });
        
    }

  private _filter(value: string): string[] {
    return this.capitals.filter((option: string) => option.includes(value));
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
