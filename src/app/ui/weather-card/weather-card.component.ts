import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {WeatherService} from '../../services/weather.service';
import {FireBaseService} from '../../services/firebase.service';
import {UiService} from '../../services/ui.service';
import {Subscription} from 'rxjs';
import {first} from 'rxjs/operators';

@Component({
    selector: 'app-weather-card',
    templateUrl: './weather-card.component.html',
    styleUrls: ['./weather-card.component.css']
  })
export class WeatherCardComponent implements OnInit, OnDestroy {


    @Input() set city(city: string) {
        this.cityName = city;
        this.weather.getWeather(city)
          .pipe(first())
          .subscribe((payload: { weather: { main: string; }[]; main: { temp: number; }; }) => {
            this.state = payload.weather[0].main;
            this.temp = Math.ceil(payload.main.temp);
          }, (err: { error: { message: string; }; }) => {
            this.errorMessage = err.error.message;
            setTimeout(() => {
              this.errorMessage = '';
            }, 3000);
          });
        this.weather.getForecast(city)
          .pipe(first())
          .subscribe((payload: { main: { temp: number; }; }[]) => {
            this.maxTemp = Math.round(payload[0].main.temp);
            this.minTemp = Math.round(payload[0].main.temp);
            for (const res of payload) {
              if (new Date().toLocaleDateString('en-GB') === new Date().toLocaleDateString('en-GB')) {
                this.maxTemp = res.main.temp > this.maxTemp ? Math.round(res.main.temp) : this.maxTemp;
                this.minTemp = res.main.temp < this.minTemp ? Math.round(res.main.temp) : this.minTemp;
              }
            }
          }, (err: { error: { message: string; }; }) => {
            this.errorMessage = err.error.message;
            setTimeout(() => {
              this.errorMessage = '';
            }, 3000);
          });
    
      }


      @Input() addMode: any;
      
  @Output() cityStored = new EventEmitter();
  citesWeather!: Object;
  darkMode!: boolean;
  sub1!: Subscription;
  state!: string;
  temp!: number;
  maxTemp!: number;
  minTemp!: number;
  errorMessage!: string;
  cityName!: string;
  cityAdded = false;

  constructor(public weather: WeatherService,
              public router: Router,
              public ui: UiService,
              public fb: FireBaseService) {
  }

  ngOnInit() {
    this.sub1 = this.ui.darkModeState.subscribe((isDark: boolean) => {
      this.darkMode = isDark;
    });
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
  }

  openDetails() {
    if (!this.addMode) {
      this.router.navigateByUrl('/details/' + this.cityName);
    }
  }

  addCity() {
    this.fb.addCity(this.cityName).subscribe(() => {
      this.cityName = "";
      this.maxTemp = 0;
      this.minTemp = 0;
      this.state = "";
      this.temp = 0;
      this.cityAdded = true;
      this.cityStored.emit();
      setTimeout(() => this.cityAdded = false, 2000);
    });
  }

}

