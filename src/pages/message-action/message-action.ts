import { Component, Renderer } from '@angular/core';
import { NavController, NavParams, ViewController,LoadingController,ToastController,Platform} from 'ionic-angular';
import { SchedulePage } from '../schedule/schedule';
import { MaildetailPage } from '../maildetail/maildetail';
import { MyJsonDataProvider } from '../../providers/my-json-data/my-json-data';
import { Http,Headers,RequestOptions } from '@angular/http';
import { ConversationListPage } from '../conversation-list/conversation-list';
/**
 * Generated class for the MessageActionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-message-action',
  templateUrl: 'message-action.html',
})
export class MessageActionPage {

  overlayHidden: boolean = false;
  urgent:boolean=false;
  important:boolean=false;
  actionstring;
  categories=[];
  MessageHandle;
  todo;
  folder;
  setCategory=true;
  setUrgent=false;
  removestring;
  setImportant=false;
  checkvalueurgent:string="";
  toolbar: String ="primary";
  item1;

  constructor(public platform:Platform,public MyJData : MyJsonDataProvider,public toast: ToastController, public http:Http ,public load : LoadingController,public navCtrl: NavController, public renderer: Renderer, public navParams: NavParams, public viewCtrl : ViewController) {
  //this.renderer.setElementClass(viewCtrl.pageRef().nativeElement, 'sample-modal-page', true);
  

  this.platform.ready().then(() => {            
		   this.platform.registerBackButtonAction(() => {                
         //navigator['app'].exitApp(); 
              this.cancel(); 
              //this.navCtrl.pop();                        
				});        
		});


let item = this.navParams.get("item");
this.item1 = this.navParams.get("item");

this.MessageHandle=item.MessageHandle;
this.categories=item.CategoryLists.trim().split(',');

for(let i=0;i<this.categories.length;i++)
  {
   // alert(this.categories[i]);
    if(this.categories[i].trim()=="Urgent")
      {
    //    alert('its urgent')
        this.setUrgent=true;
        this.setCategory=false;
      }
       if(this.categories[i].trim()=="Important")
      {
        this.setImportant=true;
           this.setCategory=false;
     //   alert('its Imporatant')
      }  
  }

//alert(this.MessageHandle);
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
    console.log('ionViewDidLoad MessageActionPage');
  }

  open()
  {
     console.log("ok");
  }

    cancel()
  {
     const data= {cancel:"true"};
      this.viewCtrl.dismiss(data);
     // this.navCtrl.setRoot(MaildetailPage);  
  }

  scheduleAction()
  {
    this.viewCtrl.dismiss();
    this.navCtrl.push(SchedulePage,{item:this.item1});
  }
 urgentAction()
 {
if(this.urgent==false)
  {
    this.urgent=true;
  //  this.actionstring=this.actionstring+"urgent";
  }
  else
    {
this.urgent=false;

    }
 console.log(this.urgent);
//alert(this.urgent);
 }

 todoAction(event)
 {
     this.todo=event.target.value;
   //  alert(this.tinytask);
 }
 importantAction()
 {
if(this.important==false)
  {
    this.important=true;
  }
  else
    {
this.important=false;

    }
console.log(this.important);
//alert(this.important);
         //  this.navCtrl.push(ConversationListPage,{categoryList: 'Inbox',folder:'Inbox',icon : 'ios-mail'});

 }
        SendActions()
        {
          console.log("working");
          //alert(this.setCategory);
          //alert("this.urgent :" +this.urgent);
          //alert("this.important :" +this.important);
          if(this.todo=="Done" || this.todo=="Tiny Task")
            {
              if(this.todo=="Done")
                {
                   this.folder="done"
                }
                     else{
                     this.folder="Tiny Tasks"
                     this.todo=""
                  }
               let loading = this.load.create({

                content : 'Please wait'

            });
               let headers=new Headers({'Content-Type':'application/x-www-form-urlencoded'});

            loading.present();
          
            let body = 'email='+this.MyJData.email + '&messageHandle='+ this.MessageHandle+'&category='+this.todo+'&folder='+this.folder;
  console.log(body);
            this.http.post(this.MyJData.url+'setToDoAction.php',body,{headers:headers})
            .map(res => res.text(),loading.dismiss())
            .subscribe(data=> {

          //alert(data)

          //if(data=="Successful")
           // {
              let toast = this.toast.create({

              message : data,

                duration : 3000,

                });

              toast.present();
           // }
        });

            this.viewCtrl.dismiss();
            this.navCtrl.push(ConversationListPage,{categoryList: 'Inbox',folder:'Inbox',icon : 'ios-mail'})
            .then(() => {
                              // first we find the index of the current view controller:
                              const index = this.viewCtrl.index;
                              // then we remove it from the navigation stack
                              this.navCtrl.remove(index);
                            });;
              
            
            }
         console.log("(this.urgent==true)||(this.important==true) : " + (this.urgent==true)||(this.important==true));
        if(this.setCategory==true)
          {
         if((this.urgent==true)||(this.important==true))
            { 
           //   alert(this.urgent);
               if((this.urgent==true) && (this.important==true))
                {
              this.actionstring="Urgent,Important";
              //alert(this.actionstring);
                }
            else if(this.urgent==true)
              {
                  this.actionstring="Urgent";
                   //alert(this.actionstring);
                                }
                                else{
                  this.actionstring="Important";
                  //alert(this.actionstring);
              }
              let loading = this.load.create({

                content : 'Please wait'

            });

          //alert(this.actionstring);
 //alert(this.MyJData.email);
 // alert(this.MessageHandle);
            let headers=new Headers({'Content-Type':'application/x-www-form-urlencoded'});

            loading.present();
            let body = 'email='+this.MyJData.email + '&messageHandle='+ this.MessageHandle+'&category='+this.actionstring;

            this.http.post(this.MyJData.url+'SetCategories.php',body,{headers:headers})
            .map(res => res.text(),loading.dismiss())
            .subscribe(data=> {

          //alert(data)

        //  if(data=="Successful")
         //   {
           //alert(data);
              let toast = this.toast.create({

              message : data,

                duration : 3000,

                });

              toast.present();
          //  }
        });

            this.viewCtrl.dismiss();
            this.navCtrl.push(ConversationListPage,{categoryList: 'Inbox',folder:'Inbox',icon : 'ios-mail'})
            .then(() => {
                              // first we find the index of the current view controller:
                              const index = this.viewCtrl.index;
                              // then we remove it from the navigation stack
                              this.navCtrl.remove(index);
                            });;
              
            }
          }

            if(this.setCategory==false)
              {
                //RemoveCategories.php
                if((this.urgent==false)||(this.important==false))
                  {
                         if((this.urgent==false) && (this.important==false))
                {
              this.removestring="Urgent,Important";
              //alert(this.actionstring);
                }
            else if(this.urgent==true)
              {
                 this.removestring="Urgent";
              }
              else{
                    this.removestring="Important";
              }
  let loading = this.load.create({

                content : 'Please wait'

            });
               //alert(this.removestring);
                let headers=new Headers({'Content-Type':'application/x-www-form-urlencoded'});

            loading.present();
            let body = 'email='+this.MyJData.email + '&messageHandle='+ this.MessageHandle+'&category='+this.removestring;

            this.http.post(this.MyJData.url+'RemoveCategories.php',body,{headers:headers})
            .map(res => res.text(),loading.dismiss())
            .subscribe(data=> {

          //alert(data);
           
          if(data=="Successful")
            {
              let toast = this.toast.create({

              message : "Updated",

                duration : 3000,

                });

              toast.present();
            }
        });

            this.viewCtrl.dismiss();
            this.navCtrl.push(ConversationListPage,{categoryList: 'Inbox',folder:'Inbox',icon : 'ios-mail'})
            .then(() => {
                              // first we find the index of the current view controller:
                              const index = this.viewCtrl.index;
                              // then we remove it from the navigation stack
                              this.navCtrl.remove(index);
                            });;
            
                  }
              } 
        }

      public hideOverlay() 
      {
          this.overlayHidden = true;
      }
}
