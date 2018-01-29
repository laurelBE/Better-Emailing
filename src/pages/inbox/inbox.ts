

import { ComposePage } from '../compose/compose';
import { Component,ViewChild } from '@angular/core';

import { NavController, NavParams, ModalController,Platform,ViewController } from 'ionic-angular';
import { MaildetailPage } from '../maildetail/maildetail';
import { MyJsonDataProvider } from '../../providers/my-json-data/my-json-data';
import { HomePage } from '../home/home';
import { NewEventPage } from '../new-event/new-event';
import { TestPage } from '../test/test';
import { MenuMailPage } from '../menu-mail/menu-mail';
import { MeetingRequestPage } from '../meeting-request/meeting-request';
import { CalendarPage } from '../calendar/calendar';
import { Http,Headers,RequestOptions } from '@angular/http';
/**
 * Generated class for the InboxPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */




@Component({
  selector: 'page-inbox',
  templateUrl: 'inbox.html',
})
export class InboxPage {

 

   quietStatusTimeList;

   dataList = [];

   calIconName="";

   toolbar: String ="primary";
  

  constructor(public viewCtrl : ViewController, public platform:Platform,public http: Http,public myJData: MyJsonDataProvider ,public navCtrl: NavController, public navParams: NavParams,public modelCtrl: ModalController) {
  

    this.platform.ready().then(() => {            
		   this.platform.registerBackButtonAction(() => {                
         //navigator['app'].exitApp(); 
              this.cancel(); 
              //this.navCtrl.pop();                        
				});        
		}); 


    this.getData();
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
    console.log('ionViewDidLoad InboxPage');

     
    
  }


  details(item : string)
  {
    //alert(this.name.value);
      this.navCtrl.push(MaildetailPage, {item : item});

     
  }


  Compose()
  {
      let modal = this.modelCtrl.create(ComposePage);

      modal.present();
  }

  goBack()
  {
    this.navCtrl.pop();
  }

  convAction()
  {
      

     let m = this.navCtrl.push(HomePage).then(() => {
                              // first we find the index of the current view controller:
                              const index = this.viewCtrl.index;
                              // then we remove it from the navigation stack
                              this.navCtrl.remove(index);
                            });;

  }


  getData()
  {
    this.myJData.getJsonData().subscribe(data => this.dataList = data);
   
     
  }
  calender()
  {
    this.navCtrl.push(NewEventPage);
  }

  respondaction()
  {
     let m = this.modelCtrl.create(TestPage);

      m.present();
     
  }

  cancel()
  {
    this.navCtrl.pop();
  }

  mailListOpen()
  {
    let modal = this.modelCtrl.create(MenuMailPage);

      modal.present();
  }


  MeetingRequest()
  {
    this.navCtrl.push(MeetingRequestPage)
    .then(() => {
                              // first we find the index of the current view controller:
                              const index = this.viewCtrl.index;
                              // then we remove it from the navigation stack
                              this.navCtrl.remove(index);
                            });;
  }

  calc(){
    this.navCtrl.push(CalendarPage);
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
         alert(this.quietStatusTimeList[0].Status);
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
}
