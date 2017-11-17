import {Component, EventEmitter, Input, Output} from "@angular/core";

interface ComboBoxItem {
  id: number,
  name: string
}

@Component({
  selector: 'sis-combo-box',
  templateUrl: './combo-box.component.html',
  styleUrls: ['./combo-box.component.css']
})
export class ComboBoxComponent {
  @Input() listObj: ComboBoxItem[];
  @Input() selectedValue: number = -1;
  @Output() selectedId = new EventEmitter<number>();

  /**
   * Emit id of selectedValue
   * @param {number} value
   */
  exportId(value: number): void {
    this.selectedId.emit(value);
  }

}
