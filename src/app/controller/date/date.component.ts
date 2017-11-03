// import {Component, Input, OnInit} from "@angular/core";
//
// @Component({
//   selector: "date-app",
//   templateUrl: "./date.component.html",
//   styleUrls: ["./date.component.css"]
// })
// export class DateComponent implements OnInit {
//
//   @Input() stDate: Date;
//   @Input() enDate: Date;
//   private _duration: number;
//   private _startStr: string;
//   private _endStr: string;
//
//   get startStr(): string {
//     return this.getDateStr(this.stDate);
//   }
//
//   set startStr(value: string) {
//     let date = new Date(value)
//     this.stDate.setTime(date.getTime());
//     if(this.enDate){
//       this._duration = this.days();
//     }
//   }
//
//   get endStr(): string {
//     return this.getDateStr(this.enDate);
//   }
//
//   set endStr(value: string) {
//     let date = new Date(value)
//     this.enDate.setTime(date.getTime());
//     if(this.stDate){
//       this._duration = this.days();
//     } else {
//       this._duration = undefined;
//     }
//   }
//
//   get duration(): number {
//     return this._duration;
//   }
//
//   set duration(value: number) {
//     if(this.stDate){
//       this.enDate.setTime(this.stDate.getTime() + value * 86400000);
//     }
//     this._duration = value;
//   }
//
//
//   getDateStr(date:Date): string{
//     let str = (date ? date.getFullYear() + "-" +
//       (date.getMonth() < 9 ? "0" + (date.getMonth() + 1) :
//         (date.getMonth() + 1)) + "-" +
//       (date.getDate() < 10 ? "0" + date.getDate() :
//         date.getDate()) : "");
//     return str;
//   }
//
//   days(): number {
//     if (!this.stDate || !this.enDate) {
//       return undefined;
//     }
//     let timeDiff: number = this.enDate.getTime() - this.stDate.getTime();
//     if (timeDiff < 1) {
//       alert("Please correct start or end date");
//       this.enDate = null;
//       return undefined;
//     } else {
//       timeDiff /= 86400000;
//       return Math.ceil(timeDiff);
//     }
//   }
//
//   ngOnInit() {
//     this._duration = this.days();
//   }
//
//
// }
