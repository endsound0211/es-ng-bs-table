import {AfterViewInit, Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {NgTableComponent} from "../ng-table/ng-table.component";
import {Page} from "../page";
import {isNullOrUndefined} from "util";
import {HttpParams} from "@angular/common/http";
import * as $ from 'jquery';

@Component({
  selector: 'es-ng-sd-table',
  templateUrl: './ng-sd-table.component.html',
  styleUrls: ['./ng-sd-table.component.css']
})
export class NgSdTableComponent extends NgTableComponent implements OnInit, AfterViewInit, OnChanges{

  ngOnInit(){
    if(this.keep) this.keepConfigure();

    this.httpSub = this.url$
      .filter((url) => !isNullOrUndefined(url) && Boolean(url))
      .combineLatest(this.params$, (url, params) => {return {url: url, params: params}})
      .do(() => this.isLoading = true)
      .switchMap((connectInfo) => this.http.get<Page<any>>(connectInfo.url, {params: new HttpParams({fromString: $.param(connectInfo.params)})}))
      .map((data) => this.responseHandler(data))
      .subscribe((pageData) => {
        this.data = pageData.rows;
        this.initRows(pageData.rows, pageData.total);
        this.isLoading = false;
      })
  }

  ngAfterViewInit(): void{

  }

  ngOnChanges(changes: SimpleChanges): void {

  }
}
