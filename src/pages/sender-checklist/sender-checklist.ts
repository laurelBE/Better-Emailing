import { Component } from '@angular/core';
import { NavController, NavParams,ViewController,ToastController,Platform,LoadingController } from 'ionic-angular';
import { Http,Headers,RequestOptions } from '@angular/http';
import { MyJsonDataProvider } from '../../providers/my-json-data/my-json-data';
import { ConversationListPage } from '../conversation-list/conversation-list';
/**
 * Generated class for the SenderChecklistPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-sender-checklist',
  templateUrl: 'sender-checklist.html',
})
export class SenderChecklistPage {

 
   delete = [];
   dis  = [];
 
   close  = [];
    open = [];

    toolbar: String ="primary";

  conversationHandle : Number=0;
  participants : string;

  
  public to : string = "";

  public cc : string = "";

  public bcc : string;

  public body : string;

  public subject : string;

  public handle : string;

  public attachmentNames : string;

  public responseAction : string;

  participantsArr=[];
  UserList = [];
  Important = [];
  Urgent = [];
  Category = [];
  setTo=[];
  setCC=[];
  statuses = [];
  quietModeStatuses = [];

  SetToCC=[];

  constructor(public platform : Platform, public toast: ToastController,public load:LoadingController, public myJData: MyJsonDataProvider, public http : Http,public navCtrl: NavController, public navParams: NavParams,public viewCtrl : ViewController) {
  
  this.platform.ready().then(() => {            
		   this.platform.registerBackButtonAction(() => {                
         //navigator['app'].exitApp(); 
              this.closeModal(); 
              //this.navCtrl.pop();                        
				});        
		});
  
  }

      ionViewWillEnter() {

    this.platform.registerBackButtonAction(() => {                
         //navigator['app'].exitApp(); 
              this.closeModal(); 
              //this.navCtrl.pop();                        
        });
            
        if(this.myJData.quietTimeStatus==true)
          {
             this.toolbar="quietmodecolor";
          }

}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SenderChecklistPage');

    let item = this.navParams.get("item");

    this.conversationHandle = this.myJData.ConversationHandle;
    this.to = item.to;
    this.cc = item.cc;
    this.bcc = item.bcc;
    this.body = item.body;
    this.subject = item.subject;
    this.handle = item.handle;
    this.responseAction=item.responseAction;
    this.attachmentNames=item.attachmentNames;
    if(item.to.trim().lastIndexOf(';') === (item.to.trim().length - 1))
      {
        this.participants=item.to.trim() + item.cc.trim();
      }
    else
      {
        this.participants=item.to.trim()+ ';'  + item.cc.trim();
      }

    console.log(this.conversationHandle);

    console.log('this.participants' + this.participants);


    this.getSenderCheckList();
  }
 

  closeModal()
  {
    this.navCtrl.pop();
  }

  closeM()
  {
   
     this.viewCtrl.dismiss();
  }


  interchage(i, pEmail)
  {

    console.log("pmail : " + pEmail);
    console.log("this.Category[i] : " + this.Category[i]);
    console.log("i : " + i);
      if(this.delete[i] == "ios-trash")
      {
          this.delete[i]= "ios-add";
          this.dis[i] = "true";
          this.close[i] = true;
          this.open[i] = false;

          var myRegExp = new RegExp(pEmail,'g');
          this.to=this.to.replace(myRegExp , "");
          this.cc=this.cc.replace(myRegExp , "");

            this.participantsArr[i]="null";

            //console.log(this.participantsArr);

      }
      else
      {
           this.delete[i] = "ios-trash";
           this.dis[i] = null;
           this.close[i] = false;
           this.open[i] = true;

           this.participantsArr[i]=pEmail;

           if(this.Category[i]=='CC')
            {
              this.cc=this.cc + ";" + pEmail;
            }
            if(this.Category[i]=='To')
            {
              this.to=this.to + ";" + pEmail;
            }
            console.log("this.cc :" + this.cc);
            console.log("this.to :" + this.to);
           console.log(this.participantsArr);
           
      }
  }

    setValueImportant(event,i,pEmail)
    {
     if(event.target.checked)
      {
        this.Important[i]='Important';
      }
      else
        {
          this.Important[i]='null';
        }

      console.log(this.Important);
    }

    setValueCategory(event,i,pEmail)
    {
     if(event.target.checked)
      {
        this.Category[i]=event.target.value;
      }
      //console.log(this.Category);
      
      if(this.Category[i]=='CC')
      {
        var n = this.to.includes(pEmail);
        if(n==true)
        {
          var myRegExp = new RegExp(pEmail,'g');
          this.to=this.to.replace(myRegExp , "");

          //alert("This.to : " + this.to);

          this.cc=this.cc +";"+pEmail;

          //alert("this.cc :" + this.cc);
        }
      }
      if(this.Category[i]=='To')
        {
          var n = this.cc.includes(pEmail);
          if(n==true)
          {
            var myRegExp = new RegExp(pEmail,'g');
            this.cc=this.cc.replace(myRegExp , "");
            this.to=this.to +";"+pEmail;
          }
        }

     console.log("this.cc : " + this.cc);
     console.log("this.to : " + this.to);
    }

    setValueUrgent(event,i,pEmail)
    {
     if(event.target.checked)
      {
        this.Urgent[i]='Urgent';
      }
    else
      {
        this.Urgent[i]='null';
      }
      console.log(this.Urgent);
    }

  getSenderCheckList()
  {
      let loading = this.load.create({

                content : 'Please wait'

            });

      //   alert(this.participants); 
         
var splitted = this.participants.split(";"); 
let news='';
for(let i=0;i<splitted.length;i++)
  {
    if(splitted[i]=="")
      {
      }
      else
        {
          news=news+splitted[i]+";";
        }
  }

//alert(splitted);
   // alert(news);
        while(news.charAt(news.length-1)==";")
      {
        news=news.substring(0, news.length - 1);
      } 
      
    let headers=new Headers({'Content-Type':'application/x-www-form-urlencoded'});
    loading.present();
    let options=new RequestOptions({headers:headers});

    let body = 'ConversationHandle=' + this.conversationHandle+'&userEmail='+this.myJData.email + '&participants='+news;

    //alert("body : " + body);

    this.http.post(this.myJData.url + 'senderchecklistnew.php',body,{headers:headers})
    .map(res => res.json())
    .subscribe(data=>{ 
      console.log(data);
      loading.dismiss();
      this.UserList = data;
      for(let i=0;i< this.UserList.length;i++)
        {

          this.delete[i] = "ios-trash";
           this.Category[i] = "null";
           this.Urgent[i] = "null";
           this.Important[i] = "null";
           this.dis[i] = null;
           this.close[i] = false;
           this.open[i] = true;
           this.participantsArr[i]=this.UserList[i].UserEmail;
           this.statuses[i]=this.UserList[i].Status; 
           this.quietModeStatuses[i]=this.UserList[i].QuietTimeStatus;

           if(this.to.includes(this.UserList[i].UserEmail))
            {
              this.setTo[i]=true;
              this.Category[i] ="To";
            }
            else
            {
              this.setTo[i]=false;
            }
            if(this.cc.includes(this.UserList[i].UserEmail))
            {
              this.setCC[i]=true;
              this.Category[i] ="CC";
            }
            else
            {
              this.setCC[i]=false;
            }
           
        }
    });
  }

    sendEmail()
  {

    for(let i=0; i< this.UserList.length;i++)
    {
      if(this.participantsArr[i]=="null")
        {
          this.Category[i] = "null";
           this.Urgent[i] = "null";
           this.Important[i] = "null";
        }

        console.log("this.participantsArr : " + this.participantsArr);
        console.log("this.Importanttt : " + this.Important);
        console.log("this.Urgenttt : " +this.Urgent);
        console.log("this.Categoryyy : " + this.Category)

    }
      //if(this.UserList.length==0)
      //  {
        
        //}
//alert(this.participantsArr[0]);
if(this.participantsArr[0]=="null")
  {
    let toast = this.toast.create({

                              message : 'Atleast one participant is required to send the email',

                              duration : 3000,

                          });

                          toast.present();
    
  }
  else
    {
        let category =this.Category.join(";");
        let important =this.Important.join(";");
        let urgent =this.Urgent.join(";");
        let participants =this.participantsArr.join(";");

        console.log("participants : " + participants);
        console.log("Important : " + important);
        console.log("Urgent : " + urgent );
        console.log("Category : " + category);

    let headers = new Headers({
			'Content-Type': 'application/x-www-form-urlencoded'
		});
		let options = new RequestOptions({
			headers: headers
		});
//		alert(this.attachmentNames);
        let params = 'fromemail='+this.myJData.email +'&toemail='+this.to+'&subject='+this.subject+'&body='+this.body+'&cc='+this.cc+'&bcc='+this.bcc+'&responseAction='+this.responseAction
       +'&conversationHandle='+this.conversationHandle+'&handle='+this.handle + "&attachments="+ this.attachmentNames + "&category=" + category + '&important=' + important + '&urgent=' + urgent + '&participants=' +participants;
     console.log(params);
       this.http.post(this.myJData.url+"SenderChecklistSendEmail.php",params,{headers:headers})
      .map(res=> res.text())
      .subscribe(data=>{let toast = this.toast.create({

                              message : data,

                              duration : 3000,

                          });

                          toast.present();
                  }); 

    
      //this.navCtrl.pop();

      this.navCtrl.push(ConversationListPage,{categoryList: 'Inbox',folder:'Inbox',icon : 'ios-mail'})
      .then(() => {
                              // first we find the index of the current view controller:
                              const index = this.viewCtrl.index;
                              // then we remove it from the navigation stack
                              this.navCtrl.remove(index);
                            });;


    }

    }
}
