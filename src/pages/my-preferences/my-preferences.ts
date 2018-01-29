import { Component } from '@angular/core';
import { NavController, NavParams ,LoadingController ,ToastController,ViewController,Platform} from 'ionic-angular';
import { MyJsonDataProvider } from '../../providers/my-json-data/my-json-data';
import {HomePage} from '../home/home';
import { Http,Headers,RequestOptions } from '@angular/http';
/**
 * Generated class for the MyPreferencesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-my-preferences',
  templateUrl: 'my-preferences.html',
})
export class MyPreferencesPage {

  public event = {

    timeStarts: '12:00'
    
  }
toolbar: String ="primary";
duration;
urgent=0;
 following=0;
 outside=0;
 duration30="false";
  duration60="false";
  duration90="false";
  duration120="false";
  urgentch=false;
  followch=false;
  outsidech=false;
 messagelist;
 quietmodetype;
 sideline="";follow="";withdraw="";close="";meeting="";day1="";day2="";day3="";day4="";filing="";intcont="";extcont="";
  constructor(public myJData : MyJsonDataProvider,public toast: ToastController, public platform : Platform,public http : Http,public viewCtrl : ViewController,public load : LoadingController, public navCtrl: NavController, public navParams: NavParams) {
  
  this.platform.ready().then(() => {            
		   this.platform.registerBackButtonAction(() => {                
         //navigator['app'].exitApp(); 
              this.cancel(); 
              //this.navCtrl.pop();                        
				});        
    });
      this.getPreference();
 // sideline="',follow=,withdraw,close,meeting,day1,day2,day3,day4,filing,intcont,extcont
  }
setduration(event)
{
   this.duration=event.target.value;

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
    console.log('ionViewDidLoad MyPreferencesPage');
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
  setPreference(sideline,follow,withdraw,close,meeting,day1,day2,day3,day4,filing,intcont,extcont)
  {
    
      let loading = this.load.create({

                content : 'Please wait'

            });

          
            let headers=new Headers({'Content-Type':'application/x-www-form-urlencoded'});

            loading.present();

         //   let startDate=new Date().toISOString();
          //  startDate=moment(startDate).format("YYYY-MM-DDTHH:mm:ssZ");
          //  startDate=new Date(startDate).toISOString();

            let body = 'email='+this.myJData.email+'&duration='+this.duration+'&urgentMessagesAllowed='+this.urgent+'&followingMessagesAllowed='+this.following+'&outsideDomainMessagesAllowed='+this.outside+'&sidelinecomment='+sideline+'&followcomment='+follow+'&withdrawcomment='+withdraw+'&closecomment='+close+'&meetingcomment='+meeting+'&inbox='+day1+'&notread='+day2+'&lowpriority='+day3+'&doneclosed='+day4+'&filing='+filing+'&internal='+intcont+'&external='+extcont;
console.log(body);
             this.http.post(this.myJData.url+'setPreference.php',body,{headers:headers})
            .map(res => res.text(),loading.dismiss())
            .subscribe(data=>{this.viewCtrl.dismiss();

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
//alert('ok');
          

            let headers=new Headers({'Content-Type':'application/x-www-form-urlencoded'});

            loading.present();
            let body = 'email='+this.myJData.email;

            this.http.post(this.myJData.url+'getPreference.php',body,{headers:headers})
            .map(res => res.json())
      .subscribe(data => {
         //alert();
        //  this.messagelist  =  data;
        loading.dismiss();
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
            if(data[i].PreferenceHandler=="FILE_INBOX_READ_MESSAGES")
            {
              this.day1=data[i].PreferenceValue;
            }
            if(data[i].PreferenceHandler=="FILE_INBOX_UNREAD_MESSAGES")
            {
              this.day2=data[i].PreferenceValue;
            }
            if(data[i].PreferenceHandler=="USERLEVEL_CC_INTERNAL")
            {
              this.intcont=data[i].PreferenceValue;
            }
            if(data[i].PreferenceHandler=="USERLEVEL_CC_EXTERNAL")
            {
              this.extcont=data[i].PreferenceValue;
            }
            if(data[i].PreferenceHandler=="FILE_FILLING_TIME")
            {
              this.filing=data[i].PreferenceValue;
            }
            if(data[i].PreferenceHandler=="QUIET_MODE_USER_MINUTE")
            {
             // alert(this.duration);
              this.duration=data[i].PreferenceValue;
             if(this.duration=="30")
            {
               this.duration30="true";
            }
              else if(this.duration=="60")
                {
                    this.duration60="true";
                }
                  else if(this.duration=="90")
                    {
                      this.duration90="true";
                    }
                     else if(this.duration=="120")
                    {
                      this.duration120="true";
                    }



            }
            if(data[i].PreferenceHandler=="QUIET_MODE_USER_TYPE")
            {
           //alert(data[i].PreferenceValue);
        this.quietmodetype=data[i].PreferenceValue;
        if(this.quietmodetype.indexOf("am") > -1)
          {
               this.followch=true;
          }
              if(this.quietmodetype.indexOf("Urgent") > -1)
                {
                     this.urgentch=true;
                }

                if(this.quietmodetype.indexOf("Outside") > -1)
                {
                     this.outsidech=true;
                }
            }
            if(data[i].PreferenceHandler=="FILE_LOW_PRIORITY_MESSAGES")
            {
              this.day3=data[i].PreferenceValue;
            }
            if(data[i].PreferenceHandler=="FILE_DONE_FOLDER_MESSAGES")
            {
              this.day4=data[i].PreferenceValue;
            }
          }

      });
  
  }
}
