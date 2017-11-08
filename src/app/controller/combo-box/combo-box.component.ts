import {Component, EventEmitter, Input, Output} from "@angular/core";

interface List {
  id: number,
  name: string
}

@Component({
  selector: 'combo-box-app',
  templateUrl: './combo-box.component.html',
  styleUrls: ['./combo-box.component.css']
})
export class ComboBoxComponent {
  @Input() listObj: List;
  @Input() selectedValue: number = -1;
  @Output() selectedId = new EventEmitter<number>();

  /**
   * Emit id of selectedValue
   * @param {number} value
   */
  exportId(value: number) {
    this.selectedId.emit(value);
  }

}
