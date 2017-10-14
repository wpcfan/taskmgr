import {Inject, Injectable} from '@angular/core';
import {HttpHeaders, HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Auth, User} from '../domain';

/**
 * 认证服务主要用于用户的注册和登录功能
 */
@Injectable()
export class AuthService {
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  /**
   * 构造函数用于注入服务的依赖以及进行必要的初始化
   *
   * @param http 注入Http
   * @param config 注入基础配置
   */
  constructor(private http: HttpClient,
              @Inject('BASE_CONFIG') private config: {uri: string}) {
  }

  /**
   * 使用用户提供的个人信息进行注册，成功则返回 User，否则抛出异常
   *
   * @param user 用户信息，id 属性会被忽略，因为服务器端会创建新的 id
   */
  register(user: User): Observable<Auth> {
    const uri = `${this.config.uri}/auth/register`;
    return this.http.post<Auth>(uri, JSON.stringify(user), {headers: this.headers});
  }

  /**
   * 使用用户名和密码登录
   *
   * @param username 用户名
   * @param password 密码（明文），服务器会进行加密处理
   */
  login(username: string, password: string): Observable<Auth> {
    const uri = `${this.config.uri}/auth`;
    return this.http
      .post<Auth>(
        uri,
        JSON.stringify({'username': username, 'password': password}),
        {headers: this.headers});
  }
}
