# ES Angular Boostrap Table

## Features
* create for boostrap 4
* get json data from server
* flexible header and cell template
* support client and server pagination
* keep search result on url
* easy extend tool to add toolbar

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

under construction...

## Method

under construction...

## Input

under construction...

## Output

under construction...