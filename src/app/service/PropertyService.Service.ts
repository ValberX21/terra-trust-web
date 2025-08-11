import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { Property } from "../interfaces/Property.interface";
import { PagedResult } from "../interfaces/PagedResult.interface";

@Injectable({
    providedIn:'root'
})

export class PropertyService{

    constructor(private http: HttpClient){}

    listProperty(page = 1, pageSize = 5){
        const params = new HttpParams()
        .set('pageSize', pageSize.toString())
        .set('page', page.toString());

        return this.http.get<PagedResult<Property>>(
            `${environment.apiUrl}properties`,
             { params }
        );
    }
}