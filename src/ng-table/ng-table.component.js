import { Component, ContentChildren, EventEmitter, Input, Output, QueryList } from '@angular/core';
import { NgTableColComponent } from "../ng-table-col/ng-table-col.component";
import { from } from "linq/linq";
import { isNullOrUndefined, isObject } from "util";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { ActivatedRoute, Router } from "@angular/router";
import { TD_TEMPLATE } from "../template-type.pipe";
var NgTableComponent = /** @class */ (function () {
    function NgTableComponent(http, router, route) {
        var _this = this;
        this.http = http;
        this.router = router;
        this.route = route;
        this.TD_TEMPLATE = TD_TEMPLATE;
        this.rows$ = new BehaviorSubject([]);
        //pagination
        this.page$ = new BehaviorSubject(1);
        this.size$ = new BehaviorSubject(10);
        this.sizeList = [10, 25, 50, 100];
        //search
        this.search$ = new BehaviorSubject("");
        this.query$ = new BehaviorSubject({});
        this.queryFun = function (row, index, query) {
            return !from(query).where(function (field) {
                var formatter = from(_this.cols.toArray())
                    .where(function (col) { return col.field == field.key; })
                    .select(function (col) { return col.formatter; })
                    .defaultIfEmpty(function (value) { return value + ""; }).first();
                return formatter(row[field.key]).toString().includes(field.value.toString());
            }).isEmpty();
        };
        this.sort$ = new BehaviorSubject("");
        this.order$ = new BehaviorSubject('asc');
        //refresh
        this.refresh$ = new BehaviorSubject(0);
        //http async
        this.url$ = new BehaviorSubject("");
        //keep
        this.keep = false;
        this.params$ = Observable.combineLatest(this.refresh$, this.page$, this.size$, this.sort$, this.order$, this.search$, this.query$, function (refresh, offset, limit, sort, order, search, query) {
            var params = {
                offset: _this.startIndex,
                limit: limit,
                order: order
            };
            if (sort)
                params['sort'] = sort;
            if (search)
                params['search'] = search;
            if (!isNullOrUndefined(query) && isObject(query) && Object.keys(query).length > 0)
                params['query'] = JSON.stringify(query);
            return params;
        })
            .debounceTime(500);
        // .distinctUntilChanged((x, y) => JSON.stringify(x) === JSON.stringify(y));
        //loading;
        this.isLoading = false;
        //event
        this.rowClick = new EventEmitter();
        //handler
        this.responseHandler = function (data) {
            return data;
        };
    }
    Object.defineProperty(NgTableComponent.prototype, "rows", {
        get: function () { return this.rows$.getValue(); },
        set: function (value) { this.rows$.next(value); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(NgTableComponent.prototype, "page", {
        get: function () { return this.page$.getValue(); },
        set: function (value) { this.page$.next(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgTableComponent.prototype, "size", {
        get: function () { return this.size$.getValue(); },
        set: function (value) { this.size$.next(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgTableComponent.prototype, "search", {
        get: function () { return this.search$.getValue(); },
        set: function (term) { this.search$.next(term); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgTableComponent.prototype, "query", {
        get: function () { return this.query$.getValue(); },
        set: function (value) { this.query$.next(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgTableComponent.prototype, "sort", {
        get: function () { return this.sort$.getValue(); },
        set: function (value) { this.sort$.next(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgTableComponent.prototype, "order", {
        get: function () { return this.order$.getValue(); },
        set: function (value) { this.order$.next(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgTableComponent.prototype, "url", {
        get: function () { return this.url$.getValue(); },
        set: function (value) { this.url$.next(value); },
        enumerable: true,
        configurable: true
    });
    NgTableComponent.prototype.ngOnInit = function () {
        var _this = this;
        //http
        this.httpSub = this.url$
            .filter(function (url) { return !isNullOrUndefined(url) && Boolean(url); })
            .switchMap(function (url) { return _this.http.get(url); })
            .map(function (data) { return _this.responseHandler(data); })
            .subscribe(function (rows) {
            _this.data = rows;
            _this.initRows(rows, rows.length);
        });
        if (this.keep)
            this.keepConfigure();
    };
    NgTableComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.rows$
            .filter(function (rows) { return rows.length > 0; })
            .take(1)
            .subscribe(function () {
            //order
            //order
            _this.orderBySub = Observable.combineLatest(_this.sort$.filter(function (sort) { return sort != ""; }), _this.order$, function (sort, order) { return { sort: sort, order: order }; }).subscribe(function (orderInfo) { return _this.orderBy(orderInfo.sort, orderInfo.order); });
            //search
            //search
            _this.searchSub = _this.search$
                .debounceTime(500)
                .distinctUntilChanged()
                .subscribe(function (term) {
                if (term) {
                    _this.rows = from(_this.data).where(function (row) {
                        return !from(_this.cols.toArray()).where(function (col) { return col.formatter(row[col.field]).toString().includes(term); }).isEmpty();
                    }).toArray();
                    _this.total = _this.rows.length;
                }
                else {
                    _this.initRows(_this.data, _this.data.length);
                }
            });
            //query
            //query
            _this.query$
                .filter(function (query) { return Object.keys(query).length > 0; })
                .filter(function (query) { return !isNullOrUndefined(query); })
                .debounceTime(500)
                .subscribe(function (query) {
                _this.rows = from(_this.data).where(function (row, index) { return _this.queryFun(row, index, query); }).toArray();
                _this.total = _this.rows.length;
                _this.page = 1;
            });
        });
    };
    NgTableComponent.prototype.ngOnChanges = function (changes) {
        if ('data' in changes)
            this.initRows(changes.data.currentValue, changes.data.currentValue.length);
    };
    NgTableComponent.prototype.ngOnDestroy = function () {
        if (!isNullOrUndefined(this.searchSub))
            this.searchSub.unsubscribe();
        if (!isNullOrUndefined(this.httpSub))
            this.httpSub.unsubscribe();
        if (!isNullOrUndefined(this.keepSub))
            this.keepSub.unsubscribe();
        if (!isNullOrUndefined(this.orderBySub))
            this.orderBySub.unsubscribe();
        if (!isNullOrUndefined(this.querySub))
            this.querySub.unsubscribe();
    };
    NgTableComponent.prototype.initRows = function (rows, total) {
        this.rows = rows;
        this.total = total;
    };
    Object.defineProperty(NgTableComponent.prototype, "startIndex", {
        get: function () {
            var index = (this.page - 1) * this.size;
            return isNaN(index) ? 0 : index;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgTableComponent.prototype, "endIndex", {
        get: function () { return this.page * this.size; },
        enumerable: true,
        configurable: true
    });
    NgTableComponent.prototype.getSelections = function (field) {
        return from(this.data).where(function (row) {
            if (row[field])
                return true;
            return false;
        }).toArray();
    };
    NgTableComponent.prototype.checkAll = function (checked, field) {
        Observable.from(this.rows)
            .skip(this.startIndex)
            .take(this.size)
            .subscribe(function (row) { return row[field] = checked; });
    };
    NgTableComponent.prototype.radioChange = function (row, field) {
        Observable.from(this.rows)
            .subscribe(function (r) { return r[field] = false; });
        row[field] = true;
    };
    NgTableComponent.prototype.toggleOrder = function (sort) {
        if (sort == this.sort)
            this.order = this.order == 'asc' ? 'desc' : 'asc';
        else
            this.sort = sort;
    };
    NgTableComponent.prototype.orderBy = function (sort, order) {
        var col = from(this.cols.toArray()).where(function (col) { return col.field == sort; }).first();
        if (col.checkbox || col.radio)
            return;
        var formatter = col.formatter;
        if (order == 'asc')
            this.rows = from(this.rows).orderBy(function (row) { return formatter(row[sort]); }).toArray();
        else
            this.rows = from(this.rows).orderByDescending(function (row) { return formatter(row[sort]); }).toArray();
    };
    NgTableComponent.prototype.keepConfigure = function () {
        var _this = this;
        var queryParams = JSON.parse(JSON.stringify(this.route.snapshot.queryParams));
        if ('sort' in queryParams)
            this.sort = queryParams['sort'];
        if ('search' in queryParams)
            this.search = queryParams['search'];
        if ('limit' in queryParams)
            this.size = +queryParams['limit'];
        if ('offset' in queryParams)
            this.page = +queryParams['offset'] / this.size$.getValue() + 1;
        if ('order' in queryParams)
            this.order = queryParams['order'];
        if ('query' in queryParams && queryParams['query']) {
            queryParams['query'] = JSON.parse(queryParams['query']);
            this.query = queryParams['query'];
        }
        this.keepSub = this.params$.skip(1)
            .subscribe(function (params) { return _this.router.navigate(['.'], { queryParams: params, relativeTo: _this.route, replaceUrl: true }); });
    };
    NgTableComponent.prototype.selectSize = function (size) {
        this.page = 1;
        this.size$.next(size);
    };
    NgTableComponent.prototype.generalSearch = function (term) {
        this.page = 1;
        this.search$.next(term);
    };
    NgTableComponent.prototype.advancedSearch = function (query) {
        this.page = 1;
        this.query$.next(query);
    };
    NgTableComponent.prototype.refresh = function () {
        this.refresh$.next(this.refresh$.getValue() + 1);
    };
    NgTableComponent.decorators = [
        { type: Component, args: [{
                    selector: 'es-ng-table',
                    templateUrl: './ng-table.component.html',
                    styleUrls: ['./ng-table.component.css']
                },] },
    ];
    /** @nocollapse */
    NgTableComponent.ctorParameters = function () { return [
        { type: HttpClient, },
        { type: Router, },
        { type: ActivatedRoute, },
    ]; };
    NgTableComponent.propDecorators = {
        "data": [{ type: Input },],
        "rows$": [{ type: Input },],
        "cols": [{ type: ContentChildren, args: [NgTableColComponent,] },],
        "query": [{ type: Input },],
        "queryFun": [{ type: Input },],
        "sort": [{ type: Input },],
        "order": [{ type: Input },],
        "url": [{ type: Input },],
        "keep": [{ type: Input },],
        "rowClick": [{ type: Output },],
        "responseHandler": [{ type: Input },],
    };
    return NgTableComponent;
}());
export { NgTableComponent };
//# sourceMappingURL=ng-table.component.js.map