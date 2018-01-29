import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController,Platform, ModalController,ToastController,ViewController} from 'ionic-angular';
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
import moment from 'moment';
import * as momentTz from 'moment-timezone';

/**
 * Generated class for the HighPriorityPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-high-priority',
  templateUrl: 'high-priority.html',
})
export class HighPriorityPage {

  messageList = [];
  iconArray =  [];
categoryList : String;
  quietStatusTimeList;
  DateTimeArr=[];

  toolbar: String ="primary";

  constructor(public viewCtrl : ViewController, public platform:Platform,  public mod: ModalController, public load : LoadingController, public myJData : MyJsonDataProvider,public http:Http ,public navCtrl: NavController, public navParams: NavParams,public toast:ToastController) 
  {
    this.platform.ready().then(() => {            
		   this.platform.registerBackButtonAction(() => {                
         //navigator['app'].exitApp(); 
              this.cancel(); 
              //this.navCtrl.pop();                        
				});        
    }); 
    
    
// this.categoryList = navParams.get('categoryList'); 
    this.get_MessageList();
   

    /* if(this.myJData.retreiveMails == true)
      {
     */
        
        
         console.log("value changed.");
      
     /*  }
      else
        {
          console.log("don't call me");
         
        }
   */
  }

      ionViewWillEnter() {

    this.platform.registerBackButtonAction(() => {                
         //navigator['app'].exitApp(); 
              this.cancel(); 
              //this.navCtrl.pop();                        
        });
            
        /*  if(this.myJData.quietTimeStatus==true)
          {
             this.toolbar="quietmodecolor";
          } */

          this.get_QuietTimeStatus();
          //alert(this.myJData.quietTimeStatus);
           this.readExternalEmailBox();

}

 ionViewDidEnter()
  {
	  //alert(this.myJData.quietTimeStatus);
  }

  ionViewDidLoad() {
    //alert(this.myJData.quietTimeStatus);
    console.log('ionViewDidLoad HighPriorityPage');
  }

newevent()
	{
         this.navCtrl.push(NewEventPage);
        
	}

	compose()
	{
        let m = this.mod.create(ComposePage);

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
    
    
      this.navCtrl.push(ReadRequestedPage);  
  }

  searchPage()
  {
   this.navCtrl.push(SearchPage);
  }

  get_QuietTimeStatus()
  {

   // alert("okk");

   
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
                    else
                      {
             this.myJData.quietTimeStatus=false;    
                      }   
      });
  }

  cancel()
  {
    this.navCtrl.push(HomePage)
    .then(() => {
                              // first we find the index of the current view controller:
                              const index = this.viewCtrl.index;
                              // then we remove it from the navigation stack
                              this.navCtrl.remove(index);
                            });;
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

      
              let body = 'email='+this.myJData.email;

              console.log(body);

              this.http.post(this.myJData.url+'getAllHighPriorityMessages.php',body,{headers:headers})
              .map(res => res.json() )
              .subscribe(data=> {
              this.messageList = data;
              loading.dismiss();
                if(this.messageList.length==0)
                  {
                     let toast = this.toast.create({

          message : "No mails in High Priority",

          duration : 3000,

      });

      toast.present();
                  }
              for(let i=0; i<this.messageList.length;i++)
                {
                  

                    let tempCategory; 
                    let category;
                    let lastItem;

                    if(this.messageList[i].CategoryLists !=undefined)
                    {
                      tempCategory=this.messageList[i].CategoryLists.split(',');                   
                    category = tempCategory.filter(function(elem, index, self) {
                        return index == self.indexOf(elem);
                        });


                    for(let i=0;i<category.length;i++)
                    {
                      if(category[i].trim().replace(/['"]+/g, ''))
                        {
                          
                          lastItem = category[i].trim().replace(/['"]+/g, '');
                          
                         
                        }
                    }
                    
                    //console.log("lastItem : " +lastItem);
                    
                    if(lastItem.toLowerCase().trim()=="urgent")
                      {
                        
                        this.iconArray[i]='megaphone';
                      }
                    else if(lastItem.toLowerCase().trim()=="important")
                      {
                        
                        this.iconArray[i]='information-circle';
                      }
                    else if(lastItem.toLowerCase().trim()=="action requested")
                      {
                        
                        this.iconArray[i]='create';
                        this.categoryList='Action Requested';
                      }
                    else if(lastItem.toLowerCase().trim()=="please read")
                      {
                        
                        this.iconArray[i]='eye';
                      }
                    else if(lastItem.toLowerCase().trim()=="following")
                      {
                        
                        this.iconArray[i]='heart';
                      } 
                }

                let startDate=new Date().toISOString();
                let startDate1=moment(startDate).format("YYYY-MM-DD");
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
                      else if(parseInt(strDateArr[0])<=7 && strDateArr[1]=='days')
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
              });
  
  }


  getMessageList1(Subject,MessageHandle, ConversationHandle)
  {
    this.myJData.subject=Subject;
    this.myJData.ConversationHandle=ConversationHandle;
    this.navCtrl.push(MaildetailPage,{Subject : Subject, MessageHandle: MessageHandle,ConversationHandle : ConversationHandle,categoryList:this.categoryList});
      
  }


  readExternalEmailBox()
  {

    let headers=new Headers({'Content-Type':'application/x-www-form-urlencoded'});

    console.log("Im called");
    console.log(this.myJData.email);

    let body = 'email='+this.myJData.email;

    this.http.post(this.myJData.url + 'TempReadEmails.php',body,{headers:headers})
      .map(res => res.json())
      .subscribe(data=>console.log(data));

  }

}