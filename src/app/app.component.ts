import { Component, OnInit } from '@angular/core';
import { FooServiceMapping } from 'src/environments/environment';

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
    w._fooservicemapping = FooServiceMapping.getFoo();
  }

  ngOnInit() {
    (w._testorder = w._testorder || []).push('app component ngOnInit');
  }
}
