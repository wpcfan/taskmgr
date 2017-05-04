import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import * as models from '../domain';

/**
 * 认证服务主要用于用户的注册和登录功能
 */
@Injectable()
export class AuthService {
  private headers = new Headers({
    'Content-Type': 'application/json'
  })

  /**
   * 构造函数用于注入服务的依赖以及进行必要的初始化
   * 
   * @param http 注入Http
   * @param config 注入基础配置
   */
  constructor(
    private http: Http,
    @Inject('BASE_CONFIG') private config) { 
      this.headers.append('X-LC-Id', config.LCId);
      this.headers.append('X-LC-Key', config.LCKey);
    }

  /**
   * 使用用户提供的个人信息进行注册，成功则返回 User，否则抛出异常
   * 
   * @param user 用户信息，id 属性会被忽略，因为服务器端会创建新的 id
   */
  register(user: models.User): Observable<models.Auth>{
    const uri =  `${this.config.uri}/users`;
    const userToAdd = {
      "username": user.email,
      "password": user.password,
      "email": user.email,
      "roles":{
        "__op": "AddRelation", 
        "objects": [
          {
            "__type":"Pointer",
            "className":"_Role",
            "objectId":"590acf4644d904006d8f9ecf"
          }
        ]
      }
    };
    return this.http
      .post(uri, JSON.stringify(userToAdd), {headers: this.headers})
      .map(res => Object.assign({}, {
        token: res.json().sessionToken,
        user: Object.assign({}, user, {id: res.json().objectId})
      }));
  }

  /**
   * 使用用户名和密码登录
   * 
   * @param username 用户名
   * @param password 密码（明文），服务器会进行加密处理
   */
  login(email: string, password: string): Observable<models.Auth>{
    const uri =  `${this.config.uri}/login`;
    const userToLogin = {
      "username": email,
      "password": password
    };
    return this.http
      .post(uri, JSON.stringify(userToLogin), {headers: this.headers})
      .map(res => Object.assign({}, {
        token: res.json().sessionToken,
        user: Object.assign({}, {id: res.json().objectId, email: res.json().username})
      }));
  }
}
