import { Component } from '@angular/core';
import { NavController, NavParams, ModalController,Platform } from 'ionic-angular';
import {ChooseFolderPage} from '../choose-folder/choose-folder';
import { FileDialogPage } from '../file-dialog/file-dialog';
import { MyJsonDataProvider } from '../../providers/my-json-data/my-json-data';
/**
 * Generated class for the FilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-file',
  templateUrl: 'file.html',
})
export class FilePage {

  public event = {
    month: '1990-02-19',
    timeStarts: '12:00',
    timeEnds: '1990-02-20'
  }
  toolbar: String ="primary";

  constructor(public myJData : MyJsonDataProvider, public platform:Platform,public navCtrl: NavController, public navParams: NavParams, public md: ModalController) {
  
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
    console.log('ionViewDidLoad FilePage');
  }


  cancel()
  {
    this.navCtrl.pop();
  }

  ChooseFolder()
  {
      let mm = this.md.create(ChooseFolderPage);
      mm.present();
  }

  saveAlert()
  {
    let mm = this.md.create(FileDialogPage);
      mm.present();
  }
}
