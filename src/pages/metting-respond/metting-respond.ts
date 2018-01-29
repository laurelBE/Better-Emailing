import { Component } from '@angular/core';
import { NavController, NavParams,ViewController,Platform } from 'ionic-angular';
import { InAppBrowser,InAppBrowserOptions,InAppBrowserEvent } from '@ionic-native/in-app-browser';
import { MyJsonDataProvider } from '../../providers/my-json-data/my-json-data';

/**
 * Generated class for the MettingRespondPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-metting-respond',
  templateUrl: 'metting-respond.html',
})
export class MettingRespondPage {

  startDateTime;
  endDateTime;
  location;
  subject;
  toolbar: String ="primary";
  constructor(public myJData:MyJsonDataProvider, public platform:Platform,public inAppBrowser: InAppBrowser, public navCtrl: NavController, public navParams: NavParams,public viewCtrl : ViewController) {
  
  this.platform.ready().then(() => {            
		   this.platform.registerBackButtonAction(() => {                
         //navigator['app'].exitApp(); 
              this.cancel(); 
              //this.navCtrl.pop();                        
				});        
    });
      
    this.startDateTime = this.navParams.get('startDateTime');
    this.endDateTime = this.navParams.get('endDateTime');
    this.location = this.navParams.get('location');
    this.subject = this.navParams.get('subject');

    
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
    console.log('ionViewDidLoad MettingRespondPage');
  }
  cancel()
  {
    this.viewCtrl.dismiss();
  }

  acceptRequest()
  {

            let sdate = this.startDateTime;
            let startDate=sdate.split("T");
            let tempYr=startDate[0].split("-");
            let tempDate=parseInt(tempYr[2]);
            let tempMonth=parseInt(tempYr[1]);
            let tempYear=parseInt(tempYr[0]);

            let tempTm=startDate[1].split(".");
            let tempDt=tempTm[0].split(":");
            let tempHour=parseInt(tempDt[0]);
            let tempMinute=parseInt(tempDt[1]);
            let tempSec=parseInt(tempDt[2]);

             let tempDate1=String(tempDate);
             if(tempDate<10)
                {
                    tempDate1= '0' + String(tempDate);
                }
            let tempMonth1=String(tempMonth);
             if(tempMonth<10)
                {
                    tempMonth1= '0' + String(tempMonth);
                }
             let tempHour1=String(tempHour);
             if(tempHour<10)
                {
                    tempHour1= '0' + String(tempHour);
                }
                let tempMinute1=String(tempMinute);
             if(tempMinute<10)
                {
                    tempMinute1= '0' + String(tempMinute);
                }
               let tempSec1=String(tempSec);
            if(tempSec<10)
                {
                    tempSec1= '0' + String(tempSec);
                }


     this.startDateTime=tempYear+'-'+tempMonth1+'-'+tempDate1+'T'+tempHour1+':'+tempMinute1+':'+tempSec1;

     let edate = this.endDateTime;
             startDate=edate.split("T");
             tempYr=startDate[0].split("-");
             tempDate=parseInt(tempYr[2]);
             tempMonth=parseInt(tempYr[1]);
             tempYear=parseInt(tempYr[0]);

             tempTm=startDate[1].split(".");
             tempDt=tempTm[0].split(":");
             tempHour=parseInt(tempDt[0]);
             tempMinute=parseInt(tempDt[1]);
             tempSec=parseInt(tempDt[2]);

             tempDate1=String(tempDate);
             if(tempDate<10)
                {
                    tempDate1= '0' + String(tempDate);
                }
            tempMonth1=String(tempMonth);
             if(tempMonth<10)
                {
                    tempMonth1= '0' + String(tempMonth);
                }
             tempHour1=String(tempHour);
             if(tempHour<10)
                {
                    tempHour1= '0' + String(tempHour);
                }
             tempMinute1=String(tempMinute);
             if(tempMinute<10)
                {
                    tempMinute1= '0' + String(tempMinute);
                }
             tempSec1=String(tempSec);
            if(tempSec<10)
                {
                    tempSec1= '0' + String(tempSec);
                }
    this.endDateTime = tempYear+'-'+tempMonth1+'-'+tempDate1+'T'+tempHour1+':'+tempMinute1+':'+tempSec1;
    alert(this.startDateTime);
    alert(this.endDateTime);

     //this.startDateTime='2017-12-12T12:1:12' ;
    //this.endDateTime ='2017-12-12T12:1:12' ;
    this.startDateTime=new Date(this.startDateTime).toISOString();
    this.endDateTime =new Date(this.endDateTime).toISOString();
    var ref = window.open('http://be3.cloudapp.net/bephp/insertEvent.php?location=' + this.location+'&subject='+this.subject+ '&startDate=' + this.startDateTime+ '&endDate=' + this.endDateTime,  '_self', 'location=no');
 
  //  var ref = window.open('http://be3.cloudapp.net/BE_PHP_1_LT/insertEvent.php?location=' + location+'&subject='+subject+ '&startDate=' + eventStartTime+ '&endDate=' + eventEndTime, '_self', 'location=no');           
var checkevent:boolean=true;          
ref.addEventListener('loadstop', function(event: InAppBrowserEvent) 
{       
    if(event.url.toString().includes("?location="))    
        {        
            checkevent=true;        
            ref.close();    
        }  
    if(event.url.toString().includes("?code="))    
        {             
            checkevent=false;      
            ref.close();   // var ref1 = window.open('http://be3.cloudapp.net/BE_PHP_1_LT/insertEvent.php?location=' + location+'&subject='+subject+ '&startDate=' + eventStartTime+ '&endDate=' + eventEndTime, '_self', 'location=no');  //this.newsent();
        } 
        
    if(checkevent==false)    
        {                       
            var ref1 = window.open('http://be3.cloudapp.net/bephp/insertEvent.php?location=' + this.location+'&subject='+this.subject+ '&startDate=' + this.startDateTime+ '&endDate=' + this.endDateTime, 'location=no');         
            ref1.addEventListener('loadstop', function(event: InAppBrowserEvent) 
            {      
                if(event.url.toString().includes("?location="))    
                    {               
                        ref1.close();    
                    }          
            });       
        }

});
  }
  
}
