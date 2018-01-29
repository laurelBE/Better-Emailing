import { Component } from '@angular/core';
import { NavController, NavParams , ViewController, ModalController,Platform} from 'ionic-angular';
import { MyJsonDataProvider } from '../../providers/my-json-data/my-json-data';
/**
 * Generated class for the ScheduleQuietTimePopupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-schedule-quiet-time-popup',
  templateUrl: 'schedule-quiet-time-popup.html',
})
export class ScheduleQuietTimePopupPage {

  m : any;

  weekDays = '';
  toolbar: String ="primary";

  constructor(public myJData : MyJsonDataProvider, public platform: Platform,public viewCtrl:ViewController,public mod:ModalController, public navCtrl: NavController, public navParams: NavParams) {
  
this.myJData.quietTimeWeekDays='';
        this.platform.ready().then(() => {            
		   this.platform.registerBackButtonAction(() => {                
         //navigator['app'].exitApp(); 
              this.cancel(); 
              //this.navCtrl.pop();                        
				});        
		}); 

    this.m = mod;
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
    console.log('ionViewDidLoad ScheduleQuietTimePopupPage');
  }

  cancel()
  {
    this.navCtrl.pop();
  }

  setWeekDays()
  {
    console.log("weekDays :" + this.myJData.quietTimeWeekDays);
    this.navCtrl.pop();
  }

  setDay(event)
  {
    if(event.target.checked)
      {
        this.myJData.quietTimeWeekDays=this.myJData.quietTimeWeekDays+ event.target.value + ';';
      }
    else
      {
        var myRegExp = new RegExp(event.target.value,'g');
        this.myJData.quietTimeWeekDays=this.myJData.quietTimeWeekDays.replace(myRegExp , "");
        
      }

  }

}
