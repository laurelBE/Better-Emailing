import { Component } from '@angular/core';
import { NavController, NavParams, ViewController,LoadingController,ToastController,AlertController,Platform } from 'ionic-angular';
import { MyJsonDataProvider } from '../../providers/my-json-data/my-json-data';
import { Http,Headers,RequestOptions } from '@angular/http';
import { ConversationListPage } from '../conversation-list/conversation-list';
/**
 * Generated class for the FollowPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-follow',
  templateUrl: 'follow.html',
})
export class FollowPage {

  toolbar: String ="primary";
  item;
  comment="";

  constructor(public platform : Platform, public atrCtrl: AlertController,public toast: ToastController,public load : LoadingController,public http : Http, public myJData : MyJsonDataProvider, public navCtrl: NavController, public navParams: NavParams, public viewCtrl : ViewController) {
  
    this.platform.ready().then(() => {            
		   this.platform.registerBackButtonAction(() => {                
         //navigator['app'].exitApp(); 
              this.cancel(); 
              //this.navCtrl.pop();                        
				});        
		}); 
  
     this.item=this.navParams.get("item");
     console.log(this.item);
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
    console.log('ionViewDidLoad FollowPage');
  }

    cancel()
  {
      this.viewCtrl.dismiss();
  }


   FollowAction(comment)
  {
            let loading = this.load.create({

                content : 'Please wait'

            });

        //  alert(comment);

            let headers=new Headers({'Content-Type':'application/x-www-form-urlencoded'});

            loading.present();
            let body = 'email='+this.myJData.email + '&conversationHandle='+ this.myJData.ConversationHandle + '&comment=' + comment+ '&messageHandle='+this.item.MessageHandle;

            this.http.post(this.myJData.url+'getFollowAction.php',body,{headers:headers})
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
}
