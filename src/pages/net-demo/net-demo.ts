
import { Component } from '@angular/core';
import { NavController, NavParams,ToastController } from 'ionic-angular';
import { MyJsonDataProvider } from '../../providers/my-json-data/my-json-data';

/**
 * Generated class for the NetDemoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-net-demo',
  templateUrl: 'net-demo.html',
})
export class NetDemoPage {

  public Name : string;
 
dataList = [];

  constructor(public toast : ToastController,public navCtrl: NavController, public navParams: NavParams, public myJData: MyJsonDataProvider) {
  
   
    //this.myJData.getFolderListCountInbox().subscribe(data => console.log(data));
  


  }


  

 

}
