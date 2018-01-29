import { Component, Renderer } from '@angular/core';
import { NavController, NavParams, ViewController,ModalController,LoadingController,Platform,PopoverController,ToastController } from 'ionic-angular';
import { Http,Headers,RequestOptions } from '@angular/http';
import { MyJsonDataProvider } from '../../providers/my-json-data/my-json-data';
import { FollowPage } from '../follow/follow';
import { SidelinePage } from '../sideline/sideline';
import { WithdrawPage } from '../withdraw/withdraw';
import { CloseConversationPage } from '../close-conversation/close-conversation';
import { DelegatePage } from '../delegate/delegate';
import { RedirectPage } from '../redirect/redirect';
import { SuggestAMeetingPage } from '../suggest-a-meeting/suggest-a-meeting';
import { FilePage } from '../file/file';
import { MaildetailPage } from '../maildetail/maildetail';
import { AddparticipantPage } from '../addparticipant/addparticipant';
import { ReopenPage } from '../reopen/reopen';
import { ConversationListPage } from '../conversation-list/conversation-list';
/**
 * Generated class for the ConversationActionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-conversation-action',
  templateUrl: 'conversation-action.html',
})
export class ConversationActionPage {

  dataList = [];

  toolbar: String ="primary";
  CloseValue="Close Conversation";
  sidelineChecked : boolean =false;
  withdrawChecked: boolean =false;
  followaction1: boolean =false;
  delegateactionchecked:boolean =false;
  item;
 sideline;follow;close;meeting;withdraw;
  constructor(public popoverCtrl:PopoverController,public toast: ToastController,public platform:Platform, public load : LoadingController, public myJData : MyJsonDataProvider,public http:Http ,public navCtrl: NavController, public renderer: Renderer, public navParams: NavParams, public viewCtrl : ViewController,public mod: ModalController) {
   // this.renderer.setElementClass(viewCtrl.pageRef().nativeElement, 'sample-modal-page', true);
 
 this.platform.ready().then(() => {            
		   this.platform.registerBackButtonAction(() => {                
         //navigator['app'].exitApp(); 
              this.cancel(); 
              //this.navCtrl.pop();                        
				});        
    }); 
      
        
   this.item=this.navParams.get("item");
   this.getConversationStatus();
   this.getPreference();
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
    console.log('ionViewDidLoad ConversationActionPage');
  }

  opensideline()
  {
   let loading = this.load.create({

                content : 'Please wait'

            });

          

            let headers=new Headers({'Content-Type':'application/x-www-form-urlencoded'});

            loading.present();
            let body = 'email='+this.myJData.email + '&conversationHandle='+ this.myJData.ConversationHandle + '&comment=' + this.sideline;

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
openwithdraw()
{
  
}
  cancel()
  {
      const data= {cancel:"true"};
      this.viewCtrl.dismiss(data);

     // this.navCtrl.setRoot(MaildetailPage);  
  }

  followaction()
  {
    /* this.viewCtrl.dismiss();
    let m = this.mod.create(FollowPage);

    m.present(); */
    if(this.CloseValue=="Reopen Conversation"){
         alert('Conversation is closed');
         this.viewCtrl.dismiss();
}
        else
    {
    this.viewCtrl.dismiss();
      let popup = this.popoverCtrl.create(FollowPage,{item:this.item});
    popup.present();
  //  this.navCtrl.push(FollowPage,{item:this.item});
    }
  }

  sidelineaction()
  {

/*     this.sidelineChecked=!this.sidelineChecked
    if(this.sidelineChecked)
      {
        this.viewCtrl.dismiss();
        let m = this.mod.create(SidelinePage);
		    m.present();
      } */
if(this.CloseValue=="Reopen Conversation"){
         alert('Conversation is closed');
         this.viewCtrl.dismiss();
}
        else
    {
      this.viewCtrl.dismiss();
      let popup = this.popoverCtrl.create(SidelinePage);
    popup.present();
    }
  }
  withdrawaction()
  {
    /* this.viewCtrl.dismiss();
    let m = this.mod.create(WithdrawPage);
    m.present(); */
    if(this.CloseValue=="Reopen Conversation"){
         alert('Conversation is closed');
         this.viewCtrl.dismiss();
}
        else
    {
    this.viewCtrl.dismiss();
    let popup = this.popoverCtrl.create(WithdrawPage);
    popup.present();
    }
  }

  closeaction()
  {
    
  if(this.CloseValue=="Reopen Conversation")
    {
       this.viewCtrl.dismiss();
       let popup = this.popoverCtrl.create(ReopenPage,{item:this.item});
       popup.present();

    
    }
  else{
     this.viewCtrl.dismiss();
     //this.navCtrl.push(CloseConversationPage,{item:this.item});
     let popup = this.popoverCtrl.create(CloseConversationPage,{item:this.item});
       popup.present();
  } 
  
  }

  delegateaction()
  {
    if(this.CloseValue=="Reopen Conversation"){
         alert('Conversation is closed');
         this.viewCtrl.dismiss();
}
        else
    {
    this.viewCtrl.dismiss();
    this.navCtrl.push(DelegatePage,{item:this.item});
    }
  }

  redirectaction()
  {
    if(this.CloseValue=="Reopen Conversation"){
         alert('Conversation is closed');
           this.viewCtrl.dismiss();
}
        else
    {
    this.viewCtrl.dismiss();
    this.navCtrl.push(RedirectPage,{item:this.item});
    }
  }

    suggestAMeetingaction()
  {
    if(this.CloseValue=="Reopen Conversation"){
         alert('Conversation is closed');
           this.viewCtrl.dismiss();
}
        else
    {
    this.viewCtrl.dismiss();
    this.navCtrl.push(SuggestAMeetingPage);
    }
  }

  FileConversation()
  {
    if(this.CloseValue=="Reopen Conversation"){
         alert('Conversation is closed');
           this.viewCtrl.dismiss();
}
        else
    {
    this.viewCtrl.dismiss();
    this.navCtrl.push(FilePage);
    }
  }

  addParticipant()
  {
        if(this.CloseValue=="Reopen Conversation"){
         alert('Conversation is closed');
           this.viewCtrl.dismiss();
}
        else
    {
 this.viewCtrl.dismiss();
    this.navCtrl.push(AddparticipantPage,{item:this.item});
    }
  }
  
  getConversationStatus()
  {
    let loading = this.load.create({

          content : 'Please wait'

      });

      loading.present();

      let headers=new Headers({'Content-Type':'application/x-www-form-urlencoded'});
      let body = 'ConversationHandle=' + this.myJData.ConversationHandle + '&email=' + this.myJData.email;
      this.http.post(this.myJData.url+'getConversationStatus.php',body,{headers:headers})
      .map(res => res.json())
      .subscribe(data=> {
      this.dataList=data;

      console.log(data);
     // alert(data);
      loading.dismiss();
      for(let i=0; i<this.dataList.length;i++)
        {
         // alert(this.dataList[i].FolderName)
          if(this.dataList[i].FolderName=='!Low Priority\\Closed')
              {
                  this.CloseValue="Reopen Conversation";
              }
            if(this.dataList[i].FolderName=='Inbox\\DelegateFollowing')
              {
                  this.delegateactionchecked=true;
              }
                if(this.dataList[i].FolderName=='Inbox\\Following')
              {
                  this.followaction1=true;
              }
            if(this.dataList[i].FolderName=='!Low Priority\\Sideline')
              { 
              // console.log("Sideline");
                this.sidelineChecked=true;
              }
             if(this.dataList[i].FolderName=='!Low Priority\\Withdraw')
              {
                  this.withdrawChecked=true;
              } 
        }
      });
  }



   getPreference()
  {
     let loading = this.load.create({

                content : 'Please wait'

            });
//alert('ok');
          

            let headers=new Headers({'Content-Type':'application/x-www-form-urlencoded'});

            loading.present();
            let body = 'email='+this.myJData.email;

            this.http.post(this.myJData.url+'getPreference.php',body,{headers:headers})
            .map(res => res.json(),loading.dismiss())
      .subscribe(data => {
         //alert();
        //  this.messagelist  =  data;
        for(let i=0;i<data.length;i++)
          {
             //day1="";day2="";day3="";day4="";filing="";intcont="";extcont="";

          //  alert(data[i].PreferenceHandler);
            if(data[i].PreferenceHandler=="DEFAULT_COMMENT_FOR_SIDELINE")
            {
              this.sideline=data[i].PreferenceValue;
            }
            if(data[i].PreferenceHandler=="DEFAULT_COMMENT_FOR_FOLLOW")
            {
              this.follow=data[i].PreferenceValue;
            }
            if(data[i].PreferenceHandler=="DEFAULT_COMMENT_FOR_CLOSE")
            {
              this.close=data[i].PreferenceValue;
            }
            if(data[i].PreferenceHandler=="DEFAULT_COMMENT_FOR_WITHDRAW")
            {
              this.withdraw=data[i].PreferenceValue;
            }
            if(data[i].PreferenceHandler=="DEFAULT_COMMENT_FOR_MEETING")
            {
              this.meeting=data[i].PreferenceValue;
            }
        
          }

      });
  
  }
}
