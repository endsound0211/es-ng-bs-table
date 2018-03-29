import { Component, ContentChild, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { isNullOrUndefined } from "util";
var NgTableColComponent = /** @class */ (function () {
    function NgTableColComponent() {
        this.checkbox = false;
        this.radio = false;
        this.formatter = function (value) {
            return value ? value + '' : '-';
        };
        this.cellClick = new EventEmitter();
    }
    NgTableColComponent.prototype.ngOnInit = function () {
        if (isNullOrUndefined(this.textTemplate))
            this.textTemplate = this.defaultTextTemplate;
        if (isNullOrUndefined(this.editTemplate))
            this.editTemplate = this.defaultEditTemplate;
    };
    NgTableColComponent.decorators = [
        { type: Component, args: [{
                    selector: 'es-ng-table-col',
                    templateUrl: './ng-table-col.component.html',
                    styleUrls: ['./ng-table-col.component.css']
                },] },
    ];
    /** @nocollapse */
    NgTableColComponent.ctorParameters = function () { return []; };
    NgTableColComponent.propDecorators = {
        "title": [{ type: Input },],
        "field": [{ type: Input },],
        "checkbox": [{ type: Input },],
        "radio": [{ type: Input },],
        "formatter": [{ type: Input },],
        "defaultTextTemplate": [{ type: ViewChild, args: ['textTemplate',] },],
        "textTemplate": [{ type: ContentChild, args: ['textTemplate',] },],
        "defaultEditTemplate": [{ type: ViewChild, args: ['editTemplate',] },],
        "editTemplate": [{ type: ContentChild, args: ['editTemplate',] },],
        "cellClick": [{ type: Output },],
    };
    return NgTableColComponent;
}());
export { NgTableColComponent };
//# sourceMappingURL=ng-table-col.component.js.map