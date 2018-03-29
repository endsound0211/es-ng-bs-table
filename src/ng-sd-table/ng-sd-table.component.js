var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Component } from '@angular/core';
import { NgTableComponent } from "../ng-table/ng-table.component";
import { isNullOrUndefined } from "util";
import { HttpParams } from "@angular/common/http";
import * as $ from 'jquery';
var NgSdTableComponent = /** @class */ (function (_super) {
    __extends(NgSdTableComponent, _super);
    function NgSdTableComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NgSdTableComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.keep)
            this.keepConfigure();
        this.httpSub = this.url$
            .filter(function (url) { return !isNullOrUndefined(url) && Boolean(url); })
            .combineLatest(this.params$, function (url, params) { return { url: url, params: params }; })
            .do(function () { return _this.isLoading = true; })
            .switchMap(function (connectInfo) { return _this.http.get(connectInfo.url, { params: new HttpParams({ fromString: $.param(connectInfo.params) }) }); })
            .map(function (data) { return _this.responseHandler(data); })
            .subscribe(function (pageData) {
            _this.data = pageData.rows;
            _this.initRows(pageData.rows, pageData.total);
            _this.isLoading = false;
        });
    };
    NgSdTableComponent.prototype.ngAfterViewInit = function () {
    };
    NgSdTableComponent.prototype.ngOnChanges = function (changes) {
    };
    NgSdTableComponent.decorators = [
        { type: Component, args: [{
                    selector: 'es-ng-sd-table',
                    templateUrl: './ng-sd-table.component.html',
                    styleUrls: ['./ng-sd-table.component.css']
                },] },
    ];
    /** @nocollapse */
    NgSdTableComponent.ctorParameters = function () { return []; };
    return NgSdTableComponent;
}(NgTableComponent));
export { NgSdTableComponent };
//# sourceMappingURL=ng-sd-table.component.js.map