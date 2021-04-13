import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
// import 'rxjs/Rx';  

@Injectable({
  providedIn: 'root'
})
export class MyservicesService {


  public subject = new Subject<String>();

  constructor(private http: HttpClient) {

   }

   getItems():Observable<any> {

    const url=`http://145.239.206.89/Interview/api/test/items/?fields=id,name,description,ItemCategory,DefaultPriceConcessionID,DefaultPriceConcessionName,active `
    return this.http.get<any[]>(url);
  }

  searchText(searchText):Observable<any>{
    const url=`http://145.239.206.89/Interview/api/test/items/?fields=id,name,description,ItemCategory,DefaultPriceConcessionID,DefaultPriceConcessionName,active&SearchText=${searchText}`
    return this.http.get<any[]>(url);
  }

  getItem():Observable<any> {

    const url=`http://145.239.206.89/Interview/api/test/items/34?include=itempricegroups,pricegroups&priceconcessionid=1`
    return this.http.get<any>(url);
  }

  sendSearchText(searchText){
    this.subject.next(searchText);
  }

  getSearchText():Observable<String>{
    return this.subject.asObservable();
  }
}
