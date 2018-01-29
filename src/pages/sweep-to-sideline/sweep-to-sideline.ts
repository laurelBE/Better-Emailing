import { Component } from '@angular/core';
import { NavController, NavParams,Platform } from 'ionic-angular';
import { MyJsonDataProvider } from '../../providers/my-json-data/my-json-data';
/**
 * Generated class for the SweepToSidelinePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-sweep-to-sideline',
  templateUrl: 'sweep-to-sideline.html',
})
export class SweepToSidelinePage {

  toolbar: String ="primary";

  constructor(public myJData : MyJsonDataProvider,public platform : Platform, public navCtrl: NavController, public navParams: NavParams) {
 
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
    console.log('ionViewDidLoad SweepToSidelinePage');
  }

  cancel()
  {
    this.navCtrl.pop();
  }

}
