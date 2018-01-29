import { Component } from '@angular/core';
import { NavController, ModalController, NavParams,ViewController,Platform } from 'ionic-angular';
import { CalendarPage } from '../calendar/calendar';
import { SearchPage } from '../search/search';
import { NewEventPage } from '../new-event/new-event';
import { ComposePage } from '../compose/compose';
import { HomePage } from '../home/home';
import { MyJsonDataProvider } from '../../providers/my-json-data/my-json-data';
/**
 * Generated class for the TrashDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-trash-details',
  templateUrl: 'trash-details.html',
})
export class TrashDetailsPage {

  item;
  toIds=[];
  CCIds=[];
  numbers2;
  numbers1;
  toolbar: String ="primary";

  constructor(public myJData : MyJsonDataProvider,public platform:Platform, public mod: ModalController,public navCtrl: NavController,public viewCtrl : ViewController, public navParams: NavParams) {
  
    this.platform.ready().then(() => {            
		   this.platform.registerBackButtonAction(() => {                
         //navigator['app'].exitApp(); 
              this.cancel(); 
              //this.navCtrl.pop();                        
				});        
		});


    this.item = this.navParams.get("item");
    this.getToIds(this.item.To);
   // this.getCCIds(this.item.Cc);
    //alert(this.item.To);
    console.log("this.item.Subject : " + this.item.Subject);
  
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
    console.log('ionViewDidLoad TrashDetailsPage');
    this.item = this.navParams.get("item");
    console.log("this.item.Subject : " + this.item.Subject);
  }

   getToIds(to)
  {

    this.toIds= to.split(',');

    this.numbers2 = Array(this.toIds.length).fill(0).map((x,i)=>i);

    return this.numbers2;
    
  }

  getCCIds(cc)
  {
    this.CCIds= cc.split(',');

    this.numbers2 = Array(this.CCIds.length).fill(0).map((x,i)=>i);

    return this.numbers2;
    
  }

   cancel()
  {
   /*  const data= {cancel:"true"};
      this.viewCtrl.dismiss(data); */
      this.viewCtrl.dismiss();
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

  calc(){
    this.navCtrl.push(CalendarPage);
  }

}
