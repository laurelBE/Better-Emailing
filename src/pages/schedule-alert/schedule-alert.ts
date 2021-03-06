import { Component } from '@angular/core';
import { NavController, NavParams, ViewController,Platform } from 'ionic-angular';
import { MyJsonDataProvider } from '../../providers/my-json-data/my-json-data';
/**
 * Generated class for the ScheduleAlertPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-schedule-alert',
  templateUrl: 'schedule-alert.html',
})
export class ScheduleAlertPage {

  toolbar: String ="primary";

  constructor(public myJData : MyJsonDataProvider, public platform : Platform, public viewCtrl : ViewController, public navCtrl: NavController, public navParams: NavParams) {
  
    this.platform.ready().then(() => {            
		   this.platform.registerBackButtonAction(() => {                
         //navigator['app'].exitApp(); 
              this.cancel(); 
              //this.navCtrl.pop();                        
				});        
		});
  
  }

      ionViewWillEnter() {

    this.platform.registerBackButtonAction(() => {                
         //navigator['app'].exitApp(); 
              this.cancel(); 
              //this.navCtrl.pop();                        
        });
            
        if(this.myJData.quietTimeStatus==true)
          {
             this.toolbar="quietmodecolor";
          }


}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScheduleAlertPage');
  }


  cancel()
  {
    this.viewCtrl.dismiss();
  }

}
