import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";

@Component({
  selector: "date-app",
  templateUrl: "./date.component.html",
  styleUrls: ["./date.component.css"]
})
export class DateComponent implements OnInit{

  private _duration: number;

  @Input() startDate: Date;
  @Input() endDate: Date;
  @Output() startDateChange = new EventEmitter<Date>();
  @Output() endDateChange = new EventEmitter<Date>();

  get duration(): number {
    return this._duration;
  }

  set duration(value: number) {
    this._duration = value;
  }

  setendDate(value: number){
    if(this.startDate){
      this.endDate = new Date(this.startDate.getTime() + this._duration * 86400000);
    } else if(this.endDate){
      this.startDate = new Date(this.endDate.getTime() - this._duration * 86400000);
    }
}

  changeStartDate(value){
    if(value){
      this.startDate = new Date(value);
      if(this.endDate){
        this._duration = this.days();
      } else if(this._duration){
        this.endDate = new Date(this.startDate.getTime() + this._duration * 86400000);
      }
    } else {
      this.startDate = null;
      if(this.endDate){
        this._duration = undefined;
      }
    }

    this.startDateChange.emit(this.startDate);
  }

  changeEndDate(value){
    if(value){
      this.endDate = new Date(value);
      if(this.startDate){
        this._duration = this.days();
      } else if(this.duration){
        this.startDate = new Date(this.endDate.getTime() - this._duration * 86400000);
      }
    } else {
      this.endDate = null;
      if(this.startDate){
        this._duration = undefined;
      }
    }
    this.endDateChange.emit(this.endDate);
  }

  days(): number {
    if (!this.startDate || !this.endDate) {
      return undefined;
    }
    let timeDiff: number = this.endDate.getTime() - this.startDate.getTime();
    if (timeDiff < 1) {
      alert("Please correct start or end date");
      this.endDate = null;
      return undefined;
    } else {
      timeDiff /= 86400000;
      return Math.ceil(timeDiff);
    }
  }

  ngOnInit(){
    this._duration = this.days();
  }
}
