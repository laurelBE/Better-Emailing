import { Component } from '@angular/core';
import { NavController, NavParams, ModalController,Platform,ViewController } from 'ionic-angular';
import { ConversationActionPage } from '../conversation-action/conversation-action';
import { MessageActionPage } from '../message-action/message-action';
import { TestPage } from '../test/test';
import { NewEventPage } from '../new-event/new-event';
import { ComposePage } from '../compose/compose';
import { ParticipationStatusPage } from '../participation-status/participation-status';
import { Http,Headers,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the PleaseReadDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-please-read-details',
  templateUrl: 'please-read-details.html',
})
export class PleaseReadDetailsPage {

  public status: boolean = false;
  public showAll : string;

  public MessageHandle : string;

  messageDetails=[];

  toolbar: String ="primary";


  constructor(public viewCtrl :ViewController, public platform: Platform, public http: Http,public mod: ModalController, public navCtrl: NavController, public navParams: NavParams) {
  
     
    this.platform.ready().then(() => {            
		   this.platform.registerBackButtonAction(() => {                
         //navigator['app'].exitApp(); 
              this.cancel(); 
              //this.navCtrl.pop();                        
				});        
		});
    
    
    this.showAll = "Show all";
  

  }

      ionViewWillEnter() {

    this.platform.registerBackButtonAction(() => {                
         //navigator['app'].exitApp(); 
              this.cancel(); 
              //this.navCtrl.pop();                        
        });
            

}

  ionViewDidLoad() {


    let item = this.navParams.get("item");

    //this.From = ""+item.Name;

    this.MessageHandle = item.MessageHandle;

    console.log("MessageHandle : " + this.MessageHandle);

      this.get_MessageDetails();


  }


ShowAll()
  {
      this.status = !this.status;

      if(this.status == true)
        {
            this.showAll ="Hide";
        }
        else{
          this.showAll ="Show all";
        }
  }

  convAction()
  {
    let m = this.mod.create(ConversationActionPage);

      m.present();
  }
  
  msgAction()
  {
    let m = this.mod.create(MessageActionPage);

      m.present();
  }

  respondAction()
  {
    let m = this.mod.create(TestPage);

      m.present();
  }

  newEvent()
  {
    let m = this.mod.create(NewEventPage);

      m.present();
  }

  compose()
  {
    let m = this.mod.create(ComposePage);

      m.present();
  }

  participationStatus()
  {
      let m = this.mod.create(ParticipationStatusPage);

      m.present();
  }


  cancel()
  {
    this.navCtrl.pop();
  }

    get_MessageDetails()
  {
      let headers=new Headers({'Content-Type':'application/x-www-form-urlencoded'});

      let options=new RequestOptions({headers:headers});


       let body = 'MessageHandle='+this.MessageHandle;

    
      this.http.post('http://192.168.0.4:1709/BE/getMessageDetails.php',body,{headers:headers})
      .map(res => res.json())
      .subscribe(data => {
          this.messageDetails  =  data;
      });
  }
}
