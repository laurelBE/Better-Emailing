import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ViewController,Platform,ToastController } from 'ionic-angular';
import { Http,Headers,RequestOptions } from '@angular/http';
import { MyJsonDataProvider } from '../../providers/my-json-data/my-json-data';

/**
 * Generated class for the ParticipationStatusPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-participation-status',
  templateUrl: 'participation-status.html',
})
export class ParticipationStatusPage {

  public statusList = [];
 public to : string = "";

  public cc : string = "";

  public bcc : string;

  conversationHandle : Number;
  participants : string;
  public body : string;

  public subject : string;

  public handle : string;

  public attachmentNames : string;

  public responseAction : string;

  participantsArr=[];
  UserList = [];
  Important = [];
  Urgent = [];
  Category = [];

  toolbar: String ="primary";

  constructor(public toast : ToastController, public platform: Platform,public mod: ModalController,public myJData: MyJsonDataProvider,public http : Http, public viewCtrl : ViewController, public MyJData : MyJsonDataProvider,public navCtrl: NavController, public navParams: NavParams) {
  
    //this.MyJData.getStatusData().subscribe(data => this.statusList = data);

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
    console.log('ionViewDidLoad ParticipationStatusPage');
     let item = this.navParams.get("item");

    this.conversationHandle = this.myJData.ConversationHandle;
 console.log(this.conversationHandle);

     this.getParticipationList();
  }

    cancel()
  {
      const data= {cancel:"true"};
      this.viewCtrl.dismiss(data);
  }

   getParticipationList()
  {

    let headers=new Headers({'Content-Type':'application/x-www-form-urlencoded'});
    
    let options=new RequestOptions({headers:headers});

    let body = 'ConversationHandle=' + this.conversationHandle+'&userEmail='+this.myJData.email;

    this.http.post(this.myJData.url + 'ParticipantStatus.php',body,{headers:headers})
    .map(res => res.json())
    .subscribe(data=>{ 
      console.log(data);
      this.UserList = data;

   /*    if(this.UserList.length==0)
        {
           let toast = this.toast.create({

          message : "No mails in To Do",

          duration : 3000,

      });

      toast.present();
        } */
     
    });
  }
}
