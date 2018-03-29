# ES Angular Boostrap Table

## Features
* create for boostrap 4
* card view in mobile
* get json data from server
* flexible header and cell template
* support client and server pagination
* keep search result on url
* easy to extend tool

under construction...

## Table of contents

* [Setup](#setup)
* [Usage](#usage)
* [Variable](#variable)
* [Method](#metod)
* [Input](#input)
* [Output](#output)

## Setup

First you need to install the npm module
````
npm install es-ng-bs-table
````

Then import the 'HttpClientModule' and 'BsTableModule' to module
````typescript
import {NgModule} from "@angular/core"
import {HttpClientModule} from "@angular/common/http";
import {BsTableModule} from "es-ng-bs-table";

@NgModule{
    imports: [
        HttpClientModule,
        BsTableModule,
        //if you want to keep search result
        //RouterModule
    ],
    /* if you want to add some http interceptors
    providers: [
        {provide: HTTP_INTERCEPTORS ...}
    ]
    */
}
export class AppModule{}
````

## Usage

under construction...

## Variable

### NgTableComponent & NgSdTableComponent

| Name     | Type         | Default | Description |
|----------|--------------|---------|-------------|
| `data`   | Array<any>   |         | data of rows.
| `rows`   | Array<any>   | []      | current data of rows.
| `total`  | number       |         | size of total data.
| `page`   | number       | 1       | current page.
| `size`   | number       | 10      | size in a page.
| `search` | string       |         | search text, used in general search.
| `query`  | string       |         | query json, user in advanced search.
| `sort`   | string       |         | sort by field.
| `order`  | 'asc' 'desc' | 'asc'   | order.
| `url`    | string       |         | get json from url.
| `keep`   | boolean      | false   | keep search result.

### NgTableColComponent

| Name       | Type    | Default | Description |
|------------|---------|---------|-------------|
| `title`    | string  |         | th text.
| `field`    | string  |         | field name in row.
| `checkbox` | boolean | false   | is checkbox cell?
| `radio`    | boolean | false   | is radio cell?

## Method

### NgTableComponent & NgSdTableComponent

| Name             | Param          | Return     | Description |
|------------------|----------------|------------|-------------|
| `refresh`        |                | void       | refresh rows.
| `generalSearch`  | (term: string) | void       | general search.
| `advancedSearch` | (query: any)   | void       | advance search.
| `getSelections`  |                | Array<any> | get selected rows.

## Input

### NgTableComponent & NgSdTableComponent

| Name              | Type         | Default | Description |
|-------------------|--------------|---------|-------------|
| `data`            | Array<any>   |         | data of rows.
| `url`             | string       |         | get json from url.
| `sort`            | string       |         | sort by field.
| `order`           | 'asc' 'desc' | 'asc'   | order.
| `keep`            | boolean      | false   | keep search result.
| `queryFun`        | Function     |         | (client pagination) advanced search. (row: any, index: number, query: any) => Array<any>
| `responseHandler` | Function     |         | handler after get data from url. (data: any) => any


### NgTableColComponent

| Name        | Type     | Default | Description |
|-------------|----------|---------|-------------|
| `title`     | string   |         | th text.
| `field`     | string   |         | field name in row.
| `checkbox`  | boolean  | false   | is checkbox cell?
| `radio`     | boolean  | false   | is radio cell?
| `formatter` | Function |         | formatter cell. (value: any) => string

## Output

### NgTableComponent & NgSdTableComponent

| Name         | Type | Description |
|--------------|------|-------------|
| `onRowClick` | any  | fired when row be clicked.

### NgTableColComponent

| Name         | Type | Description |
|--------------|------|-------------|
| `nCellClick` | any  | fired when cell be clicked.
