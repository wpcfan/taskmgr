import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import * as entities from '../domain';

/**
 * 认证服务主要用于用户的注册和登录功能
 */
@Injectable()
export class AuthService {
  // 定义Request Headers
  private headers: Headers = new Headers({'Content-Type': 'application/json'});
  // 定义此服务的rest api路径
  private domain: string = 'auth';

  /**
   * 构造函数用于注入服务的依赖以及进行必要的初始化
   * 
   * @param http 注入Http服务
   * @param baseUri 注入API的基础路径
   */
  constructor(
    private http: Http,
    @Inject('BASE_URI') private baseUri) { }

  /**
   * 使用用户提供的个人信息进行注册，成功则返回 User，否则抛出异常
   * 
   * @param user 用户信息，id 属性会被忽略，因为服务器端会创建新的 id
   */
  register(user: entities.User): Observable<entities.User>{
    // const uri = `${this.baseUri}/${this.domain}/register`;
    const uri = `${this.baseUri}/users`;
    return this.http.post(uri, JSON.stringify(user), {headers: this.headers})
      .map(res => res.json());
  }

  /**
   * 使用用户名和密码登录
   * 
   * @param username 用户名
   * @param password 密码（明文），服务器会进行加密处理
   */
  login(username: string, password: string): Observable<entities.User>{
    // const uri = `${this.baseUri}/${this.domain}/login`;
    // return this.http.post(
    //   uri, 
    //   JSON.stringify({username: username, password: password}), 
    //   {headers: this.headers})
    //   .map(res => res.json());
    const uri = `${this.baseUri}/users?username=${username}`;
    return this.http.get(uri).map(res => {
      const data = res.json();
      return data[0];
    });
  }
}
