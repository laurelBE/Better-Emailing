import { Component } from '@angular/core';
import { NavController, NavParams ,LoadingController ,ToastController,ViewController,Platform} from 'ionic-angular';
import { Http,Headers,RequestOptions } from '@angular/http';
import { MyJsonDataProvider } from '../../providers/my-json-data/my-json-data';
import { ScheduleQuietTimePage } from '../schedule-quiet-time/schedule-quiet-time';
import {HomePage} from '../home/home';
import moment from 'moment';
/**
 * Generated class for the StartQuietTimePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-start-quiet-time',
  templateUrl: 'start-quiet-time.html',
})
export class StartQuietTimePage {

 duration=30;
 urgent=0;
 following=0;
 outside=0;
 toolbar: String ="primary";
  constructor(public platform:Platform, public navParams: NavParams,public navCtrl: NavController,public myJData : MyJsonDataProvider, public http : Http,public viewCtrl : ViewController,public load : LoadingController,public toast: ToastController) {
  
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
    console.log('ionViewDidLoad StartQuietTimePage');
  }

  cancel(){
    this.viewCtrl.dismiss();
  }
setduration(event)
{
   this.duration=event.target.value;

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
    setschedulemode()
{
  this.navCtrl.push(ScheduleQuietTimePage).then(() => {
                              // first we find the index of the current view controller:
                              const index = this.viewCtrl.index;
                              // then we remove it from the navigation stack
                              this.navCtrl.remove(index);
                            });
} setmode()
  {
    
 
     //   alert(this.duration);
         let loading = this.load.create({

                content : 'Please wait'

            });

          
            let headers=new Headers({'Content-Type':'application/x-www-form-urlencoded'});

            loading.present();

            let startDate=new Date().toISOString();
            startDate=moment(startDate).format("YYYY-MM-DDTHH:mm:ssZ");
            startDate=new Date(startDate).toISOString();

            let body = 'email='+this.myJData.email+'&duration='+this.duration+'&urgentMessagesAllowed='+this.urgent+'&followingMessagesAllowed='+this.following+'&outsideDomainMessagesAllowed='+this.outside+'&startDate='+startDate;

            this.http.post(this.myJData.url+'startQuietMode.php',body,{headers:headers})
            .map(res => res.text(),loading.dismiss())
            .subscribe(data=>{this.viewCtrl.dismiss();

                              /* let toast = this.toast.create({

                              message : data,

                                duration : 3000,

                                });

                              toast.present(); */
                              alert(data);
                               
                            }); 
      this.navCtrl.setRoot(HomePage);

      //this.navCtrl.setRoot(this.navCtrl.getActive().component)
  }
}
