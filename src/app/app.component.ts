import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  private httpClient: HttpClient;
  public data:Array<any> = [];
  constructor(http: HttpClient) {
    this.httpClient = http;
    this.httpClient.get('assets/SAMPLE_INPUT.txt', { responseType: 'text' })
      .subscribe(text =>{
        let list = [];
        let arr = text.split(/\r?\n|\r/);
        for (var i = 0; i < arr.length; i++) {
          list.push(arr[i].split(','));
        }
        this.data = list
      });
  }
}
