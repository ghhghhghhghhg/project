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
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw");
var ProjectService = (function () {
    function ProjectService(http) {
        this.http = http;
    }
    ProjectService.prototype.getPortfolioList = function () {
        return this.http.get('app/shared/mock/get-projects-res.json', { headers: this.getHeaders() })
            .map(function (resp) { return resp; })
            .catch(function (error) { return Observable_1.Observable.throw(error); });
    };
    ProjectService.prototype.postDate = function (obj) {
        var body = JSON.stringify(obj);
        return this.http.post("http://localhost:8080/projects", body, { headers: this.getHeaders() });
    };
    ProjectService.prototype.putDate = function (obj) {
        var body = JSON.stringify(obj);
        return this.http.put("http://localhost:8080/projects/" + obj.id, body, { headers: this.getHeaders() });
    };
    ProjectService.prototype.deleteData = function (id) {
        return this.http.delete("http://localhost:8080/projects/" + id)
            .map(function (resp) { return resp.json(); })
            .catch(function (error) { return Observable_1.Observable.throw(error); });
    };
    ProjectService.prototype.getProjectById = function (id) {
        return this.http.get('app/shared/mock/get-project-byId-res.json', { headers: this.getHeaders() })
            .map(function (resp) { return resp; })
            .catch(function (error) { return Observable_1.Observable.throw(error); });
    };
    ProjectService.prototype.getHeaders = function () {
        var headers = new http_1.Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json;charset=utf-8');
        return headers;
    };
    return ProjectService;
}());
ProjectService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], ProjectService);
exports.ProjectService = ProjectService;
//# sourceMappingURL=project.service.js.map