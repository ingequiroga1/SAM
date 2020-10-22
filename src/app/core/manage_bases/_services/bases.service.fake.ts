// Angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// RxJS
import { Observable, forkJoin, of } from 'rxjs';
import { mergeMap, delay } from 'rxjs/operators';
// Lodash
import { each } from 'lodash';
// CRUD
import { HttpUtilsService, QueryParamsModel, QueryResultsModel } from '../../_base/crud';
// Models
import { BasesModel } from '../_models/bases.model';
import { environment } from 'src/environments/environment';
import { CustomerModel } from '../../e-commerce';

const API_CUSTOMERS_URL = 'api/customers';

// Fake REST API (Mock)
// This code emulates server calls
@Injectable()
export class BasesService {
  constructor(private http: HttpClient, private httpUtils: HttpUtilsService) {
  }

   createBase(base: BasesModel): Observable<BasesModel> {
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Content-Type', 'application/json');
    debugger;
    return this.http.post<BasesModel>("https://movencosamtest-movencoapi.azurewebsites.net/api/Base", base, {headers: httpHeaders});
  }

  // READ
  getAllBases(): Observable<BasesModel[]> {
    // return this.http.get<CustomerModel[]>(API_CUSTOMERS_URL);
    return this.http.get<BasesModel[]>("https://movencosamtest-movencoapi.azurewebsites.net/api/Base");
  }


  getAllNumbers(): Observable<CustomerModel[]> {
    // return this.http.get<CustomerModel[]>(API_CUSTOMERS_URL);
    return this.http.get<CustomerModel[]>("https://movencosamtest-movencoapi.azurewebsites.net/api/Client");
  }

  getNextNumber(): Observable<string> {

    return this.http.get<string>("https://movencosamtest-movencoapi.azurewebsites.net/api/Base/BaseNumber");
  }


  getBaseById(clientId: number): Observable<BasesModel> {
    return this.http.get<BasesModel>(API_CUSTOMERS_URL + `/${clientId}`);
  }

  // Method from server should return QueryResultsModel(items: any[], totalsCount: number)
  // items => filtered/sorted result
  findBases(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
    // This code imitates server calls
    // const url = "https://movencosamtest-movencoapi.azurewebsites.net/api/Base";
    return this.http.get<BasesModel[]>("https://movencosamtest-movencoapi.azurewebsites.net/api/Base").pipe(
      mergeMap(res => {
        const result = this.httpUtils.baseFilter(res, queryParams, ['status', 'type']);
        debugger;
        return of(result);
      })
    );
  }


  // UPDATE => PUT: update the Base on the server
  // updateBase(base: BasesModel): Observable<any> {
  //   const httpHeader = this.httpUtils.getHTTPHeaders();
  //   return this.http.put(API_CUSTOMERS_URL, base, {headers: httpHeader});
  // }

  // UPDATE Status
  // updateStatusForBase(bases: BasesModel[], status: string): Observable<any> {
  //   const tasks$ = [];
  //   each(bases, element => {
  //     // tslint:disable-next-line
  //     const _base = Object.assign({}, element);
  //     _base.statusId = status;
  //     tasks$.push(this.updateBase(_base));
  //   });
  //   return forkJoin(tasks$);
  // }

  // DELETE => delete the Base from the server
  deleteBase(clientId: number): Observable<any> {
    const url = `${API_CUSTOMERS_URL}/${clientId}`;
    return this.http.delete<BasesModel>(url);
  }

  deleteBases(ids: number[] = []): Observable<any> {
    const tasks$ = [];
    const length = ids.length;
    // tslint:disable-next-line:prefer-const
    for (let i = 0; i < length; i++) {
      tasks$.push(this.deleteBase(ids[i]));
    }
    return forkJoin(tasks$);
  }
}
