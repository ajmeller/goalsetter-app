import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-previous-day',
  templateUrl: './previous-day.component.html',
  styleUrls: ['./previous-day.component.css']
})
export class PreviousDayComponent implements OnInit {
  isShow = true;
  constructor() { }

  ngOnInit(): void {
  }
  toggleDays(){
    this.isShow = !this.isShow 
  }

}
