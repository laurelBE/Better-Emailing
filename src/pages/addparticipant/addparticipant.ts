import { Component } from '@angular/core';
import { NavController, NavParams,ViewController,LoadingController,ToastController,Platform} from 'ionic-angular';
import { MyJsonDataProvider } from '../../providers/my-json-data/my-json-data';
import { Http,Headers,RequestOptions } from '@angular/http';
import { HomePage } from '../home/home';
import { ConversationListPage } from '../conversation-list/conversation-list';

/**
 * Generated class for the AddparticipantPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-addparticipant',
  templateUrl: 'addparticipant.html',
})
export class AddparticipantPage {

  toolbar: String ="primary";
 toaddress=[];
  redirectStatus : boolean=true;
  item;
  noteToRedirect='';
  Addparticipant='';
  
  commentForParticipants='';

  constructor(public platform : Platform, public toast: ToastController,public load : LoadingController,public http : Http, public myJData : MyJsonDataProvider,public navCtrl: NavController, public navParams: NavParams, public viewCtrl : ViewController) {
  
    this.platform.ready().then(() => {            
		   this.platform.registerBackButtonAction(() => {                
         //navigator['app'].exitApp(); 
              this.cancel(); 
              //this.navCtrl.pop();                        
				});        
		});
    
    this.item=this.navParams.get("item");

    this.noteToRedirect=""
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddparticipantPage');
  }

 cancel()
  {
      this.navCtrl.pop();
  }

   addParticipantAction(RedirectTo,comment,noteToRedirect)
  {
   // RedirectTo=RedirectTo.replace(/,/gi, ';');
    
    this.redirectStatus=true;
    this.toaddress=this.item.ToField.split(','); 
    ///alert(this.item.FromField); 
    //alert(this.item.ToField);
     for(let i=0;i<this.toaddress.length;i++)  
      {    
        //this.redirectStatus=true;
        if(RedirectTo!='')
          {
            if( RedirectTo.includes(this.toaddress[i].trim()))      
              {  
                  let toast = this.toast.create({

                message : this.toaddress[i].trim() + ' is already present in conversation',

                    duration : 3000,

                    });

                toast.present(); 
                    
                this.redirectStatus=false; 
                break;     
              }
              else if(RedirectTo.includes(this.item.FromField))      
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


            RedirectTo=RedirectTo.replace(/;/gi, ',');

            let headers=new Headers({'Content-Type':'application/x-www-form-urlencoded'});
            
           let toEmail=RedirectTo;
           let subject=this.item.Subject;
           let body=this.item.Body;
           let cc=this.item.CCField;
           let attachmentNames=this.item.Attachments;
           let messageHandle=this.item.MessageHandle;
           let handle=this.item.ConversationHandle;

           

          toEmail=toEmail.replace(/,/gi, ';');

        let emails = toEmail.split(';');


        let invalidEmails = [];
        let invalidEmails1 = [];
        let invalidEmails2 = [];

        for (let i = 0; i < emails.length; i++) { 
            if(!this.validateEmail(emails[i].trim()) && emails[i].trim()!='') {
            invalidEmails.push(emails[i].trim())
            }
        }
            if((toEmail == "" || toEmail == null) && (RedirectTo== "" || RedirectTo == null))
            {
                let toast = this.toast.create({

                message : "Sender Email is required",

                    duration : 3000,

                    });

                toast.present();
            }
            else if(noteToRedirect == "" || noteToRedirect == null)
            {
                let toast = this.toast.create({

                message : "Note is required",

                    duration : 3000,

                    });

                toast.present();
            }
            else if(invalidEmails.length!=0)
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
          // alert(toEmail);
             loading.present();
            let params = 'email='+this.myJData.email + '&addedTo='+toEmail +'&subject='+ 'FW : ' + subject + '&body=' + noteToRedirect+ '\n\n' + body  + "&attachments="+ attachmentNames +'&conversationHandle='+ this.myJData.ConversationHandle + '&comment=' + comment + '&note=' +noteToRedirect + '&redirectTo=' +RedirectTo + '&messageHandle=' + messageHandle + '&handle=' + handle;

            this.http.post(this.myJData.url+'additionalParticipants.php',params,{headers:headers})
            .map(res => res.text(),loading.dismiss())
            .subscribe(data=> {console.log(data);
              //alert(data); 
              console.log(params);
              this.viewCtrl.dismiss();
                         let toast = this.toast.create({

                        message : data,

                        duration : 3000,

                        });

              toast.present();}); 
            
              this.navCtrl.push(ConversationListPage,{categoryList: 'Inbox',folder:'Inbox',icon : 'ios-mail'});
              }
        } 
          }
tools_replaceAll(str, find, replace) 
  {
      return str.replace(new RegExp(find, 'g'), replace);
  }


      validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
    }
}
