import "rxjs/add/observable/throw";
import "rxjs/add/observable/combineLatest";
import "rxjs/add/observable/from";
import "rxjs/add/observable/of";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/combineLatest";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/skip";
import "rxjs/add/operator/take";
import "rxjs/add/operator/toPromise";
import "rxjs/add/operator/publishReplay";
import "rxjs/add/operator/concatMap";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgTableComponent } from './ng-table/ng-table.component';
import { NgTableColComponent } from './ng-table-col/ng-table-col.component';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from "@angular/forms";
import { NgSdTableComponent } from './ng-sd-table/ng-sd-table.component';
import { NgTableGeneralSearchComponent } from './ng-table-general-search/ng-table-general-search.component';
import { TemplateTypePipe } from './template-type.pipe';
import { NgTableToolBarComponent } from './ng-table-tool-bar/ng-table-tool-bar.component';
var BsTableModule = /** @class */ (function () {
    function BsTableModule() {
    }
    BsTableModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        NgbModule.forRoot(),
                        FormsModule
                    ],
                    declarations: [
                        NgTableComponent,
                        NgTableColComponent,
                        NgSdTableComponent,
                        NgTableGeneralSearchComponent,
                        TemplateTypePipe,
                        NgTableToolBarComponent,
                    ],
                    exports: [
                        NgTableComponent,
                        NgTableColComponent,
                        NgSdTableComponent,
                        NgTableToolBarComponent,
                        NgTableGeneralSearchComponent,
                    ]
                },] },
    ];
    /** @nocollapse */
    BsTableModule.ctorParameters = function () { return []; };
    return BsTableModule;
}());
export { BsTableModule };
//# sourceMappingURL=bs-table.module.js.map