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
 * Generated class for the ImportantPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-important',
  templateUrl: 'important.html',
})
export class ImportantPage {

 public email : String ="sneha@eproductivite.com";
 public folder : String  = "important";

 toolbar: String ="primary";

messageList = [];

  constructor(public viewCtrl : ViewController, public platform:Platform,public http: Http, public mod: ModalController,public MyJData : MyJsonDataProvider,public navCtrl: NavController, public navParams: NavParams) {
  
    this.platform.ready().then(() => {            
		   this.platform.registerBackButtonAction(() => {                
         //navigator['app'].exitApp(); 
              this.cancel(); 
              //this.navCtrl.pop();                        
				});        
		});
    
    this.get_MessageList();

    //this.MyJData.get_ActionRequested_MessageList().subscribe(data => {this.messageList = data;});
  
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
    console.log('ionViewDidLoad ImportantPage');
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
   this.navCtrl.push(SearchPage);
  }

  cancel()
  {
    this.navCtrl.push(HomePage)
    .then(() => {
                              // first we find the index of the current view controller:
                              const index = this.viewCtrl.index;
                              // then we remove it from the navigation stack
                              this.navCtrl.remove(index);
                            });;
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
   /* let data1 = new URLSearchParams();
  data1.append('email', 'sneha@eproductivite.com');
  data1.append('folder', 'important');
  let headers = new Headers();
  headers.append('Content-Type','application/json');
  headers.append('Accept', 'application/json');
  let body={email:'sneha@eproductivite.com',folder:'important'};

      this.http.post("http://192.168.0.2:1709/BE/Important_MessageList.php",JSON.stringify(data1),{headers:headers}).map(response => response.json()).subscribe(data => {
            this.messageList = data;
      }, error => {
          console.log(error);
      });

     */

     /* this.http.get("http://192.168.0.2:1709/BE/Important_MessageList.php?Email='sneha@eproductivite.com'")
     
      .subscribe(data => console.log(data)); 
      
      */
        
      let headers=new Headers({'Content-Type':'application/x-www-form-urlencoded'});

      let options=new RequestOptions({headers:headers});


      let body = 'email='+this.email+'&folder='+this.folder;

    
      this.http.post('http://192.168.0.2:1709/BE/getConversationList.php',body,{headers:headers})
      .map(res => res.json())
      .subscribe(data => {
          this.messageList  =  data;
      });
  }
}
