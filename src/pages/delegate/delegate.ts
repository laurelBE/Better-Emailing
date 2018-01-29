import { Component } from '@angular/core';
import { NavController, NavParams,ViewController,LoadingController,ToastController,Platform} from 'ionic-angular';
import { MyJsonDataProvider } from '../../providers/my-json-data/my-json-data';
import { Http,Headers,RequestOptions } from '@angular/http';
/**
 * Generated class for the DelegatePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-delegate',
  templateUrl: 'delegate.html',
})
export class DelegatePage {

  item;
  toaddress=[];
  redirectStatus : boolean=true;
  foldername;
  noteTodelegate='';
  commentForParticipants='';
toolbar: String ="primary";

  constructor(public platform:Platform,public toast: ToastController,public viewCtrl : ViewController,public myJData : MyJsonDataProvider,public load : LoadingController,public http : Http,public navCtrl: NavController, public navParams: NavParams) {
    
    this.platform.ready().then(() => {            
		   this.platform.registerBackButtonAction(() => {                
         //navigator['app'].exitApp(); 
              this.cancel(); 
              //this.navCtrl.pop();                        
				});        
    }); 
      
        
    
    this.item=this.navParams.get("item");

    this.noteTodelegate="This conversation is being delegated to you.";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DelegatePage');
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
      this.navCtrl.pop();
  }
getfoldername(newItem1: String ): void 
{
  if(newItem1.match('@'))
    {
        console.log('here');
    }
    else
      {
  this.foldername=newItem1;
      }
}
  foldervalue()
{
  //alert('hi');
}



  DelegateAction(Subfolder,DelegateTo,comment,noteToDelegate)
  {

    this.redirectStatus=true;
    this.toaddress=this.item.ToField.split(',');  
    for(let i=0;i<this.toaddress.length;i++)  
      {    
        //this.redirectStatus=true;
        if(DelegateTo.trim()!='' && DelegateTo.trim()!=null)
          {
            if(DelegateTo.includes(this.toaddress[i].trim()))      
              {   
                let toast = this.toast.create({

                message : this.toaddress[i].trim() + ' is already present in conversation',

                    duration : 3000,

                    });

                toast.present();  
                 
                this.redirectStatus=false; 
                break;     
              } 
              else if(DelegateTo.trim().includes(this.item.FromField))      
              {    
                let toast = this.toast.create({

                message : this.item.FromField + ' is already present in conversation',

                    duration : 3000,

                    });

                toast.present(); 
                 
                this.redirectStatus=false; 
                break;     
              }
          }

      }            
        // alert('different')            
        if(this.redirectStatus==true)              
          {
            let loading = this.load.create({

                content : 'Please wait'

            });


        //    RedirectTo=RedirectTo.replace(/;/gi, ',');

            let headers=new Headers({'Content-Type':'application/x-www-form-urlencoded'});
            
           let toEmail=DelegateTo;
           let subject=this.item.Subject;
           let body=this.item.Body;
           let cc=this.item.CCField;
           let attachmentNames=this.item.Attachments;
           let messageHandle=this.item.MessageHandle;
           let handle=this.item.ConversationHandle;

           console.log('to'+toEmail);
            console.log('subject'+subject);
              console.log('to'+toEmail);
            console.log('subject'+subject);
             console.log('comment'+comment);
            console.log('note'+noteToDelegate);
              console.log('delegateto'+DelegateTo);
              
            
            //let params = 'email='+this.myJData.email + '&toemail='+toEmail +'&subject='+ subject + '&body=' + noteToDelegate+ '\n\n' + body  + "&attachments="+ attachmentNames + '&conversationHandle='+ this.myJData.ConversationHandle + '&comment=' + comment + '&note=' +noteToDelegate + '&delegateTo=' +DelegateTo;

            let regExp=/[a-zA-Z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,3}$/;
 
            if((toEmail == "" || toEmail == null) && (DelegateTo == "" || DelegateTo == null))
            {
                let toast = this.toast.create({

                message : "Sender Email is required",

                    duration : 3000,

                    });

                toast.present();
            }
            else if(noteToDelegate == "" || noteToDelegate == null)
            {
                let toast = this.toast.create({

                message : "Note is required",

                    duration : 3000,

                    });

                toast.present();
            }
            else if(!regExp.test(toEmail))
            {
                let toast = this.toast.create({

                  message : "To list must contain valid email addresses.",

                    duration : 3000,

                    });

                  toast.present();
            }
            else
              {
                
                  let b = this.tools_replaceAll(this.item.Body, "<br>", "\n"); 
                  body  ="\n\n\n\n"+"On"+this.item.SentOnDate+" at "+this.item.SentOnTime+", <"+this.item.FromField+"> wrote: \n\n "+b;

                  loading.present();
                  let params = 'email='+this.myJData.email + '&subject='+ 'FW : ' + subject + '&body=' + noteToDelegate+ '\n\n' + body  + "&attachments="+ attachmentNames +'&conversationHandle='+ this.myJData.ConversationHandle + '&comment=' + comment + '&note=' +noteToDelegate + '&delegatedTo=' +DelegateTo + '&messageHandle=' + messageHandle + '&handle=' + handle + '&foldername=' + this.foldername;


                  this.http.post(this.myJData.url+'getDelegatedAction.php',params,{headers:headers})
                  .map(res => res.text(),loading.dismiss())
                  .subscribe(data=> {console.log(data); 
                    //alert(data); console.log(params);
                  
                    this.viewCtrl.dismiss();
                              let toast = this.toast.create({

                              message : data,

                              duration : 3000,

                              });

                    toast.present();
                  
                  });
                  
              }

           //   this.navCtrl.push(ConversationListPage,{categoryList: 'Inbox',folder:'Inbox',icon : 'ios-mail'});
  
  
          }
      }

  tools_replaceAll(str, find, replace) 
  {
    return str.replace(new RegExp(find, 'g'), replace);
  }
}
