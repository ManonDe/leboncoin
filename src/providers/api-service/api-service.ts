import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ConfigUrlApi} from '../../Utils/ConfigUrlApi'
import { Observable } from 'rxjs/Observable';

//Model 
import {Advert} from '../../Models/advert'

/*
  Generated class for the ApiServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiServiceProvider {

  constructor(public http: HttpClient, private configUrlApi:ConfigUrlApi) {
  }

  //Get All Adverts in Mongoose
  getAllAdverts(token:string):Observable<any>{
    
    let header = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
    var token = "JWT " + token;
    header = header.append('authorization',token);
    let _options = { headers: header };
    return this.http.get(this.configUrlApi.AdvertUrlApi, _options);
  }

  //Post Advert in Mongoose
  postAdvert(advert:Advert,token:string):Observable<any>{
    let header = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
    var token = "JWT " + token;
    header = header.append('authorization',token);
    let body = this.serializeObj(advert);
    let _options = { headers: header };
    return this.http.post(this.configUrlApi.AdvertUrlApi, body ,_options)
  }

  //Put Advert in Mongoose
  PutAdvert(advert:Advert,token:string):Observable<any>{
    let header = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
    var token = "JWT " + token;    
    header = header.append('authorization',token);
    let body = this.serializeObj(advert);
    let _options = { headers: header };
    return this.http.put(this.configUrlApi.AdvertUrlApi + '/' + advert._id, body ,_options)
  }

  //Delete Advert in Mongoose
  DeleteAdvert(advertId,token:string):Observable<any>{
    let header = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
    var token = "JWT " + token;    
    header = header.append('authorization',token);
    let _options = { headers: header };
    return this.http.delete(this.configUrlApi.AdvertUrlApi + '/' + advertId, _options);
  }

  private serializeObj(obj) {
    var result = [];
    for (var property in obj)
        result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

    return result.join("&");
}

}
