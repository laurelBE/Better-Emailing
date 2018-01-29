import { Component } from '@angular/core';
import { NavController, NavParams,ModalController,Platform,ViewController } from 'ionic-angular';
import { PleaseReadDetailsPage } from '../please-read-details/please-read-details';
import { MyJsonDataProvider } from '../../providers/my-json-data/my-json-data';
import { ComposePage } from '../compose/compose';
import { MaildetailPage } from '../maildetail/maildetail';
import { SearchPage } from '../search/search';
/**
 * Generated class for the SearchResultsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-search-results',
  templateUrl: 'search-results.html',
})
export class SearchResultsPage {

   

  public showPara : boolean = true;

  public showAll : string = "ios-arrow-up-outline";

  public showPara1 : boolean = false;

  public showAll1 : string = "ios-arrow-down-outline";

  item;
item1=[];
  messageList=[];
  toolbar: String ="primary";
  itemString='';
  folderArr=[];

  constructor(public viewCtrl : ViewController, public myJData : MyJsonDataProvider,public platform : Platform, public mod: ModalController, public MyJData : MyJsonDataProvider,public navCtrl: NavController, public navParams: NavParams) {


    this.platform.ready().then(() => {            
		   this.platform.registerBackButtonAction(() => {                
         //navigator['app'].exitApp(); 
              this.cancel(); 
              //this.navCtrl.pop();                        
				});        
		});
 this.item1 = this.navParams.get("messageList");
 this.itemString=this.navParams.get("itemString");

 /* for(let i=0; i<this.item1.length;i++)
  {
      if(this.item1[i].AttachmentCount=="1")
        {
            this.messageList=this.item1[i];
        }
  } */
 //alert(this.item1[0].SenderEmail);
 //this.messageList=this.item1;
 //this.MyJData.getSearchDetails().subscribe(data => this.messageList = data);

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

    this.item = this.navParams.get("searchKey");



    
  }

  cancel()
  {
   // this.navCtrl.pop();
    this.navCtrl.push(SearchPage)
      .then(() => {
                              // first we find the index of the current view controller:
                              const index = this.viewCtrl.index;
                              // then we remove it from the navigation stack
                              this.navCtrl.remove(index);
                            });;
  }

  getFolderName(items)
  {
    this.folderArr= items.split(';');
 
    let numbers2 = Array(this.folderArr.length-1).fill(0).map((x,i)=>i);

    //console.log("AttachmentNames " + this.AttachmentNames);
    //console.log("numbers2 " + this.numbers2);

    return numbers2;
  }

  compose()
	{
        let m = this.mod.create(ComposePage);

		m.present();
	}

    DoHere()
  {

      this.showPara = !this.showPara;

      if(this.showAll == "ios-arrow-down-outline")
      {
          this.showAll = "ios-arrow-up-outline"
      }
      else if(this.showAll == "ios-arrow-up-outline")
      {
            this.showAll = "ios-arrow-down-outline"
      }
  }

      DoHere1()
  {

      this.showPara1 = !this.showPara1;

      if(this.showAll1 == "ios-arrow-down-outline")
      {
          this.showAll1 = "ios-arrow-up-outline"
      }
      else if(this.showAll1 == "ios-arrow-up-outline")
      {
            this.showAll1 = "ios-arrow-down-outline"
      }
  }

  ShowInfo()
  {
     


        this.navCtrl.push(PleaseReadDetailsPage,{item : this.messageList[0]});
      
  }

   getMessageList1(Subject,MessageHandle, ConversationHandle)
  {
    this.myJData.subject=Subject;
    this.myJData.ConversationHandle=ConversationHandle;
    this.navCtrl.push(MaildetailPage,{Subject : Subject, MessageHandle: MessageHandle,ConversationHandle : ConversationHandle});
      
  }


}
