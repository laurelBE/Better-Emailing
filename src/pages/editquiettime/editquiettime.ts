import { Component } from '@angular/core';
import { NavController, NavParams, ModalController,ViewController,LoadingController,ToastController,Platform } from 'ionic-angular';
import { QuietimeListPage } from '../quietime-list/quietime-list';
import { MyJsonDataProvider } from '../../providers/my-json-data/my-json-data';
import { Http,Headers,RequestOptions } from '@angular/http';
/**
 * Generated class for the EditquiettimePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-editquiettime',
  templateUrl: 'editquiettime.html',
})
export class EditquiettimePage {
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
  priorityList=[];
  recurrance=0;
  setUrgents=false;
  followingStatus=false;
  outgoingStatus=false;
  id;
  toolbar: String ="primary";
  constructor(public platform:Platform,public navCtrl: NavController,public viewCtrl : ViewController,public myJData : MyJsonDataProvider, public http : Http, public navParams: NavParams,public load : LoadingController,public toast: ToastController) {
  //   this.startDate=new Date().toISOString();
  

  this.platform.ready().then(() => {            
		   this.platform.registerBackButtonAction(() => {                
         //navigator['app'].exitApp(); 
              this.cancel(); 
              //this.navCtrl.pop();                        
				});        
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

}

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditquiettimePage');

     let item = this.navParams.get("item");
    this.priorityList=item.Allow.trim().split(',');
    //alert(item.StartDate1);
   //  this.startDate=item.StartDate;
     this.id=item.Id;
    //  this.endDate=item.EndDate;
   this.startDate=new Date(item.StartDate1).toISOString();
   this.endDate=new Date(item.EndDate1).toISOString();
   //alert(item.StartDate1+" "+item.EndDate1);
    //  if(item.QuietModeType)
   for(let i=0;i<this.priorityList.length;i++)
  {
    alert(this.priorityList[i]);
    if(this.priorityList[i].trim()=="Urgent")
      {
    //    alert('its urgent')
        this.setUrgents=true;
   
      }
       if(this.priorityList[i].trim()=="Following")
      {
        this.followingStatus=true;
     
      }  
    
  }


  if(item.QuietModeType=="0"||item.QuietModeType=="5")
    {
          this.TextColor="#2f74aa";
    this.DailyColor="#000000";
    this.WeeklyColor="#000000"
     this.recurrance=0;
    }
    else if(item.QuietModeType=="1")
      {
 this.WeeklyColor="#000000";
    this.TextColor="#000000";
    this.DailyColor="#2f74aa"
    this.recurrance=1;
      }
      else{
 this.WeeklyColor="#2f74aa";
    this.TextColor="#000000";
     this.DailyColor="#000000"
    this.recurrance=2;
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
        if(this.allDayStatus==true)
          {
            this.allDayStatus=false;
          }
          else
            {
               this.allDayStatus=true;
            }

           if(this.allDayStatus==true)
            {
               this.DailyColor="#000000";
    this.TextColor="#000000";
            }

    }
  SelectDaily()
  {
    this.WeeklyColor="#000000";
    this.TextColor="#000000";
    this.DailyColor="#2f74aa"
    this.recurrance=1;
  }
  SelectOne()
  {
    this.TextColor="#2f74aa";
    this.DailyColor="#000000";
    this.WeeklyColor="#000000"
     this.recurrance=0;
  }
     SelectWeekly()
  {
    this.WeeklyColor="#2f74aa";
    this.TextColor="#000000";
     this.DailyColor="#000000"
    this.recurrance=2;
  }
  quietTimeList()
  {
    this.navCtrl.push(QuietimeListPage)
    .then(() => {
                              // first we find the index of the current view controller:
                              const index = this.viewCtrl.index;
                              // then we remove it from the navigation stack
                              this.navCtrl.remove(index);
                            });;
  }

  ScheduleQuietTimePopUp()
  {
      /* let m=this.mod.create(ScheduleQuietTimePopupPage);
      m.present(); */
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
            let body = 'email='+this.myJData.email+'&startUTC='+this.startDate+'&endUTC='+this.endDate+'&urgentMessagesAllowed='+this.urgent+'&followingMessagesAllowed='+this.following+'&outsideDomainMessagesAllowed='+this.outside+'&recurrance='+this.recurrance+'&id='+this.id;
      //  let body = 'email='+this.myJData.email+'&duration=10'+'&urgentMessagesAllowed='+this.urgent+'&followingMessagesAllowed='+this.following+'&outsideDomainMessagesAllowed='+this.outside; 
      // alert(body);
         //  alert(this.myJData.url+'sheduleQuietMode.php');
            this.http.post(this.myJData.url+'editQuietMode.php',body,{headers:headers})
            .map(res => res.text(),loading.dismiss())
            .subscribe(data=>{this.viewCtrl.dismiss();
             // alert(data);
                              let toast = this.toast.create({

                              message : data,

                                duration : 3000,

                                });

                              toast.present();
 
                           }); 
                          
    }
    }
}
