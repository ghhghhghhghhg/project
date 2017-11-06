import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Router} from "@angular/router";

interface Title{
  code: string;
  title: string;
  modifyUser: string;
  modifyDate: Date;
}

@Component({
  selector: 'header-app',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent{
  @Input() isValid: boolean = false;
  @Input() url: string;
  @Input()project: Title;
  @Output() event = new EventEmitter<number>();

  constructor(private router: Router){}

  OutputEvent(value: number){
    this.event.emit(value);
  }

  redirect(){
    this.event.emit();
    this.router.navigate([this.url]);
  }

}

