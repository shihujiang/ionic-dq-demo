import { Injectable } from '@angular/core';

// import { Http,HttpH } from '@angular/http';
import { HttpClient } from '@angular/common/http';


import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
// import { user } from '../pages/signup/user';
// import { AppConfig } from '../app/app.config';
// import { User } from '../interfaces/user';
import { User } from '../interfaces/user-model';


@Injectable()
export class DqData {
  data: any;
  _favorites: string[] = [];
  HAS_LOGGED_IN = 'hasLoggedIn';
  HAS_SEEN_TUTORIAL = 'hasSeenTutorial';

  constructor(
    public events: Events,
    //public http: Http,
    public storage: Storage,
    private http: HttpClient
  ) { }

  load(): any {
    if (this.data) {
      return Observable.of(this.data);
    } else {
      return this.http.get('assets/data/data.json')
        .map(this.processData, this);
    }
  }

  processData(data: any) {
    console.log(data);
    return this.data;
  }

  post(url, body): any {
    if (this.data) {
      return Observable.of(this.data);
    } else {
      console.log("post body:" + JSON.stringify(body));
      return this.http.post(url, JSON.stringify(body))
        .map(this.processDataPost, this);
    }
  }

  processDataPost(data: any) {
    console.log(data);
    console.log("333");
    return data;
  }

  hasFavorite(sessionName: string): boolean {
    return (this._favorites.indexOf(sessionName) > -1);
  };

  addFavorite(sessionName: string): void {
    this._favorites.push(sessionName);
  };

  removeFavorite(sessionName: string): void {
    let index = this._favorites.indexOf(sessionName);
    if (index > -1) {
      this._favorites.splice(index, 1);
    }
  };


  //退出登录
  logout(): void {
    this.storage.remove(this.HAS_LOGGED_IN);
    this.storage.remove('user');
    this.events.publish('user:logout');
  };



  //缓存用户信息
  storeUser(user: User): void {
    this.storage.set('user', user);
  };

  getUser(): Promise<any> {
    return this.storage.get('user').then((value) => {
      return value;
    });
  };

  hasLoggedIn(): Promise<boolean> {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    });
  };

  checkHasSeenTutorial(): Promise<string> {
    return this.storage.get(this.HAS_SEEN_TUTORIAL).then((value) => {
      return value;
    });
  };
}
