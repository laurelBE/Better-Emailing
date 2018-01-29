import { Component } from '@angular/core';
import {  NavController, NavParams,ViewController,Platform } from 'ionic-angular';
import { MyJsonDataProvider } from '../../providers/my-json-data/my-json-data';

/**
 * Generated class for the MenuMailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-menu-mail',
  templateUrl: 'menu-mail.html',
})
export class MenuMailPage {
  public statuslistarr = [];

  toolbar: String ="primary";
  

  constructor(public platform:Platform,public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,public MyJData:MyJsonDataProvider) {
    
   this.platform.ready().then(() => {            
		   this.platform.registerBackButtonAction(() => {                
         //navigator['app'].exitApp(); 
              this.cancel(); 
              //this.navCtrl.pop();                        
				});        
		}); 
    
    this.MyJData.getMailName().subscribe(data => this.statuslistarr = data);
  }

      ionViewWillEnter() {

    this.platform.registerBackButtonAction(() => {                
         //navigator['app'].exitApp(); 
              this.cancel(); 
              //this.navCtrl.pop();                        
        });
            
        if(this.MyJData.quietTimeStatus==true)
          {
             this.toolbar="quietmodecolor";
          }

}

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuMailPage');
  }

   cancel()
  {
    this.viewCtrl.dismiss();
  }

  ok(){
    this.viewCtrl.dismiss();
  }
}
