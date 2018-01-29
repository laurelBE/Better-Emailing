import { Component } from '@angular/core';
import { NavController, NavParams,Platform,LoadingController,ViewController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { MyJsonDataProvider } from '../../providers/my-json-data/my-json-data';
import { Http,Headers,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the SummaryreportPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-summaryreport',
  templateUrl: 'summaryreport.html',
})
export class SummaryreportPage {

  messageList = [];
  toolbar: String ="primary";
  constructor(public load : LoadingController,public myJData : MyJsonDataProvider,public platform : Platform,public http: Http,public viewCtrl : ViewController) {
    console.log('Hello SummaryProvider Provider');
    this.getLocalData();
  }
ionViewWillEnter() {

    this.platform.registerBackButtonAction(() => {                
         //navigator['app'].exitApp(); 
              this.cancel(); 
              //this.navCtrl.pop();                        
        });
            
     

}
         cancel()
  {
      this.viewCtrl.dismiss();
  }
  getLocalData() {
   
      let loading = this.load.create({

                content : 'Please wait'

            });

          

            let headers=new Headers({'Content-Type':'application/x-www-form-urlencoded'});

            loading.present();
            let body = 'email='+this.myJData.email;

            this.http.post(this.myJData.url+'getSummaryReport.php',body,{headers:headers})
            .map(res => res.json(),loading.dismiss())
      .subscribe(data => {
         
          this.messageList  =  data;
      });
  
    }


}
