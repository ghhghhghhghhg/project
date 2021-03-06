"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var ComboBoxComponent = (function () {
    function ComboBoxComponent() {
        this.selectedValue = -1;
        this.selectedId = new core_1.EventEmitter();
    }
    ComboBoxComponent.prototype.exportId = function (value) {
        this.selectedId.emit(value);
    };
    return ComboBoxComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ComboBoxComponent.prototype, "listObj", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], ComboBoxComponent.prototype, "selectedValue", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], ComboBoxComponent.prototype, "selectedId", void 0);
ComboBoxComponent = __decorate([
    core_1.Component({
        selector: 'combo-box-app',
        templateUrl: './combo-box.component.html',
        styleUrls: ['./combo-box.component.css']
    })
], ComboBoxComponent);
exports.ComboBoxComponent = ComboBoxComponent;
//# sourceMappingURL=combo-box.component.js.map