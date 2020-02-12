import { Component, OnInit } from '@angular/core';
import { HappyHourModel } from 'src/app/models/HappyHourModel';

@Component({
  selector: 'app-happyhour-view',
  templateUrl: './happyhour-view.component.html',
  styleUrls: ['./happyhour-view.component.scss']
})
export class HappyhourViewComponent implements OnInit {

  happyHour : HappyHourModel
  constructor() { }

  ngOnInit() {

    // accept the happy hour object from another component while navigating
    this.happyHour = window.history.state.happyhour
    if(this.happyHour === null) {
      console.log("fetch the happyhour based on id")
    }
  }

}
