import { HttpClient ,HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from '../../../node_modules/rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
// @Injectable()
export class RestProvider {

  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
  }

  private apiUrlLogin = 'http://111.161.41.25/JiuHua-OA/api/login';//登录地址
  // private apiUrlLogin = 'https://imoocqa.gugujiankong.com/api/account/login';//登录地址
  login(userName,password, code): Observable<string[]> {
    return this.getUrlReturn(this.apiUrlLogin + "?userName=" + userName + "&password=" + password+ "&code=" + code);
  }
  /**
   *
   *全局http请求
   * @private
   * @param {string} url
   * @returns {Observable<string[]>}
   * @memberof RestProvider
   */
  private getUrlReturn(url: string): Observable<string[]> {
    return this.http.get(url)
      .map(this.returnData)
      .catch(this.handleError)
  }

  private returnData(res: Response) {
    let body = res.json();
    return body || {};
  }
  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.toString || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
