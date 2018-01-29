import { Component } from '@angular/core';
import { NavController, NavParams,ViewController,LoadingController,ToastController,Platform } from 'ionic-angular';
import { Http,Headers,RequestOptions } from '@angular/http';
import { MyJsonDataProvider } from '../../providers/my-json-data/my-json-data';
import {EditquiettimePage} from '../editquiettime/editquiettime';
import { ScheduleQuietTimePage } from '../schedule-quiet-time/schedule-quiet-time';
import 'rxjs/add/operator/map';
import moment from 'moment';
import * as momentTz from 'moment-timezone';
import { HomePage } from '../home/home';
/**
 * Generated class for the QuietimeListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-quietime-list',
  templateUrl: 'quietime-list.html',
})
export class QuietimeListPage {

  

  quietTimeList = [];
quietStatusTimeList = [];
setQuiet=false;
id;
toolbar: String ="primary";
  constructor(public platform:Platform,public toast: ToastController,public load : LoadingController,public viewCtrl : ViewController,public myJData : MyJsonDataProvider, public http:Http, public navCtrl: NavController, public navParams: NavParams) {
  

      this.platform.ready().then(() => {            
		   this.platform.registerBackButtonAction(() => {                
         //navigator['app'].exitApp(); 
              this.cancel(); 
              //this.navCtrl.pop();                        
				});        
		}); 


    this.get_QuietTimeList();
      this.get_QuietTimeStatus();
     
  
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
    console.log('ionViewDidLoad QuietimeListPage');
  }

  cancel()
  {
    this.navCtrl.pop();
  }
 open()
  {
    this.navCtrl.push(ScheduleQuietTimePage).then(() => {
                              // first we find the index of the current view controller:
                              const index = this.viewCtrl.index;
                              // then we remove it from the navigation stack
                              this.navCtrl.remove(index);
                            });
  }

    
  get_QuietTimeList()
  {
      let headers=new Headers({'Content-Type':'application/x-www-form-urlencoded'});

      let options=new RequestOptions({headers:headers});

      let startDate=new Date().toISOString();
      
      let startDate1=moment(startDate).format("YYYY-MM-DDTHH:mm:ssZ");

      let date = new Date();
  
                 //alert(date.getTimezoneOffset());

     // alert(startDate1);

 let params = 'email='+this.myJData.email;
       let body = 'email='+this.myJData.email + '&date='+startDate1;

    
      this.http.post(this.myJData.url + 'getQuietTimeModeList.php',params,{headers:headers})
      .map(res => res.json())
      .subscribe(data => {
        console.log(data);
          this.quietTimeList  =  data;
          
          
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
                      this.setQuiet=true;
                      this.toolbar="quietmodecolor";
					            this.myJData.quietTimeStatus=true;
            }
      });
         
  }

  setDelete(item)
  {

 let loading = this.load.create({

                content : 'Please wait'

            });

    let headers=new Headers({'Content-Type':'application/x-www-form-urlencoded'});

      let options=new RequestOptions({headers:headers});

 let params = 'email='+this.myJData.email+ '&Id='+item.Id;
       let body = 'email='+this.myJData.email;

    
      this.http.post(this.myJData.url + 'setQuietTimeDelete.php',params,{headers:headers})
      .map(res => res.text())
      .subscribe(data => {
        // this.quietStatusTimeList  =  data;
        this.viewCtrl.dismiss();
                         let toast = this.toast.create({

                        message : "Successfully deleted",

                        duration : 3000,

                        });

              toast.present();
              this.myJData.quietTimeStatus=false;
              this.toolbar ="primary";

              this.get_QuietTimeStatus();
              
               this.navCtrl.setRoot(QuietimeListPage);
         
      });
  }

  setEdit(item)
  {
//,{item:item}
 this.navCtrl.push(EditquiettimePage,{item:item});
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
            let body = 'email='+this.myJData.email+'&duration=30'+'&urgentMessagesAllowed=1'+'&followingMessagesAllowed=1'+'&outsideDomainMessagesAllowed=1';
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

  }
  
