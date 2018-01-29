import { Component } from '@angular/core';
import { NavController, NavParams, ModalController,LoadingController,ToastController,ViewController,Platform } from 'ionic-angular';
import { MyJsonDataProvider } from '../../providers/my-json-data/my-json-data';
import { ComposePage } from '../compose/compose';
import { ConversationActionPage } from '../conversation-action/conversation-action';
import { NewEventPage } from '../new-event/new-event';
import { PleaseReadPage } from '../please-read/please-read';
import { Http,Headers,RequestOptions } from '@angular/http';
import { ConversationListPage } from '../conversation-list/conversation-list';

/**
 * Generated class for the ReadRequestedHpPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-read-requested-hp',
  templateUrl: 'read-requested-hp.html',
})
export class ReadRequestedHpPage {

  public messageList = [];

  categoryList : String;
  folder : String;
   icon : String;

    iconArray =  [];

   setConvId =[];
   ConvIdList='';

  url : string;
  toolbar: String ="primary";

  constructor(public platform: Platform, public viewCtrl : ViewController, public toast : ToastController, public myJData : MyJsonDataProvider, public load : LoadingController,public http:Http,public mod: ModalController, public MyJData : MyJsonDataProvider,public navCtrl: NavController, public navParams: NavParams) {
  
    this.platform.ready().then(() => {            
		   this.platform.registerBackButtonAction(() => {                
         //navigator['app'].exitApp(); 
              //this.cancel(); 
              this.navCtrl.pop();                        
				});        
		});
   
   
    this.categoryList = navParams.get('categoryList'); 
      this.folder = navParams.get('folder');
       this.icon = navParams.get('icon');

      console.log("folder : " +this.folder);
      console.log("category list : " + this.categoryList);
      
      this.url = this.myJData.url;

      //alert("okk");
    
    this.get_MessageList();
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReadRequestedHpPage');
  }

   ionViewWillEnter() {

    this.platform.registerBackButtonAction(() => {                
         //navigator['app'].exitApp(); 
              //this.cancel(); 
              this.navCtrl.pop();                        
        });
      if(this.myJData.quietTimeStatus==true)
          {
             this.toolbar="quietmodecolor";
          }

}

    deleteAction(item) 
  {     
     let loading = this.load.create
    ({                
      content : 'Please wait'            
    });            
    let headers=new Headers({'Content-Type':'application/x-www-form-urlencoded'});
    loading.present();            
    let body = 'email='+this.MyJData.email + '&conversationIds='+ this.ConvIdList;            
    this.http.post(this.MyJData.url+'moveConversationToTrash.php',body,{headers:headers})            
    .map(res => res.text(),loading.dismiss())            
    .subscribe(data=> {          
                if(data.indexOf("Conversation Deleted")>0)   
                  {
                    let toast = this.toast.create({

                        message : "Conversations are moved to Trash",

                        duration : 3000,

                        });
                  }  
            
                  });            
                  this.viewCtrl.dismiss();  
                           
      } 

  getConvId(checked,convId,i)
  {
    this.setConvId[i]=!checked;
    if(this.setConvId[i]==true)
      {
        this.ConvIdList= this.ConvIdList + convId + ',';
      }
    else
      {
        var n = this.ConvIdList.includes(convId);
          if(n==true)
          {
            var myRegExp = new RegExp(convId,'g');
            this.ConvIdList=this.ConvIdList.replace(myRegExp , "");
            
          }
      }
      //alert(this.ConvIdList);
  }

    compose()
  {
    let m = this.mod.create(ComposePage);

      m.present();
  }

    convAction()
  {
    let m = this.mod.create(ConversationActionPage);

      m.present();
  }

    newEvent()
  {
    let m = this.mod.create(NewEventPage);

      m.present();
  }

  pleaseRead()
  {
    let m = this.mod.create(PleaseReadPage);

      m.present();
  }


  get_MessageList()
  {

     let loading = this.load.create({

          content : 'Please wait'

      });

      loading.present();


      let headers=new Headers({'Content-Type':'application/x-www-form-urlencoded'});

      let flag :boolean =false;
      let f: String="";
      let c : String="";

      
              let body = 'email='+this.myJData.email;

              console.log(body);

              this.http.post(this.myJData.url+'getAllHighPriorityMessages.php',body,{headers:headers})
              .map(res => res.json() )
              .subscribe(data=> {
              this.messageList = data;
              loading.dismiss();
                if(this.messageList.length==0)
                  {
                     let toast = this.toast.create({

          message : "No Mails For High Priority",

          duration : 3000,

      });

      toast.present();
                  }
              for(let i=0; i<this.messageList.length;i++)
                {
                  

                    let tempCategory; 
                    let category;
                    let lastItem;

                    if(this.messageList[i].CategoryLists !=undefined)
                    {
                      tempCategory=this.messageList[i].CategoryLists.split(',');                   
                    category = tempCategory.filter(function(elem, index, self) {
                        return index == self.indexOf(elem);
                        });


                    for(let i=0;i<category.length;i++)
                    {
                      if(category[i].trim().replace(/['"]+/g, ''))
                        {
                          
                          lastItem = category[i].trim().replace(/['"]+/g, '');
                          
                         
                        }
                    }
                    
                    //console.log("lastItem : " +lastItem);
                    
                    if(lastItem.toLowerCase().trim()=="urgent")
                      {
                        
                        this.iconArray[i]='megaphone';
                      }
                    else if(lastItem.toLowerCase().trim()=="important")
                      {
                        
                        this.iconArray[i]='information-circle';
                      }
                    else if(lastItem.toLowerCase().trim()=="action requested")
                      {
                        
                        this.iconArray[i]='create';
                      }
                    else if(lastItem.toLowerCase().trim()=="please read")
                      {
                        
                        this.iconArray[i]='eye';
                      }
                    else if(lastItem.toLowerCase().trim()=="following")
                      {
                        
                        this.iconArray[i]='heart';
                      } 
                }
                }
              });
      
  }

  openConversationList()
	{
    this.navCtrl.push(ConversationListPage,{categoryList:this.categoryList,folder:this.folder,icon :this.icon})
    .then(() => {
                              // first we find the index of the current view controller:
                              const index = this.viewCtrl.index;
                              // then we remove it from the navigation stack
                              this.navCtrl.remove(index);
                            });;
	}


}
