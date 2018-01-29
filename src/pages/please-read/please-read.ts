import { Component } from '@angular/core';
import { NavController, NavParams,ModalController,Platform} from 'ionic-angular';
import { NewEventPage } from '../new-event/new-event';
import { ComposePage } from '../compose/compose';
import { ReadRequestedPage } from '../read-requested/read-requested';
import { MyJsonDataProvider } from '../../providers/my-json-data/my-json-data';
import { SearchPage } from '../search/search';
import { HomePage } from '../home/home';
import { PleaseReadDetailsPage } from '../please-read-details/please-read-details';
import { CalendarPage } from '../calendar/calendar';
import { Http,Headers,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
/**
 * Generated class for the PleaseReadPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-please-read',
  templateUrl: 'please-read.html',
})
export class PleaseReadPage {

  public email : String ="sneha@eproductivite.com";
  public folder : String  = "Please Read";

   public messageList = [];

   toolbar: String ="primary";

  constructor(public platform:Platform, public http: Http, public MyJData : MyJsonDataProvider,public navCtrl: NavController, public navParams: NavParams,public mod: ModalController) {
 

    this.platform.ready().then(() => {            
		   this.platform.registerBackButtonAction(() => {                
         //navigator['app'].exitApp(); 
              this.cancel(); 
              //this.navCtrl.pop();                        
				});        
		});

    this.get_MessageList();
  }

      ionViewWillEnter() {

    this.platform.registerBackButtonAction(() => {                
         //navigator['app'].exitApp(); 
              this.cancel(); 
              //this.navCtrl.pop();                        
        });
      if(this.MyJData.quietTimeStatus==true)
          {
             this.toolbar="quietmodecolor";
          }

}

  ionViewDidLoad() {
    console.log('ionViewDidLoad PleaseReadPage');
  }

  newevent()
	{
         this.navCtrl.push(NewEventPage)
         
	}

	compose()
	{
        let m = this.mod.create(ComposePage);

		m.present();
  }
  
  folderlist()
  {
    this.navCtrl.push(HomePage);
  }

  readRequested()
  {
    this.navCtrl.push(ReadRequestedPage);
  }

  searchPage()
  {
   this.navCtrl.push(SearchPage);
  }

  cancel()
  {
    this.navCtrl.push(HomePage);
  }

  getDetails(item : string)
  {
    this.navCtrl.push(PleaseReadDetailsPage,{item : item});
  }

  	calc(){
		this.navCtrl.push(CalendarPage);
  }
  
  get_MessageList()
  {
      let headers=new Headers({'Content-Type':'application/x-www-form-urlencoded'});

      let options=new RequestOptions({headers:headers});


       let body = 'email='+this.email+'&folder='+this.folder;

    
      this.http.post('http://192.168.0.4:1709/BE/getConversationList.php',body,{headers:headers})
      .map(res => res.json())
      .subscribe(data => {
          this.messageList  =  data;
      });
  }

  
}
