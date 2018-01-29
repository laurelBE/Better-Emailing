import { Component } from '@angular/core';
import { NavController, NavParams, ViewController,Platform } from 'ionic-angular';
import { MyJsonDataProvider } from '../../providers/my-json-data/my-json-data';
/**
 * Generated class for the NewEventAlertPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-new-event-alert',
  templateUrl: 'new-event-alert.html',
})
export class NewEventAlertPage {

  toolbar: String ="primary";

  constructor(public myJData:MyJsonDataProvider, public platform: Platform,public navCtrl: NavController, public navParams: NavParams, public viewCtrl:ViewController) {
  
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
    console.log('ionViewDidLoad NewEventAlertPage');
  }

  cancel()
  {
      this.viewCtrl.dismiss();
  }


}
