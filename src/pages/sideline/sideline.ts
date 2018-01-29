import { Component } from '@angular/core';
import { NavController, NavParams, ViewController,LoadingController,ToastController,AlertController,Platform } from 'ionic-angular';
import { MyJsonDataProvider } from '../../providers/my-json-data/my-json-data';
import { Http,Headers,RequestOptions } from '@angular/http';
import { HomePage } from '../home/home';
import { ConversationListPage } from '../conversation-list/conversation-list';
/**
 * Generated class for the SidelinePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-sideline',
  templateUrl: 'sideline.html',
})
export class SidelinePage {
  overlayHidden: boolean = false;
  comment :String ='';
  toolbar: String ="primary";
  constructor(public platform : Platform, public atrCtrl: AlertController,public toast: ToastController,public load : LoadingController,public http : Http, public myJData : MyJsonDataProvider, public navCtrl: NavController, public navParams: NavParams, public viewCtrl : ViewController) {
 //  this.overlayHidden = true;
    //this.delete();

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
    console.log('ionViewDidLoad SidelinePage');
    
  }

  

  cancel()
  {
      this.viewCtrl.dismiss();
  }

  public hideOverlay() {
    this.overlayHidden = true;
}

  SidelineAction(comment)
  {
            let loading = this.load.create({

                content : 'Please wait'

            });

          

            let headers=new Headers({'Content-Type':'application/x-www-form-urlencoded'});

            loading.present();
            let body = 'email='+this.myJData.email + '&conversationHandle='+ this.myJData.ConversationHandle + '&comment=' + comment;

            this.http.post(this.myJData.url+'getSidelineAction.php',body,{headers:headers})
            .map(res => res.text(),loading.dismiss())
            .subscribe(data=>{this.viewCtrl.dismiss();
                              let toast = this.toast.create({

                              message : data,

                                duration : 3000,

                                });

                              toast.present();
                            });
            
           this.navCtrl.push(ConversationListPage,{categoryList: 'Inbox',folder:'Inbox',icon : 'ios-mail'});
  }


  delete()
    {
      let prompt = this.atrCtrl.create({
        title: 'Delete Popup',
        message: "Are You Sure Want To Delete this Mail.???",
      
        buttons: [
          {
            text: 'Yes',
            handler: data => {
              console.log('Yes clicked');
              let toast = this.toast.create({
                message: 'Mail Deleted...',
                duration: 3000
              });
              toast.present();
            }
          },
          {
            text: 'No',
          }
        ]
      });
      prompt.present();
    }


}
