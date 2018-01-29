import { Component } from '@angular/core';
import { NavController, NavParams, ModalController,ViewController,LoadingController,ToastController,PopoverController,Platform } from 'ionic-angular';
import { QuietimeListPage } from '../quietime-list/quietime-list';
import { ScheduleQuietTimePopupPage } from '../schedule-quiet-time-popup/schedule-quiet-time-popup';
import { MyJsonDataProvider } from '../../providers/my-json-data/my-json-data';
import { Http,Headers,RequestOptions } from '@angular/http';
import {HomePage} from '../home/home';
import moment from 'moment';
/**
 * Generated class for the ScheduleQuietTimePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-schedule-quiet-time',
  templateUrl: 'schedule-quiet-time.html',
})
export class ScheduleQuietTimePage {
 urgent=0;
 following=0;
 outside=0;
 startDate;
 endDateString;
 allDayStatus : boolean=false;
 endDate;
  TextColor : String ="#000000";
  DailyColor : String="#000000";
  WeeklyColor : String="#000000";
  startdatetime=[];
  recurrance=0;
  setDateTime=true;
  toolbar: String ="primary";
  minEventEndTime;
  minEventStartTime;
  constructor(public platform: Platform, public popoverCtrl : PopoverController, public mod:ModalController, public myJData : MyJsonDataProvider, public http : Http,public navCtrl: NavController, public navParams: NavParams,public viewCtrl : ViewController,public load : LoadingController,public toast: ToastController) {
    // alert(this.startDate);
    let localDate: Date = new Date();
    console.log(localDate);
        let tzOffset: number = new Date().getTimezoneOffset() * 60 * 1000;
        let newTime: number = localDate.getTime() + tzOffset;
        let utcDate: Date = new Date(newTime);

        console.log(utcDate);
   this.startDate=new Date().toISOString();
  // this.endDate=new Date().toISOString;
   this.endDate=new Date().toISOString();

   this.startDate=moment(this.startDate).format("YYYY-MM-DDTHH:mm:ssZ");
this.endDate=moment(this.endDate).format("YYYY-MM-DDTHH:mm:ssZ");
 this.minEventEndTime=this.startDate;
  this.minEventStartTime=this.endDate;
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScheduleQuietTimePage');
   
 
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
  setUrgent(event)
  {
    if(event.target.checked)
      {
 this.urgent=1;
      }
  }
     setFollowing(event)
  {
    if(event.target.checked)
      {
          this.following=1;
      }
  }
     setOutside(event)
  {
    if(event.target.checked)
      {
          this.outside=1;
      }
  }
    allDayAction()
    {
        if(this.allDayStatus==false)
          {
            this.allDayStatus=true;
          }
          else
            {
               this.allDayStatus=false;
            }

           if(this.allDayStatus==true)
            {
               this.DailyColor="#A9A9A9";
    this.TextColor="#A9A9A9";
     this.WeeklyColor="#A9A9A9";
            }

    }
  SelectDaily()
  {
    this.WeeklyColor="#A9A9A9";
    this.TextColor="#A9A9A9";
    this.DailyColor="#2f74aa"
    this.recurrance=1;
    this.allDayStatus=false;
    this.setDateTime=false;
  }
  SelectOne()
  {
    this.TextColor="#2f74aa";
    this.DailyColor="#A9A9A9";
    this.WeeklyColor="#A9A9A9"
     this.recurrance=0;
     this.allDayStatus=false;
      this.setDateTime=true;
  }
     SelectWeekly()
  {
    this.WeeklyColor="#2f74aa";
    this.TextColor="#A9A9A9";
     this.DailyColor="#A9A9A9"
    this.recurrance=2;
    this.allDayStatus=false;
     this.setDateTime=false;
  }
  quietTimeList()
  {
    this.navCtrl.push(QuietimeListPage);
  }

  ScheduleQuietTimePopUp()
  {
      /* let m=this.mod.create(ScheduleQuietTimePopupPage);
      m.present(); */
      this.SelectWeekly();
      let popup = this.popoverCtrl.create(ScheduleQuietTimePopupPage);
    popup.present();
  }
    showAlert( newItem: Date ): void 
    {
     this.startDate=newItem;
    }
     showAlert1( newItem1: Date ): void 
    {
    this.endDate=newItem1;
    }
    scheduleQuietTime()
    {
       if(this.allDayStatus==true)
        {
             

        } 
      if(this.startDate>this.endDate)
        {
          let toast = this.toast.create({

                              message : 'Please enter valid date',

                              duration : 3000,

                          });

                          toast.present();
          
        }
        else{

 let loading = this.load.create({

                content : 'Please wait'

            });

          
            let headers=new Headers({'Content-Type':'application/x-www-form-urlencoded'});

            loading.present();

            this.startDate=new Date(this.startDate).toISOString();
            this.endDate=new Date(this.endDate).toISOString();
            
            let body = 'email='+this.myJData.email+'&startUTC='+this.startDate+'&endUTC='+this.endDate+'&urgentMessagesAllowed='+this.urgent+'&followingMessagesAllowed='+this.following+'&outsideDomainMessagesAllowed='+this.outside+'&recurrance='+this.recurrance + '&weekDays=' + this.myJData.quietTimeWeekDays;
      //  let body = 'email='+this.myJData.email+'&duration=10'+'&urgentMessagesAllowed='+this.urgent+'&followingMessagesAllowed='+this.following+'&outsideDomainMessagesAllowed='+this.outside; 
      // alert(body);
         //  alert(this.myJData.url+'sheduleQuietMode.php');
         console.log(body);
            this.http.post(this.myJData.url+'quietShedule.php',body,{headers:headers})
            .map(res => res.text(),loading.dismiss())
            .subscribe(data=>{this.viewCtrl.dismiss();
              //alert(data);
                              let toast = this.toast.create({

                              message : data,

                                duration : 3000,

                                });

                              toast.present();
 
                           }); 
                         this.navCtrl.setRoot(HomePage);  
    }
    }

    

}
