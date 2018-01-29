import { Component } from '@angular/core';
import { NavController, NavParams, ViewController,ToastController,LoadingController,Platform } from 'ionic-angular';
import { ScheduleQuietTimePage } from '../schedule-quiet-time/schedule-quiet-time';
import { MyPreferencesPage } from '../my-preferences/my-preferences';
import { FeedbackPage } from '../feedback/feedback';
import { SweepToSidelinePage } from '../sweep-to-sideline/sweep-to-sideline';
import { MyJsonDataProvider } from '../../providers/my-json-data/my-json-data';
import { LoginPage } from '../login/login';
import { Http,Headers,RequestOptions } from '@angular/http';
import { HomePage } from '../home/home';
import { SummaryreportPage } from '../Summaryreport/Summaryreport';
/**
 * Generated class for the ToolsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-tools',
  templateUrl: 'tools.html',
})
export class ToolsPage {

  quietStatusTimeList =[];
  setQuiet=false;
  duration;
  urgent="0";
  follow="0";
  outside="0";
  
  toolbar: String ="primary";
  constructor(public platform: Platform, public load : LoadingController,public toast: ToastController,public myJData : MyJsonDataProvider,public http:Http,public navCtrl: NavController, public viewCtrl : ViewController, public navParams: NavParams) {
  
  this.platform.ready().then(() => {            
		   this.platform.registerBackButtonAction(() => {                
         //navigator['app'].exitApp(); 
              this.cancel(); 
              //this.navCtrl.pop();                        
				});        
		});
  
  this.getPreference();
    //this.get_QuietTimeStatus();
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

          this.get_QuietTimeStatus();
          //alert(this.myJData.quietTimeStatus);
           

}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ToolsPage');
  }


  open()
  {
     console.log("ok");
  }

  cancel()
  {
       const data= {cancel:"true"};
      this.viewCtrl.dismiss(data);
      /* this.navCtrl.push(HomePage)
    .then(() => {
                              // first we find the index of the current view controller:
                              const index = this.viewCtrl.index;
                              // then we remove it from the navigation stack
                              this.navCtrl.remove(index);
                            });; */
  }

  ScheduleQuietTime()
  {
    this.navCtrl.push(ScheduleQuietTimePage);
  }

  MyPref()
  {
      this.navCtrl.push(MyPreferencesPage)
      .then(() => {
                              // first we find the index of the current view controller:
                              const index = this.viewCtrl.index;
                              // then we remove it from the navigation stack
                              this.navCtrl.remove(index);
                            });;
  }

  Feedback()
  {
    this.navCtrl.push(FeedbackPage);
  }

  sweepToSideline()
  {
    this.navCtrl.push(SweepToSidelinePage)
    .then(() => {
                              // first we find the index of the current view controller:
                              const index = this.viewCtrl.index;
                              // then we remove it from the navigation stack
                              this.navCtrl.remove(index);
                            });
  }

  SignOut()
  {
    this.myJData.email="";

    this.myJData.ConversationHandle=0;
    this.myJData.quietTimeStatus=false;
    this.myJData.quietTimeWeekDays='';
    
    //this.navCtrl.pop();
    
    this.navCtrl.push(LoginPage)
    .then(() => {
                              // first we find the index of the current view controller:
                              const index = this.viewCtrl.index;
                              // then we remove it from the navigation stack
                              this.navCtrl.remove(index);
                            });;
  }


/*    get_QuietTimeStatus()
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
                      this.setQuiet=true;
            }
      });
  } */


  Summary()
{
   this.navCtrl.push(SummaryreportPage)
    .then(() => {
                              // first we find the index of the current view controller:
                              const index = this.viewCtrl.index;
                              // then we remove it from the navigation stack
                              this.navCtrl.remove(index);
                            });
}
  quotesAction()
    {
      if(this.myJData.quietTimeStatus==true)
        {
          this.myJData.quietTimeStatus=false;
          this.offQuietMode();
        }
        else{
          this.myJData.quietTimeStatus=true;
          this.onQuietMode();
        }
    }

   offQuietMode() 
   {
     //alert('quiet')
        let headers=new Headers({'Content-Type':'application/x-www-form-urlencoded'});

      let options=new RequestOptions({headers:headers});

 let params = 'email='+this.myJData.email;
       let body = 'email='+this.myJData.email;

    
      this.http.post(this.myJData.url + 'offQuietTime.php',params,{headers:headers})
      .map(res => res.text())
      .subscribe(data => {
     //    this.quietStatusTimeList  =  data;
          let toast = this.toast.create({

                              message : data,

                                duration : 3000,

                                });

                              toast.present();
                            });    
    this.navCtrl.setRoot(HomePage);
   }
   onQuietMode()
  {
          let loading = this.load.create({

                content : 'Please wait'

            });
 //alert(this.urgent);
   //   alert(this.follow);    
            let headers=new Headers({'Content-Type':'application/x-www-form-urlencoded'});

            loading.present();
            let body = 'email='+this.myJData.email+'&duration='+this.duration+'&urgentMessagesAllowed='+this.urgent+'&followingMessagesAllowed='+this.follow+'&outsideDomainMessagesAllowed='+this.outside;
     //  alert(body);
            this.http.post(this.myJData.url+'startQuietMode.php',body,{headers:headers})
            .map(res => res.text(),loading.dismiss())
            .subscribe(data=>{this.cancel();
                              let toast = this.toast.create({

                              message : data,

                                duration : 3000,

                                });

                              toast.present();
                            }); 
                             this.navCtrl.setRoot(HomePage);
   }


    getPreference()
  {
     let loading = this.load.create({

                content : 'Please wait'

            });
     let headers=new Headers({'Content-Type':'application/x-www-form-urlencoded'});

            loading.present();
            let body = 'email='+this.myJData.email;

            this.http.post(this.myJData.url+'getPreference.php',body,{headers:headers})
            .map(res => res.json(),loading.dismiss())
      .subscribe(data => {
         //alert();
         //console.log(data);
        //  this.messagelist  =  data;
        for(let i=0;i<data.length;i++)
          {
           
            if(data[i].PreferenceHandler=="QUIET_MODE_USER_MINUTE")
            {
             
              this.duration=data[i].PreferenceValue;
              
            }
            if(data[i].PreferenceHandler=="QUIET_MODE_USER_TYPE")
            {
         
         if(data[i].PreferenceHandler.indexOf("am") > -1)
          {
               this.follow="1";
          }
              if(data[i].PreferenceHandler.indexOf("Urgent") > -1)
                {
                     this.urgent="1";
                }

                if(data[i].PreferenceHandler.indexOf("Outside") > -1)
                {
                     this.outside="1";
                } 
            }
           
          }

      });
      

  
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
   
}
