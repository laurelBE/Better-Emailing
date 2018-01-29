import { Component } from '@angular/core';
import { NavController, NavParams,ModalController,Platform,ViewController} from 'ionic-angular';
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
 * Generated class for the UrgentPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-urgent',
  templateUrl: 'urgent.html',
})
export class UrgentPage {

  public email : String ="sneha@eproductivite.com";
  public folder : String  = "Urgent";

  public messageList = [];
  toolbar: String ="primary";

  constructor(public viewCtrl : ViewController, public platform : Platform, public http:Http , public mod: ModalController,public MyJData : MyJsonDataProvider,public navCtrl: NavController, public navParams: NavParams) {
  

    this.platform.ready().then(() => {            
		   this.platform.registerBackButtonAction(() => {                
         //navigator['app'].exitApp(); 
              this.cancel(); 
              //this.navCtrl.pop();                        
				});        
		});

   this.get_MessageList();
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UrgentPage');
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



  newevent()
	{
         this.navCtrl.push(NewEventPage);
	}

	compose()
	{
        let m = this.mod.create(ComposePage);

		m.present();
  }
  
  folderlist()
  {
    this.navCtrl.push(HomePage)
    .then(() => {
                              // first we find the index of the current view controller:
                              const index = this.viewCtrl.index;
                              // then we remove it from the navigation stack
                              this.navCtrl.remove(index);
                            });;
  }

  readRequested()
  {
    this.navCtrl.push(ReadRequestedPage);
  }

  searchPage()
  {
   this.navCtrl.push(SearchPage)
   .then(() => {
                              // first we find the index of the current view controller:
                              const index = this.viewCtrl.index;
                              // then we remove it from the navigation stack
                              this.navCtrl.remove(index);
                            });;
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
    this.navCtrl.push(CalendarPage)
    .then(() => {
                              // first we find the index of the current view controller:
                              const index = this.viewCtrl.index;
                              // then we remove it from the navigation stack
                              this.navCtrl.remove(index);
                            });;
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
