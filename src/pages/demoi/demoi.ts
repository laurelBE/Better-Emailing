import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http,Headers,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the DemoiPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-demoi',
  templateUrl: 'demoi.html',
})
export class DemoiPage {

  messageList;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http : Http) {
    this.getData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DemoiPage');
  }

  getData()
  {
   

            let headers=new Headers({'Content-Type':'application/x-www-form-urlencoded'});

        //    loading.present();
         //   let body = 'email='+this.myJData.email;
alert('hello');
            this.http.get("assets/data/MailData.json",{headers:headers})
            .map(res => res.json())
      .subscribe(data => {
         alert(data);
          this.messageList  =  data;
      });
  }

 
}
