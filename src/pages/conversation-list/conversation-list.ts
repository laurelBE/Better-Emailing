import { Component } from '@angular/core';
import { NavController, NavParams,ModalController,LoadingController,Platform,ViewController,ToastController} from 'ionic-angular';
import { NewEventPage } from '../new-event/new-event';
import { ComposePage } from '../compose/compose';
import { ReadRequestedPage } from '../read-requested/read-requested';
import { MyJsonDataProvider } from '../../providers/my-json-data/my-json-data';
import { SearchPage } from '../search/search';
import { HomePage } from '../home/home';
import { PleaseReadDetailsPage } from '../please-read-details/please-read-details';
import { CalendarPage } from '../calendar/calendar';
import { Http,Headers,RequestOptions } from '@angular/http';
import { MaildetailPage } from '../maildetail/maildetail';
import { MeetingRequestPage } from '../meeting-request/meeting-request';
import moment from 'moment';
import * as momentTz from 'moment-timezone';

/**
 * Generated class for the UrgentPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */



@Component({
  selector: 'page-conversation-list',
  templateUrl: 'conversation-list.html',
})
export class ConversationListPage {


  toolbar: String ="primary";
   url : string;

  messageList = [];

  categoryList : String;
  folder : String;
  icon : String;

  iconArr =[];

  quietStatusTimeList;

  status : boolean = false;

  DateTimeArr=[];

  constructor(public toast:ToastController, public viewCtrl : ViewController, public platform:Platform, public load : LoadingController, public myJData : MyJsonDataProvider,public http:Http , public mod: ModalController,public navCtrl: NavController, public navParams: NavParams) {
 

    /* this.platform.ready().then(() => {            
		   this.platform.registerBackButtonAction(() => {                
			   navigator['app'].HomePage;                            
				});        
    }); */
      
 if(this.myJData.quietTimeStatus==true)
          {
             this.toolbar="quietmodecolor";
          }
        
        
		   this.platform.registerBackButtonAction(() => {                
         //navigator['app'].exitApp(); 
              this.cancel(); 
              //this.navCtrl.pop();                        
				});        
	

      this.categoryList = navParams.get('categoryList'); 
      this.folder = navParams.get('folder'); 
      this.icon = navParams.get('icon');


      this.url = this.myJData.url;


      console.log("category : " + this.categoryList);
      console.log("folder  : " + this.folder );
      
      

/*        let TIME_IN_MS = 25000;
          let hideFooterTimeout = setTimeout( () => {
              this.Refresh();
          }, TIME_IN_MS); */
            this.get_MessageList();

          


 
  }

  get_QuietTimeStatus()
  {

    
      let headers=new Headers({'Content-Type':'application/x-www-form-urlencoded'});

      let options=new RequestOptions({headers:headers});

 let params = 'email='+this.myJData.email;
       let body = 'email='+this.myJData.email;

    
      this.http.post(this.myJData.url + 'getQuietTimeStatus.php',params,{headers:headers})
      .map(res => res.json())
      .subscribe(data => {
         this.quietStatusTimeList  =  data;
         // alert(this.quietStatusTimeList[0].Status);
          if(this.quietStatusTimeList[0].Status=="on")
            {
                      this.myJData.quietTimeStatus=true;
                      this.toolbar="quietmodecolor";
            }
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

          this.readExternalEmailBox();
			  this.get_QuietTimeStatus();

}

  ionViewDidLoad() {

     this.platform.registerBackButtonAction(() => {                
         //navigator['app'].exitApp(); 
              this.cancel(); 
              //this.navCtrl.pop();                        
				});
    console.log('ionViewDidLoad ConversationListPage');
  }

Refresh()
  {

    this.readExternalEmailBox();
    //this.navCtrl.setRoot(this.navCtrl.getActive().component);

    this.navCtrl.push(ConversationListPage,{categoryList: "Inbox",folder:"Inbox",icon :"ios-mail"})
    .then(() => {
                              // first we find the index of the current view controller:
                              const index = this.viewCtrl.index;
                              // then we remove it from the navigation stack
                              this.navCtrl.remove(index);
                            });;
    console.log("Refresh here");}

 readExternalEmailBox()
  {

    let headers=new Headers({'Content-Type':'application/x-www-form-urlencoded'});

    console.log("Im called");
    console.log(this.myJData.email);

    let body = 'email='+this.myJData.email;

    this.http.post(this.myJData.url + 'TempReadEmails.php',body,{headers:headers})
      .map(res => res.json())
      .subscribe(data=>{console.log(data);
      });

  }

  newevent()
	{
         this.navCtrl.push(NewEventPage)
         
	}

	compose()
	{
        let m = this.mod.create(ComposePage)
        

		m.present();
  }
  
  folderlist()
  {
    this.navCtrl.push(HomePage)
    .then(() => {
                              // first we find the index of the current view controller:
                              const index = this.viewCtrl.index;
                              // then we remove it from the navigation stack
                              this.navCtrl.remove(index);
                            });;
  }

  readRequested()
  {
    
    
    this.navCtrl.push(ReadRequestedPage,{
      categoryList : this.categoryList,
      folder : this.folder,
      icon:this.icon
      }
    );
  }

  searchPage()
  {
   this.navCtrl.push(SearchPage);
  }

  cancel()
  {
    this.navCtrl.push(HomePage)
    .then(() => {
                              // first we find the index of the current view controller:
                              const index = this.viewCtrl.index;
                              // then we remove it from the navigation stack
                              this.navCtrl.remove(index);
                            });
  }

  getDetails(item : string)
  {
    this.navCtrl.push(PleaseReadDetailsPage,{item : item});
  }

  	calc(){
    this.navCtrl.push(CalendarPage);
  }
  

   get_MessageList()
  {

       let loading = this.load.create({

          content : 'Please wait'

      });

      loading.present();


      let headers=new Headers({'Content-Type':'application/x-www-form-urlencoded'});

      let flag :boolean =false;
      let f: String="";
      let c : String="";

      if(this.categoryList=="Sideline")
        {
          flag=true;
          f="!Low Priority\\Sideline";
        }
      else if(this.categoryList=="Withdraw")
        {
          flag=true;
          f="!Low Priority\\Withdraw";
        }
      else if(this.categoryList=="Redirect")
        {    
          flag=true; 
          f="!Low Priority\\Redirect";
        }
      else if(this.categoryList=="Cc")
        {    
          flag=true; 
          f="!Low Priority\\cc";
        }
      else if(this.categoryList=="Close")
        {    
          flag=true; 
          f="!Low Priority\\Closed";
        }
      else if(this.categoryList=="Following")
        {    
          flag=true; 
          c=this.categoryList;
          f=this.folder;
        }
      else if( this.categoryList=="Urgent" ||  this.categoryList=="Important" ||  this.categoryList=="Action Requested" ||  this.categoryList=="Please Read" )
        {
          flag=false; 
          c=this.categoryList;
          f=this.folder;
        }
      else if(this.categoryList=="Tiny Tasks")
        {
          flag=false; 
          f="!Do List\\Tiny Tasks";
        }
       else if(this.categoryList=="Done")
        {
          flag=false; 
          f="!Do List\\Done";
        }
       else if(this.categoryList=="Schedule")
         {
           flag=false;
           f="!Do List\\Scheduled";
         }
       else if(this.categoryList=="Sent")
         {
           flag=false;
           f="Standard Folders\\Sent";
         }
       else if(this.categoryList=="Outbox")
        {
          flag=false;
          f="Standard Folders\\OutBox";
        }
       else if(this.categoryList=="Trash")
          {
            flag=false;
            f="Standard Folders\\Trash";
          }
        else if(this.categoryList=="Draft")
          {
            flag=false;
            f="Standard Folders\\Draft";
          }
        else if(this.categoryList=="Spam")
          {
            flag=false;
            f="Standard Folders\\Junk";
          }
        else if(this.categoryList=="Inbox")
          {
            flag=true;
            f=this.folder;
            this.status = true;
          }
         if(this.folder=="delegate")
          {
            flag=true;
            f="!Delegated\\"+ this.categoryList;
          }

          if(flag==false)
            {
              let body = 'email='+this.myJData.email + '&folder=' + f + '&categoryList=' + c;

              

              this.http.post(this.url+'getConversationList.php',body,{headers:headers})
              .map(res => res.json() )
              .subscribe(data=> {
                console.log("In Conv list");
                console.log(data);
              this.messageList = data;
              if(this.messageList.length==0)
                  {
                     let toast = this.toast.create({

                    message : "No mails in " + this.categoryList,

                    duration : 3000,

                });

                toast.present();
                  }
              for(let i=0; i<data.length; i++)
              {
                if(data[i].Attachments.indexOf('.ics')>0)
                {
                  this.iconArr[i]='ios-calculator-outline';
                }
                else
                  {
                    this.iconArr[i]=this.icon;
                  }

                  let date1=new Date(data[i].SentOnDate1);

                     let dateDiff=moment(date1, "YYYYMMDD").fromNow();

                     //alert(dateDiff);

                     //alert(moment(data[i].SentOnDate1).format("YYYY/MM/DD"))

                     let strDateArr=dateDiff.split(" ");

                     if(parseInt(strDateArr[0])<24 && strDateArr[1]=='hours')
                      {
                        this.DateTimeArr[i]=data[i].SentOnTime;
                      }
                      else if(strDateArr[0]=='a' && strDateArr[1]=='day')
                      {
                        this.DateTimeArr[i]="yesterday";
                      }
                      else if(parseInt(strDateArr[0])<7 && strDateArr[1]=='days')
                      {
                        let dateArr=data[i].SentOnDate.split("/");
                        this.DateTimeArr[i]=dateArr[1];
                        //alert(dateArr[1]);
                      }
                      else
                        {
                        this.DateTimeArr[i]=moment(data[i].SentOnDate1).format("YYYY/MM/DD");
                        }
              }
              loading.dismiss();
              },
      onerror=>{ alert('server error please try after some time')
          loading.dismiss();
           this.navCtrl.pop();
       });
            }
          else if(flag==true)
            {
              let body = 'email='+this.myJData.email + '&folder=' + f + '&categoryList=' + c;
            this.http.post(this.url+'getConversationListInbox.php',body,{headers:headers})
            .map(res => res.json())
            .subscribe(data=> {
              console.log("In Conv list");
              console.log(data);
            this.messageList = data;
            if(this.messageList.length==0)
                  {
                        let toast = this.toast.create({

                        message : "No mails in " + this.categoryList,

                        duration : 3000,

                        });

                    toast.present();
                  }

                let startDate=new Date().toISOString();
                let startDate1=moment(startDate).format("YYYY-MM-DD");
                
                //alert(startDate);
               // alert(startDate1);

            for(let i=0; i<data.length; i++)
              {
                
                if(data[i].Attachments.indexOf('.ics')>0)
                {
                  data[i].AttachmentCount=data[i].AttachmentCount -1;
                  this.iconArr[i]='ios-calculator-outline';
                }
                else
                  {
                    this.iconArr[i]=this.icon;
                  }


                  

                      let date1=new Date(data[i].SentOnDate1);

                     let dateDiff=moment(date1, "YYYYMMDD").fromNow();

                     //alert(dateDiff);

                     //alert(moment(data[i].SentOnDate1).format("YYYY/MM/DD"))

                     let strDateArr=dateDiff.split(" ");

                     if(parseInt(strDateArr[0])<24 && strDateArr[1]=='hours')
                      {
                        this.DateTimeArr[i]=data[i].SentOnTime;
                      }
                      else if(strDateArr[0]=='a' && strDateArr[1]=='day')
                      {
                        this.DateTimeArr[i]="yesterday";
                      }
                      else if(parseInt(strDateArr[0])<7 && strDateArr[1]=='days')
                      {
                        let dateArr=data[i].SentOnDate.split("/");
                        this.DateTimeArr[i]=dateArr[1];
                        //alert(dateArr[1]);
                      }
                      else
                        {
                        this.DateTimeArr[i]=moment(data[i].SentOnDate1).format("YYYY/MM/DD");
                        }
              }
            loading.dismiss();
            },
      onerror=>{ alert('server error please try after some time')
          loading.dismiss();
           this.navCtrl.pop();
       });
            }
        
      
  }


  getMessageList1(Subject,MessageHandle, ConversationHandle,Attachments,item)
  {
    if(Attachments.indexOf('.ics')>0)
      {
        this.navCtrl.push(MeetingRequestPage,{item : item});
      }
      else
        {
            this.myJData.subject=Subject;
            console.log("Subject : " + Subject);
            console.log("MessageHandle : " + MessageHandle);
            console.log("ConversationHandle : " + ConversationHandle);
            this.myJData.ConversationHandle=ConversationHandle;
            this.navCtrl.push(MaildetailPage,{Subject : Subject, MessageHandle: MessageHandle,ConversationHandle : ConversationHandle,categoryList:this.categoryList});     
        }

  }

  

}
