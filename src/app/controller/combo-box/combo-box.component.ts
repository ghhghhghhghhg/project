import {Component, EventEmitter, Input, Output} from "@angular/core";
import {FormGroup} from "@angular/forms";

interface List{
  id: number,
  name: string
}

@Component({
  selector: 'combo-box-app',
  templateUrl: './combo-box.component.html',
  styleUrls: ['./combo-box.component.css']
})
export class ComboBoxComponent{
  @Input() controlName: string = "select";
  @Input() group: FormGroup;
  @Input() listObj: List;
  @Input() selectedValue: number;
  @Output() selectedId = new EventEmitter<number>();

  exportId(value:number){
    this.selectedId.emit(value);
  }


}
