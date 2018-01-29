import { Component } from '@angular/core';
import { NavController, NavParams, ViewController,LoadingController,ToastController,AlertController,Platform } from 'ionic-angular';
import { MyJsonDataProvider } from '../../providers/my-json-data/my-json-data';
import { Http,Headers,RequestOptions } from '@angular/http';
import { ConversationListPage } from '../conversation-list/conversation-list';
/**
 * Generated class for the CloseConversationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-close-conversation',
  templateUrl: 'close-conversation.html',
})
export class CloseConversationPage {

  toolbar: String ="primary";
item;
  constructor(public platform : Platform, public atrCtrl: AlertController,public toast: ToastController,public load : LoadingController,public http : Http, public myJData : MyJsonDataProvider, public navCtrl: NavController, public navParams: NavParams, public viewCtrl : ViewController) {
 
    this.platform.ready().then(() => {            
		   this.platform.registerBackButtonAction(() => {                
         //navigator['app'].exitApp(); 
              this.cancel(); 
              //this.navCtrl.pop();                        
				});        
		}); 
 
     this.item=this.navParams.get("item");
    
 
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
    console.log('ionViewDidLoad CloseConversationPage');
  }


  CloseAction(comment)
  {
    // this.toaddress=this.item.ToField.split(','); 
            let loading = this.load.create({

                content : 'Please wait'

            });

          
              this.item.ToField=this.item.ToField.replace(/,/gi, ';');
            let headers=new Headers({'Content-Type':'application/x-www-form-urlencoded'});

            loading.present();
            let body = 'email='+this.myJData.email + '&conversationHandle='+ this.myJData.ConversationHandle +'&handle='+this.item.ConversationHandle+ '&comment=' + comment+'&to='+this.item.FromField+';'+this.item.ToField+'&messageHandle='+this.item.MessageHandle+'&subject='+this.myJData.subject;
            //alert(body);
            this.http.post(this.myJData.url+'getCloseAction.php',body,{headers:headers})
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
  cancel()
  {
      this.viewCtrl.dismiss();
  }

}
