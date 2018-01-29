import { Component } from '@angular/core';
import { NavController, NavParams, ModalController,Platform,ViewController } from 'ionic-angular';
import { MenuMailPage } from '../menu-mail/menu-mail';
import { SearchResultsPage } from '../search-results/search-results';
import { MyJsonDataProvider } from '../../providers/my-json-data/my-json-data';
import { Http,Headers,RequestOptions } from '@angular/http';
/**
 * Generated class for the SearchPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  ItemArr;
  messageList=[];
  toolbar: String ="primary";
SearchKey;
HighPriority="false";
ToDo="false";
Inbox="false";
Delegated="false";
Low="false";
Sent="false";
Events="false";
all="false";
attachment="false";
Subject="false";

itemString:string='';

  constructor(public myJData : MyJsonDataProvider,public http : Http,public viewCtrl : ViewController, public platform: Platform, public mod:ModalController, public navCtrl: NavController, public navParams: NavParams) {
 
    /* this.ItemArr=[
    {title : "High Priority", checked : false},
    {title : "To Do", checked : false},
    {title : "Inbox", checked : false},
    {title : "Delegated", checked : false},
    {title : "Low Priority" , checked : false},
    {title : "Sent", checked : false},
    {title : "Events", checked : false},
    {title : "All Folders", checked : false}]; */

    this.platform.ready().then(() => {            
		   this.platform.registerBackButtonAction(() => {                
         //navigator['app'].exitApp(); 
              this.cancel(); 
              //this.navCtrl.pop();                        
				});        
		});

    this.ItemArr=["High Priority","To Do","Inbox","Delegated","Low Priority" ,"Sent","Events","All Folders"];
 
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

  ChangeStatus(title,search)
  {
      alert(title + search);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  cancel()
  {
    this.navCtrl.pop();
  }


	openMailList1()
	{

   
		let m = this.mod.create(MenuMailPage);

		m.present();
	}

  openSearchResults(SearchKey,HighPriority,ToDo,Inbox,Delegated,Low,Sent,Events,all,attachment,Subject)
  {
    if(SearchKey=="")
      {
       alert("Please enter field")
      }
else
  {
    if(HighPriority==true){
      this.HighPriority="High Priority";
        this.itemString= this.itemString + "High Priority;";
      //alert(this.itemString);
      //alert(this.HighPriority)
    }
    else
      {
       this.HighPriority="azz"; 
       this.itemString=this.itemString.replace(new RegExp("High Priority;", 'g'), "");
       alert(this.itemString);
      }
    if(ToDo==true)
      {
       this.ToDo="Do List";
       this.itemString= this.itemString + "To Do;";
      }
      else
        {
         this.ToDo="azz";
         this.itemString=this.itemString.replace(new RegExp("To Do;", 'g'), "");
        }


         if(Inbox==true){
      this.Inbox="Inbox";
      this.itemString= this.itemString + "Inbox;";
    }
    else
      {
       this.Inbox="azz"; 
       this.itemString=this.itemString.replace(new RegExp("Inbox;", 'g'), "");
      }
    if(Delegated==true)
      {
       this.Delegated="Delegated";
       this.itemString= this.itemString + "Delegated;";
      }
      else
        {
         this.Delegated="azz";
         this.itemString=this.itemString.replace(new RegExp("Delegated;", 'g'), "");
        }
    if(Low==true)
    {
      this.Low="Low";
      this.itemString= this.itemString + "Low Priority;";
    }
    else
      {
       this.Low="azz";
       this.itemString=this.itemString.replace(new RegExp("Low Priority;", 'g'), ""); 
      }
    if(Sent==true)
      {
       this.Sent="Sent";
       this.itemString= this.itemString + "Sent;";
      }
      else
        {
         this.Sent="azz";
         this.itemString=this.itemString.replace(new RegExp("Sent;", 'g'), ""); 
        }


    if(Events==true)
    {
      this.Events="Events";
      this.itemString= this.itemString + "Events;";
    }
    else
      {
       this.Events="azz";
       this.itemString=this.itemString.replace(new RegExp("Events;", 'g'), ""); 
      }
    if(all==true)
      {
       this.all="all";
       this.itemString= this.itemString + "All Folders;";
      }
      else
        {
         this.all="azz";
         this.itemString=this.itemString.replace(new RegExp("All Folders;", 'g'), "");
        }


    if(attachment==true){
      this.attachment="attachment";
      this.itemString= this.itemString + "With Attachment;";
    }
    else
      {
       this.attachment="azz";
       this.itemString=this.itemString.replace(new RegExp("With Attachment;", 'g'), ""); 
      }
    if(Subject==true)
      {
       this.Subject="subject";
       this.itemString= this.itemString + "Subject;";
      }
      else
        {
         this.Subject="azz";
          this.itemString=this.itemString.replace(new RegExp("Subject;", 'g'), ""); 
        }
     //  console.log(SearchKey+this.HighPriority+ToDo+Inbox+Delegated+Low+Sent+Events+all+attachment+Subject);

       let headers=new Headers({'Content-Type':'application/x-www-form-urlencoded'});

      let options=new RequestOptions({headers:headers});

     

       let params = 'email='+this.myJData.email+'&search='+SearchKey+'&highPriority='+this.HighPriority+'&ToDo='+this.ToDo+'&Inbox='+this.Inbox+'&Delegated='+this.Delegated+'&Low='+this.Low+'&Sent='+this.Sent+'&Event='+this.Events+'&all='+this.all+'&attachment='+this.attachment+'&Subject='+this.Subject;
       let body = 'email='+this.myJData.email;

  // alert(params);
     this.http.post(this.myJData.url + 'getSearchresult.php',params,{headers:headers})
      .map(res => res.json())
      .subscribe(data => {
        console.log(data);
        this.messageList=data;
       // alert(this.messageList[0].SenderEmail);
        this.navCtrl.push(SearchResultsPage,{searchKey : SearchKey,messageList:this.messageList,itemString:this.itemString})
      .then(() => {
                              // first we find the index of the current view controller:
                              const index = this.viewCtrl.index;
                              // then we remove it from the navigation stack
                              this.navCtrl.remove(index);
                            });;
      });
  /*     this.navCtrl.push(SearchResultsPage,{searchKey : SearchKey})
      .then(() => {
                              // first we find the index of the current view controller:
                              const index = this.viewCtrl.index;
                              // then we remove it from the navigation stack
                              this.navCtrl.remove(index);
                            });; */
  }
  }

}
