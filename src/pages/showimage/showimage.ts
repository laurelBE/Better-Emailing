import { Component } from '@angular/core';
import { NavController, NavParams,PopoverController,ViewController,Platform} from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { MyJsonDataProvider } from '../../providers/my-json-data/my-json-data';
/**
 * Generated class for the ShowimagePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-showimage',
  templateUrl: 'showimage.html',
})
export class ShowimagePage {

  toolbar: String ="primary";

  public imgsrc:String= "assets/icon/favicon.ico";
  constructor(public myJData: MyJsonDataProvider, public platform : Platform , public navCtrl: NavController, public navParams: NavParams,public viewc:ViewController,private transfer: FileTransfer, private file: File) {
    
    this.platform.ready().then(() => {            
		   this.platform.registerBackButtonAction(() => {                
         //navigator['app'].exitApp(); 
              this.cancel(); 
              //this.navCtrl.pop();                        
				});        
		});
    
    this.imgsrc=navParams.get('val');
    //alert(this.imgsrc);
    // console.log(this.showimg);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowimagePagesss');
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

  cancel()
  {
    this.viewc.dismiss();
  }
  download()
  {
     const fileTransfer: FileTransferObject = this.transfer.create();
    const url = this.imgsrc+"";
    fileTransfer.download(url, this.file.externalRootDirectory + this.imgsrc).then((entry) => {
      alert('download complete: ' + entry.toURL());
    }, (error) => {

      alert('Error : ' + JSON.stringify(error));
      // handle error
    });
  }
}
