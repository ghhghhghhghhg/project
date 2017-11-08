import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";

@Component({
  selector: "sis-date",
  templateUrl: "./date.component.html",
  styleUrls: ["./date.component.css"]
})
export class DateComponent implements OnInit {

  private ONE_DAY_MILLISECONDS: number = 86400000;

  private _duration: number;

  @Input() startDate: Date;
  @Input() endDate: Date;
  @Output() startDateChange = new EventEmitter<Date>();
  @Output() endDateChange = new EventEmitter<Date>();

  constructor() {
  }

  get duration(): number {
    return this._duration;
  }

  set duration(value: number) {
    this._duration = value;
  }

  /**
   * Generate StartDate and EndDate with duration
   */
  generateDates(): void {
    if (this.startDate) {
      this.endDate = new Date(this.startDate.getTime() + this._duration * this.ONE_DAY_MILLISECONDS);
    } else if (this.endDate) {
      this.startDate = new Date(this.endDate.getTime() - this._duration * this.ONE_DAY_MILLISECONDS);
    }
  }

  /**
   * On change StartDate generate duration or EndDate
   * @param event
   */
  changeStartDate(event): void {
    if (event.target.value) {
      this.startDate = new Date(event.target.value);
      if (this.endDate) {
        this._duration = this.durationOfDays();
      } else if (this._duration) {
        this.endDate = new Date(this.startDate.getTime() + this._duration * this.ONE_DAY_MILLISECONDS);
      }
    } else {
      this.startDate = null;
      if (this.endDate) {
        this._duration = null;
      }
    }
    this.startDateChange.emit(this.startDate);
  }

  /**
   * On change EndDate generate duration or StartDate
   * @param event
   */
  changeEndDate(event): void {
    if (event.target.value) {
      this.endDate = new Date(event.target.value);
      if (this.startDate) {
        this._duration = this.durationOfDays();
      } else if (this.duration) {
        this.startDate = new Date(this.endDate.getTime() - this._duration * this.ONE_DAY_MILLISECONDS);
      }
    } else {
      this.endDate = null;
      if (this.startDate) {
        this._duration = undefined;
      }
    }
    this.endDateChange.emit(this.endDate);
  }

  /**
   * Generate Duration of StartDate and EndDate
   * @returns {number}
   */
  durationOfDays(): number {
    if (!this.startDate || !this.endDate) {
      return undefined;
    }
    let timeDiff: number = this.endDate.getTime() - this.startDate.getTime();
    if (timeDiff < 1) {
      alert("Please correct start or end date");
      this.endDate = null;
      return undefined;
    } else {
      timeDiff /= this.ONE_DAY_MILLISECONDS;
      return Math.ceil(timeDiff);
    }
  }

  ngOnInit() {
    this._duration = this.durationOfDays();
  }
}
