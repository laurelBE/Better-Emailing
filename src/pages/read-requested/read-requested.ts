import { Component } from '@angular/core';
import { NavController, NavParams, ModalController,LoadingController,ToastController,ViewController,Platform } from 'ionic-angular';
import { MyJsonDataProvider } from '../../providers/my-json-data/my-json-data';
import { ComposePage } from '../compose/compose';
import { ConversationActionPage } from '../conversation-action/conversation-action';
import { NewEventPage } from '../new-event/new-event';
import { PleaseReadPage } from '../please-read/please-read';
import { Http,Headers,RequestOptions } from '@angular/http';
import { ConversationListPage } from '../conversation-list/conversation-list';
/**
 * Generated class for the ReadRequestedPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-read-requested',
  templateUrl: 'read-requested.html',
})
export class ReadRequestedPage {

  public messageList = [];

  categoryList : String;
  folder : String;
   icon : String;

   setConvId =[];
   ConvIdList='';

  url : string;

  toolbar: String ="primary";

  constructor(public platform: Platform, public viewCtrl : ViewController, public toast : ToastController, public myJData : MyJsonDataProvider, public load : LoadingController,public http:Http,public mod: ModalController, public MyJData : MyJsonDataProvider,public navCtrl: NavController, public navParams: NavParams) {
    
   this.platform.ready().then(() => {            
		   this.platform.registerBackButtonAction(() => {                
         //navigator['app'].exitApp(); 
              //this.cancel(); 
              this.navCtrl.pop();                        
				});        
		});
   
   
    this.categoryList = navParams.get('categoryList'); 
      this.folder = navParams.get('folder');
       this.icon = navParams.get('icon');

      console.log("folder : " +this.folder);
      console.log("category list : " + this.categoryList);
      
      this.url = this.myJData.url;

      //alert("okk");
    
    this.get_MessageList();
  }

      ionViewWillEnter() {

    this.platform.registerBackButtonAction(() => {                
         //navigator['app'].exitApp(); 
              //this.cancel(); 
              this.navCtrl.pop();                        
        });
            
        if(this.myJData.quietTimeStatus==true)
          {
             this.toolbar="quietmodecolor";
          }

}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReadRequestedPage');

    
  }

    deleteAction(item) 
  {     
     let loading = this.load.create
    ({                
      content : 'Please wait'            
    });            
    let headers=new Headers({'Content-Type':'application/x-www-form-urlencoded'});
    loading.present();            
    let body = 'email='+this.MyJData.email + '&conversationIds='+ this.ConvIdList;            
    this.http.post(this.MyJData.url+'moveConversationToTrash.php',body,{headers:headers})            
    .map(res => res.text(),loading.dismiss())            
    .subscribe(data=> {          
                if(data.indexOf("Conversation Deleted")>0)   
                  {
                    let toast = this.toast.create({

                        message : "Conversations are moved to Trash",

                        duration : 3000,

                        });
                  }  
            
                  });            
                  this.viewCtrl.dismiss();  
                           
      } 

  getConvId(checked,convId,i)
  {
    this.setConvId[i]=!checked;
    if(this.setConvId[i]==true)
      {
        this.ConvIdList= this.ConvIdList + convId + ',';
      }
    else
      {
        var n = this.ConvIdList.includes(convId);
          if(n==true)
          {
            var myRegExp = new RegExp(convId,'g');
            this.ConvIdList=this.ConvIdList.replace(myRegExp , "");
            
          }
      }
      //alert(this.ConvIdList);
  }

    compose()
  {
    let m = this.mod.create(ComposePage);

      m.present();
  }

    convAction()
  {
    let m = this.mod.create(ConversationActionPage);

      m.present();
  }

    newEvent()
  {
    let m = this.mod.create(NewEventPage);

      m.present();
  }

  pleaseRead()
  {
    let m = this.mod.create(PleaseReadPage);

      m.present();
  }


  get_MessageList()
  {

       let loading = this.load.create({

          content : 'Please wait'

      });

      loading.present();


      let headers=new Headers({'Content-Type':'application/x-www-form-urlencoded'});

      
      if(this.categoryList=="Inbox")
        {
          
          let body = 'email='+this.myJData.email + '&folder=' + this.folder + '&categoryList=' ;
            this.http.post(this.url+'getConversationListInbox.php',body,{headers:headers})
            .map(res => res.json())
            .subscribe(data=> {
            this.messageList = data;
            for(let i=0;i<this.messageList.length;i++)
              {
                this.setConvId[i]=false;
              }
            loading.dismiss();
            });
        }
        else
          {

            let c : String="";
            let f : String="";

           
            if( this.categoryList=="Urgent" ||  this.categoryList=="Important" ||  this.categoryList=="Following" ||  this.categoryList=="Action Requested" ||  this.categoryList=="Please Read" )
              {

                c=this.categoryList;
              }
            if(this.folder=="Tiny Tasks")
              {
                
                f="!Do List\\Tiny Tasks";
              }
              else if(this.folder=="Done")
              {
                
                f="!Do List\\Done";
              }
              else if(this.folder=="Schedule")
              {
                
                f="!Do List\\Scheduled";
              }
              
              else if(this.folder=="Sideline")
              {
                
                f="!Low Priority\\Sideline";
              }
              else if(this.folder=="Withdraw")
              {
                
                f="!Low Priority\\Withdraw";
              }
              else if(this.folder=="Redirect")
              {
                
                f="!Low Priority\\Redirect";
              }
              else if(this.folder=="Close")
              {
                
                f="!Low Priority\\Closed";
              }
              else if(this.folder=="Sent")
              {
                
                f="Standard Folders\\Sent";
              }
              else if(this.folder=="Outbox")
              {
                
                f="Standard Folders\\OutBox";
              }
              else if(this.folder=="Trash")
              {
                
                f="Standard Folders\\Trash";
              }
              else if(this.folder=="Draft")
              {
                
                f="Standard Folders\\Draft";
              }
              else if(this.folder=="Spam")
              {
                
                f="Standard Folders\\Junk";
              }
              else if(this.folder=="delegate")
              {
                
                f="!Delegated\\"+ this.categoryList;
              }
              else
                {
                  f=this.folder;
                }
              

            let body = 'email='+this.myJData.email + '&folder=' + f + '&categoryList=' + c;

            console.log(body);

            this.http.post(this.url+'getConversationList.php',body,{headers:headers})
            .map(res => res.json() )
            .subscribe(data=> {
            this.messageList = data;
            loading.dismiss();
            });
          }
      
  }

  openConversationList()
	{
    this.navCtrl.push(ConversationListPage,{categoryList:this.categoryList,folder:this.folder,icon :this.icon})
    .then(() => {
                              // first we find the index of the current view controller:
                              const index = this.viewCtrl.index;
                              // then we remove it from the navigation stack
                              this.navCtrl.remove(index);
                            });;
	}

}
