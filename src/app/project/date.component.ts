import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";

@Component({
  selector: "date-app",
  templateUrl: "./date.component.html",
  styleUrls: ["./date.component.css"]
})
export class DateComponent{

  private _duration: number;

  @Input() startDate: Date;
  @Input() endDate: Date;
  @Output() startDateChange = new EventEmitter<Date>();
  @Output() endDateChange = new EventEmitter<Date>();
  duration: number = 17;
  changeStartDate(value){
    if(value){
      this.startDate = new Date(value)
    } else {
      this.startDate = null;
    }

    this.startDateChange.emit(this.startDate);
  }

  changeEndDate(value){
    if(value){
      this.endDate = new Date(value)
    } else {
      this.endDate = null;
    }
    this.endDateChange.emit(this.endDate);
  }

  days(): number {
    if (!this.startDate || !this.endDate) {
      return undefined;
    }
    let timeDiff: number = this.startDate.getTime() - this.endDate.getTime();
    if (timeDiff < 1) {
      alert("Please correct start or end date");
      this.endDate = null;
      return undefined;
    } else {
      timeDiff /= 86400000;
      return Math.ceil(timeDiff);
    }
  }
}
