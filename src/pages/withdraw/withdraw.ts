import { Component } from '@angular/core';
import { NavController, NavParams, ViewController,LoadingController,ToastController,Platform} from 'ionic-angular';
import { MyJsonDataProvider } from '../../providers/my-json-data/my-json-data';
import { Http,Headers,RequestOptions } from '@angular/http';
import { ConversationListPage } from '../conversation-list/conversation-list';
/**
 * Generated class for the WithdrawPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-withdraw',
  templateUrl: 'withdraw.html',
})
export class WithdrawPage {

  toolbar: String ="primary";

  comment='';

  constructor(public platform : Platform, public toast: ToastController,public load : LoadingController,public http : Http, public myJData : MyJsonDataProvider,public navCtrl: NavController, public navParams: NavParams, public viewCtrl : ViewController) {
  
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
    console.log('ionViewDidLoad WithdrawPage');
  }

  cancel()
  {
      this.viewCtrl.dismiss();
  }

  WithdrawAction(comment)
  {
            let loading = this.load.create({

                content : 'Please wait'

            });

          

            let headers=new Headers({'Content-Type':'application/x-www-form-urlencoded'});

            loading.present();
            let body = 'email='+this.myJData.email + '&conversationHandle='+ this.myJData.ConversationHandle + '&comment=' + comment;

            this.http.post(this.myJData.url+'getWithdrawAction.php',body,{headers:headers})
            .map(res => res.text(),loading.dismiss())
            .subscribe(data=>{
                                this.viewCtrl.dismiss();
                                let toast = this.toast.create({

                                  message : data,

                                  duration : 3000,

                                  });

                                  toast.present();
                                });
            
           this.navCtrl.push(ConversationListPage,{categoryList: 'Inbox',folder:'Inbox',icon : 'ios-mail'})
           .then(() => {
                              // first we find the index of the current view controller:
                              const index = this.viewCtrl.index;
                              // then we remove it from the navigation stack
                              this.navCtrl.remove(index);
                            });;
  }
}
