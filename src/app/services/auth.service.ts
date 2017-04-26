import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import * as wilddog from 'wilddog'
import * as models from '../domain';

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
    @Inject('BASE_URI') private baseUri) { 
      const config = {
        authDomain: "taskmgr.wilddog.com"
      };
      wilddog.initializeApp(config);
    }

  /**
   * 使用用户提供的个人信息进行注册，成功则返回 User，否则抛出异常
   * 
   * @param user 用户信息，id 属性会被忽略，因为服务器端会创建新的 id
   */
  register(user: models.User): Observable<models.Auth>{
    // const uri = `${this.baseUri}/${this.domain}/register`;
    // return this.http.post(uri, JSON.stringify(user), {headers: this.headers})
    //   .map(res => res.json());
    const auth = wilddog.auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(u => Object.assign({}, {
        token: u.getToken(),
        user: {
          id: u.uid,
          email: u.email
        }
      }));
    return Observable.from(auth);
  }

  /**
   * 使用用户名和密码登录
   * 
   * @param username 用户名
   * @param password 密码（明文），服务器会进行加密处理
   */
  login(email: string, password: string): Observable<models.Auth>{
    // const uri = `${this.baseUri}/${this.domain}`;
    // return this.http.post(
    //   uri, 
    //   JSON.stringify({username: username, password: password}), 
    //   {headers: this.headers})
    //   .map(res => res.json());
    const auth = wilddog.auth()
      .signInWithEmailAndPassword(email, password)
      .then(u => Object.assign({}, {
        token: u.getToken(),
        user: {
          id: u.uid,
          email: u.email
        }
      }));
    return Observable.from(auth);
  }

  logout(): Observable<void> {
    return Observable.from(wilddog.auth().signOut());
  }
}
