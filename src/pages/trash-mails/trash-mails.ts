import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController,ModalController,Platform,ViewController } from 'ionic-angular';
import { MyJsonDataProvider } from '../../providers/my-json-data/my-json-data';
import { Http,Headers,RequestOptions } from '@angular/http';
import { HomePage } from '../home/home';
import { TrashDetailsPage } from '../trash-details/trash-details';
import { CalendarPage } from '../calendar/calendar';
import { SearchPage } from '../search/search';
import { NewEventPage } from '../new-event/new-event';
import { ComposePage } from '../compose/compose';
import { ReadRequestedPage } from '../read-requested/read-requested';

/**
 * Generated class for the TrashMailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-trash-mails',
  templateUrl: 'trash-mails.html',
})
export class TrashMailsPage {

  messageList=[];
  toolbar: String ="primary";
 data;
 mainUrl;
 Title;
 folder;
  constructor(public viewCtrl : ViewController, public platform : Platform, public mod: ModalController,public load : LoadingController, public myJData: MyJsonDataProvider,public http : Http, public navCtrl: NavController, public navParams: NavParams) {
  
    this.platform.ready().then(() => {            
		   this.platform.registerBackButtonAction(() => {                
         //navigator['app'].exitApp(); 
              this.cancel(); 
              //this.navCtrl.pop();                        
				});        
		});
   this.data=navParams.get('data'); 
    this.mainUrl=this.myJData.url+"readSentMails.php";
   if(this.data=="2")
    {
     this.folder="Sent Mail"
      this.Title="Sent";
    }
    else if(this.data=="1"){
      this.folder="Trash";
        this.Title="Trash";
    }
      else
        {
            this.folder="Drafts";
        this.Title="Drafts";
        }
  // alert(this.data);
  
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
    console.log('ionViewDidLoad TrashMailsPage');

    let loading = this.load.create({

                content : 'Please wait'

            });
      loading.present();
    let headers=new Headers({'Content-Type':'application/x-www-form-urlencoded'});
    
    let options=new RequestOptions({headers:headers});
            let body = 'email='+this.myJData.email+'&folder='+this.folder;
            this.http.post(this.mainUrl,body,{headers:headers})
            .map(res => res.json())
            .subscribe(data=> {
              loading.dismiss();
        //      alert(data);
            this.messageList = data;
            loading.dismiss();
            });
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

  getDetails(item)
  {
    this.navCtrl.push(TrashDetailsPage,{item:item});
  }

  newevent()
	{
         this.navCtrl.push(NewEventPage);
	}

	compose()
	{
        let m = this.mod.create(ComposePage)
        

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

  searchPage()
  {
   this.navCtrl.push(SearchPage);
  }

  calc()
  {
    this.navCtrl.push(CalendarPage);
  }

  readRequested()
  {
    this.navCtrl.push(ReadRequestedPage);
  }

}
