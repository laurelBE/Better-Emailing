import { Component } from '@angular/core';
import { NavController, NavParams, ModalController,Platform } from 'ionic-angular';
import { ConversationActionPage } from '../conversation-action/conversation-action';
import { MessageActionPage } from '../message-action/message-action';
import { TestPage } from '../test/test';
import { NewEventPage } from '../new-event/new-event';
import { ComposePage } from '../compose/compose';
import { ParticipationStatusPage } from '../participation-status/participation-status';

/**
 * Generated class for the MessageDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-message-details',
  templateUrl: 'message-details.html',
})
export class MessageDetailsPage {

  public From : string;

  public To : string;

  public Message : string;

  public Date1 : string;

  public status: boolean = false;
  public showAll : string;
  toolbar: String ="primary";

  constructor(public platform:Platform,public mod: ModalController,public navCtrl: NavController, public navParams: NavParams) {
  

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

    this.From = ""+item.Email;

    this.To = item.To;

    this.Message = item.Message;
    
    this.Date1 = item.Date;

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
}
