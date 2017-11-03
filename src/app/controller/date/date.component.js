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
var DateComponent = (function () {
    function DateComponent() {
    }
    Object.defineProperty(DateComponent.prototype, "duration", {
        get: function () {
            return this._duration;
        },
        set: function (value) {
            this._duration = value;
            if (this._start) {
                this._end = null;
            }
            this._end = this.endDateSet();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateComponent.prototype, "endStr", {
        get: function () {
            return this.getDateStr(this._end);
        },
        set: function (value) {
            this._end = new Date(value);
            this._duration = this.days();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateComponent.prototype, "endDate", {
        get: function () {
            return this._end;
        },
        set: function (value) {
            this._end = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateComponent.prototype, "startStr", {
        get: function () {
            return this.getDateStr(this._start);
        },
        set: function (value) {
            this._start = new Date(value);
            if (this.duration) {
                this._end = this.endDateSet();
            }
            else {
                this._duration = this.days();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateComponent.prototype, "startDate", {
        get: function () {
            return this._start;
        },
        set: function (value) {
            this._start = value;
        },
        enumerable: true,
        configurable: true
    });
    DateComponent.prototype.getDateStr = function (date) {
        var str = (date ? date.getFullYear() + "-" +
            (date.getMonth() < 9 ? "0" + (date.getMonth() + 1) :
                (date.getMonth() + 1)) + "-" +
            (date.getDate() < 10 ? "0" + date.getDate() :
                date.getDate()) : "");
        return str;
    };
    DateComponent.prototype.days = function () {
        if (!this._start || !this._end) {
            return undefined;
        }
        var timeDiff = this._end.getTime() - this._start.getTime();
        if (timeDiff < 1) {
            alert("Please replace start or end date");
            this._end = null;
            return undefined;
        }
        else {
            timeDiff /= 86400000;
            return Math.ceil(timeDiff);
        }
    };
    DateComponent.prototype.endDateSet = function () {
        var endDates = new Date();
        endDates.setTime(this._start.getTime() + this._duration * 86400000);
        return endDates;
    };
    DateComponent.prototype.ngOnInit = function () {
        this._start = this.stDate;
        this._end = this.enDate;
        this._duration = this.days();
    };
    return DateComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Date)
], DateComponent.prototype, "stDate", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Date)
], DateComponent.prototype, "enDate", void 0);
DateComponent = __decorate([
    core_1.Component({
        selector: "date-app",
        templateUrl: "./date.component.html",
        styleUrls: ["./date.component.css"]
    })
], DateComponent);
exports.DateComponent = DateComponent;
//# sourceMappingURL=date.component.js.map