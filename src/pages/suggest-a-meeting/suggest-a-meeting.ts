import { Component } from '@angular/core';
import { NavController, NavParams,Platform } from 'ionic-angular';
import { MyJsonDataProvider } from '../../providers/my-json-data/my-json-data';
/**
 * Generated class for the SuggestAMeetingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-suggest-a-meeting',
  templateUrl: 'suggest-a-meeting.html',
})
export class SuggestAMeetingPage {

  isChecked = false;
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
    console.log('ionViewDidLoad SuggestAMeetingPage');
  }

   cancel()
  {
      this.navCtrl.pop();
  }

  

selectAll(){
   this.isChecked = !this.isChecked;
}


}
