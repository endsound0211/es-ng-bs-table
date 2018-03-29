import { Component, Optional } from '@angular/core';
import { NgTableComponent } from "../ng-table/ng-table.component";
import { NgSdTableComponent } from "../ng-sd-table/ng-sd-table.component";
import { isNullOrUndefined } from "util";
var NgTableGeneralSearchComponent = /** @class */ (function () {
    function NgTableGeneralSearchComponent(ngTableComponent, ngSdTableComponent) {
        this.ngTableComponent = ngTableComponent;
        this.ngSdTableComponent = ngSdTableComponent;
        this.searchTerm = "";
    }
    NgTableGeneralSearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.table = isNullOrUndefined(this.ngTableComponent) ? this.ngSdTableComponent : this.ngTableComponent;
        this.table.search$
            .take(1)
            .subscribe(function (term) { return _this.searchTerm = term; });
    };
    NgTableGeneralSearchComponent.prototype.search = function (searchTerm) {
        this.table.generalSearch(searchTerm);
    };
    NgTableGeneralSearchComponent.decorators = [
        { type: Component, args: [{
                    selector: 'es-ng-table-general-search',
                    templateUrl: './ng-table-general-search.component.html',
                    styleUrls: ['./ng-table-general-search.component.css']
                },] },
    ];
    /** @nocollapse */
    NgTableGeneralSearchComponent.ctorParameters = function () { return [
        { type: NgTableComponent, decorators: [{ type: Optional },] },
        { type: NgSdTableComponent, decorators: [{ type: Optional },] },
    ]; };
    return NgTableGeneralSearchComponent;
}());
export { NgTableGeneralSearchComponent };
//# sourceMappingURL=ng-table-general-search.component.js.map