import { Component, OnInit } from '@angular/core';

const w = <any>window;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'protractor-onpageload-bug';

  constructor() {
    (w._testorder = w._testorder || []).push('app component constructor');
  }

  ngOnInit() {
    (w._testorder = w._testorder || []).push('app component ngOnInit');
  }
}
