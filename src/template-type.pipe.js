import { Pipe } from '@angular/core';
export var TD_TEMPLATE;
(function (TD_TEMPLATE) {
    TD_TEMPLATE[TD_TEMPLATE["TEXT"] = 0] = "TEXT";
    TD_TEMPLATE[TD_TEMPLATE["CHECKBOX"] = 1] = "CHECKBOX";
    TD_TEMPLATE[TD_TEMPLATE["RADIO"] = 2] = "RADIO";
})(TD_TEMPLATE || (TD_TEMPLATE = {}));
;
var TemplateTypePipe = /** @class */ (function () {
    function TemplateTypePipe() {
    }
    TemplateTypePipe.prototype.transform = function (col) {
        if (col.checkbox)
            return TD_TEMPLATE.CHECKBOX;
        if (col.radio)
            return TD_TEMPLATE.RADIO;
        else
            return TD_TEMPLATE.TEXT;
    };
    TemplateTypePipe.decorators = [
        { type: Pipe, args: [{
                    name: 'templateType'
                },] },
    ];
    /** @nocollapse */
    TemplateTypePipe.ctorParameters = function () { return []; };
    return TemplateTypePipe;
}());
export { TemplateTypePipe };
//# sourceMappingURL=template-type.pipe.js.map