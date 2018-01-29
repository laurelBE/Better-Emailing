import { Component,ElementRef,ViewChild } from '@angular/core';
import { NavController, NavParams,ModalController,ViewController,ToastController,LoadingController,Content,Platform,AlertController } from 'ionic-angular';
import { NetDemoPage } from '../net-demo/net-demo';
import { MyJsonDataProvider } from '../../providers/my-json-data/my-json-data';
import { MessageActionPage } from '../message-action/message-action';
import { MessageDetailsPage } from '../message-details/message-details';
import { ConversationActionPage } from '../conversation-action/conversation-action';
import { TestPage } from '../test/test';
import { NewEventPage } from '../new-event/new-event';
import { ComposePage } from '../compose/compose';
import { ParticipationStatusPage } from '../participation-status/participation-status';
import { Http,Headers,RequestOptions } from '@angular/http';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { PopoverController } from 'ionic-angular';
import { ShowimagePage } from '../Showimage/Showimage';
import { InAppBrowser,InAppBrowserOptions } from '@ionic-native/in-app-browser';
import 'rxjs/add/operator/map';
/**
 * Generated class for the MaildetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-maildetail',
  templateUrl: 'maildetail.html',
})
export class MaildetailPage {

  @ViewChild(Content) content: Content;

  public messageList = [];

  dataDisplay : boolean =false;

  public showAll : string = "ios-arrow-down-outline";

  hitID : any; 

  public s : any = "text-wrap";
closestatus='1';
  MessageHandle : string;
  ConversationHandle : string;
  Subject : string;
categoryList;

  Show_Hide=[];

  extensionval;
  extension=[];

  category = [];
  categoryCount : number =0;
  categoryWidth : number = 0;

  totalCount=0;
  openCount=0;
  scrollEleId = 0;

  toIds=[];
  CCIds=[];
  statuses = [];
  quietModeStatuses = [];
  participantsList=[];
  addParticipantStatus=[];
  toolbar: String ="primary";

  public data : any;
 dataList;
  numbers2;
  numbers1;
numbers3;
  AttachmentNames;

  toCount=0;

  public overlayHidden: String = "";
  public overlayHidden1: String = "";

  public subjectColor: String = "#d2ddb3";
public subjectColor1: String = "#000000";
  options : InAppBrowserOptions = {
    location : 'yes',//Or 'no' 
    hidden : 'no', //Or  'yes'
    clearcache : 'yes',
    clearsessioncache : 'yes',
    zoom : 'yes',//Android only ,shows browser zoom controls 
    hardwareback : 'yes',
    mediaPlaybackRequiresUserAction : 'no',
    shouldPauseOnSuspend : 'no', //Android only 
    closebuttoncaption : 'Close', //iOS only
    disallowoverscroll : 'no', //iOS only 
    toolbar : 'yes', //iOS only 
    enableViewportScale : 'no', //iOS only 
    allowInlineMediaPlayback : 'no',//iOS only 
    presentationstyle : 'pagesheet',//iOS only 
    fullscreen : 'yes',//Windows only    
};

  constructor(public viewCtrl : ViewController,public toast: ToastController,public popoverCtrl: PopoverController,public alertCtrl:AlertController,private theInAppBrowser: InAppBrowser,private transfer: FileTransfer, private file: File, public platform: Platform, private elRef:ElementRef,public http:Http ,public load : LoadingController,public mod: ModalController,public navCtrl: NavController, public navParams: NavParams, public MyJData : MyJsonDataProvider,public modelCtrl: ModalController) {


    
                
		   this.platform.registerBackButtonAction(() => {                
         //navigator['app'].exitApp(); 
              this.cancel(); 
              //this.navCtrl.pop();                        
				});        
		

    this.Subject = this.navParams.get('Subject'); 
    this.MessageHandle = this.navParams.get('MessageHandle'); 
    this.ConversationHandle = this.navParams.get('ConversationHandle');
    this.categoryList=this.navParams.get('categoryList');

     this.getJDataD();
 this.getConversationStatus();
     window.setTimeout(() => {
     this.contentHeight();
    }, 1000); 

     //console.log("ConversationHandle : " + this.ConversationHandle);

     
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

  ngAfterViewInit() {

    /* this.platform.ready().then(() => {  

    this.contentHeight();
    }); */

    /* let element = document.getElementById(this.scrollEleId.toString());
    this.content.scrollTop(element.offset().top); */


   
  }

ionViewCanLeave()
{
   /* this.platform.ready().then(() => {  

    this.contentHeight();
    });  */ 

}


  ionViewDidLoad()
  {

    
     /*   this.platform.ready().then(() => {  

    this.contentHeight();
    });  */
  
                
		   this.platform.registerBackButtonAction(() => {                
         //navigator['app'].exitApp(); 
              this.cancel(); 
              //this.navCtrl.pop();                        
				});        
		 
      /* let sub=document.getElementById("subjectId");
      sub.click=function(){alert('hi javascript'); this.contentHeight();};  */
  }


  next()
  {
    this.navCtrl.push(NetDemoPage)
    .then(() => {
                              // first we find the index of the current view controller:
                              const index = this.viewCtrl.index;
                              // then we remove it from the navigation stack
                              this.navCtrl.remove(index);
                });
  }

  conversationAction(item)
  {
     /* this.overlayHidden = "my-overlay";
      this.overlayHidden1 = "my-overlay1";
      this.subjectColor="rgba(0,0,0,0.3)"; */

      let m = this.mod.create(ConversationActionPage,{item:item});

      m.present();

/*       m.onDidDismiss((data)=> {
        if(data.cancel=="true")
          {
            this.overlayHidden="";
            this.overlayHidden1="";
            this.subjectColor="#d2ddb3";
          }
      }); */
  }

  DoHere(id,event)
  {

      this.openCount=id+1;
      
      if(this.Show_Hide[id]=="Show All")
      {
        this.setShowAll();
        this.Show_Hide[id]="Hide";
          
      }
      else if(this.Show_Hide[id]=="Hide")
      {
           this.Show_Hide[id]="Show All";
      } 
  }


  getJDataD()
  {
      
       let loading = this.load.create({

          content : 'Please wait'

      });

      loading.present();


      let headers=new Headers({'Content-Type':'application/x-www-form-urlencoded'});

      let options=new RequestOptions({headers:headers});


       let body = 'MessageHandle='+this.MessageHandle + '&ConversationHandle=' + this.ConversationHandle + '&email=' + this.MyJData.email;

    
      this.http.post(this.MyJData.url + 'getMessageList.php',body,{headers:headers})
      .map(res => res.json())
      .subscribe(data=> {
        //console.log("In Maildetail :");
        console.log(data);
        this.messageList = data;
       this.setShowAll();

       this.totalCount=this.messageList.length;

      for(let i=0; i<this.messageList.length; i++)
        {
          this.statuses[i]=[];
          this.quietModeStatuses[i]=[];
          this.addParticipantStatus[i]=[];

         if(this.messageList[i].MessageHandle==this.MessageHandle)
          {
            this.Show_Hide[i]="Hide";
            this.openCount=i+1;
            this.scrollEleId=i;
 
          }

          //console.log("Ref 1 : " + this.messageList[i].Reference);

          let headers=new Headers({'Content-Type':'application/x-www-form-urlencoded'});

            let participants;
            
            let to = this.messageList[i].ToField.replace(/,/gi, ';');
             let cc = this.messageList[i].CCField.replace(/,/gi, ';');
            let from = this.messageList[i].FromField.replace(/,/gi, ';');
            if(from.trim().lastIndexOf(';') === (to.trim().length - 1))
            {
              participants=from.trim() + to.trim()+';'+cc.trim();
            }
          else
            {
              participants=from.trim() + ';' + to.trim()+';'+cc.trim();  
            }

            //console.log(participants); 

      
            let body = 'ConversationHandle=' + this.ConversationHandle +'&userEmail='+this.MyJData.email + '&participants='+participants;

            this.http.post(this.MyJData.url + 'senderchecklist.php',body,{headers:headers})
            .map(res => res.json())
            .subscribe(data=>{

              console.log(data);

            for(let j=0; j<data.length;j++)
              {
                this.statuses[i][j]=data[j].Status; 
                this.quietModeStatuses[i][j]=data[j].QuietTimeStatus;
                this.addParticipantStatus[i][j]=data[j].addParticipantStatus;
              }
            });
            
        }
        loading.dismiss();
        //console.log(this.addParticipantStatus);
        //this.contentHeight(); 
        },
      onerror=>{ alert('server error please try after some time')
          loading.dismiss();
           this.navCtrl.pop();
       } );
     
  }
      

  attachmentSplit(items)
  {
    items=items.replace(new RegExp('\"', 'g'), "");
    //alert(items);
    this.AttachmentNames= items.split(';');
 
    this.numbers2 = Array(this.AttachmentNames.length-1).fill(0).map((x,i)=>i);

    //console.log("AttachmentNames " + this.AttachmentNames);
    //console.log("numbers2 " + this.numbers2);

    return this.numbers2;
  }

  

  AttachmentDownload(attach)
  {
    //alert(attach);
    const fileTransfer: FileTransferObject = this.transfer.create();
    const url = "http://be3.cloudapp.net/PHP_1/" + attach;
    fileTransfer.download(url, this.file.externalRootDirectory + attach).then((entry) => {
      alert('download complete: ' + entry.toURL());
    }, (error) => {

      alert('Error : ' + JSON.stringify(error));
      // handle error
    });
     
  }

Viewpopup(attach)
  {
     this.extension=attach.split('.');
   // this.extension=Array();
   this.extensionval=this.extension[this.extension.length-1];
   if((this.extensionval=='jpg')||(this.extensionval=='png')||(this.extensionval=='jpeg'))
    {
     /*  alert('hi');
         this.fileOpener.open(this.MyJData.url + 'Newfolder/' + attach, 'application/pdf')
  .then(() => alert('File is opened'))
  .catch(e => alert(JSON.stringify(e)));  */
  let modals = this.popoverCtrl.create(ShowimagePage,{val: attach="http://be3.cloudapp.net/PHP_1/" + attach});
   modals.present();
 
   // }
    }
 else
    { 
     // alert('hello')
   let target = "_system";
    this.theInAppBrowser.create("http://be3.cloudapp.net/PHP_1/" + attach,target,this.options);
    }
  }

  setShowAll()
  {

    for(let i=0 ; i<this.messageList.length; i++)
      {
        
        this.Show_Hide[i]="Show All";
      } 

  }

  contentHeight()
  {
        //console.log("Got it");
        
        let yOffset = document.getElementById('topDiv'+this.scrollEleId.toString()).offsetTop;
        this.content.scrollTo(0, yOffset-50);

        //console.log(yOffset);

  }

  setCategory(categories)
  {

    console.log(categories);
       this.categoryCount=0;

       let tempCategory; 
       

       if(categories !=undefined)
       {
         tempCategory=categories.split(',');
       
      

      let category1 = tempCategory.filter(function(elem, index, self) {
          return index == self.indexOf(elem);
          });
      let j=0;
      for(let i=0;i<category1.length;i++)
        {
          //console.log(this.category[i].trim());
          if(category1[i].trim())
            {
              //console.log(category1[i].trim());
              this.category[j]=category1[i].trim();
              j++;
              this.categoryCount++;
            }
        }

        this.categoryWidth=100/this.categoryCount;

       }
        this.numbers1 = Array(this.categoryCount).fill(0).map((x,i)=>i);

        //console.log(this.category);

        if(this.category.length==0)
          {
            this.category=['ok'];
          }

        return this.category;

  }

  getToIds(to)
  {

    this.toIds= to.split(',');

    this.numbers2 = Array(this.toIds.length).fill(0).map((x,i)=>i);
this.numbers3=this.numbers2.length+1;
   // alert(this.numbers2);
    return this.numbers2;
    
  }

  getCCIds(cc)
  {
    this.CCIds= cc.split(',');

    this.numbers2 = Array(this.CCIds.length).fill(0).map((x,i)=>i);

    return this.numbers2;
    
  }


  getDetails(item )
  {

    this.navCtrl.push(MessageDetailsPage,{item : item})
  .then(() => {
                              // first we find the index of the current view controller:
                              const index = this.viewCtrl.index;
                              // then we remove it from the navigation stack
                              this.navCtrl.remove(index);
                            });;
     //console.log(item);
    this.data  = item;
  }


  respondAction(item,status)
  {

    //console.log(status);

   /*  this.overlayHidden = "my-overlay";
      this.overlayHidden1 = "my-overlay1";
      this.subjectColor="rgba(0,0,0,0.3)"; */
      if(this.closestatus=="1")
        {
     let m = this.modelCtrl.create(TestPage,{item: item,status: status,categoryList:this.categoryList});

    //console.log(this.messageList);

     m.present();
        }
    else
      {
        alert("conversation is closed");
      }
/*       m.onDidDismiss((data)=> {
        if(data.cancel=="true")
          {
            this.overlayHidden="";
            this.overlayHidden1="";
            this.subjectColor="#d2ddb3";
          }
      }); */
  }


  newEvent()
  {
    let m = this.mod.create(NewEventPage);

      m.present();
  }

    msgAction(item)
  {
     /*  this.overlayHidden = "my-overlay";
      this.overlayHidden1 = "my-overlay1";
      this.subjectColor="rgba(0,0,0,0.3)"; */
       if(this.closestatus=="1")
        {
      let m = this.mod.create(MessageActionPage,{item:item});
      m.present();
        }
    else
      {
        alert("Conversation is closed");
      }

/*       m.onDidDismiss((data)=> {
        if(data.cancel=="true")
          {
            this.overlayHidden="";
            this.overlayHidden1="";
            this.subjectColor="#d2ddb3";
          }
      }); */

  }


  compose()
  {
    let m = this.mod.create(ComposePage);

      m.present();
  }

    participationStatus()
  {
    let item={
      conversationHandle:this.ConversationHandle
    };                                
    let m = this.mod.create(ParticipationStatusPage,{item});             
    m.present();
  }

  cancel()
  {
    this.navCtrl.pop();
  }

deleteAction(item)
{         
  let loading = this.load.create 
                     ({                      
                       content : 'Please wait'               
                       });                
  let headers=new Headers({'Content-Type':'application/x-www-form-urlencoded'});    
  loading.present();                
  let body = 'email='+this.MyJData.email + '&messageHandle='+ item.MessageHandle;                
  this.http.post(this.MyJData.url+'moveMailToTrash.php',body,{headers:headers})                
  .map(res => res.text())                
  .subscribe(data=> {          
    loading.dismiss()            
    //alert(data)                                     
    let toast = this.toast.create 
                         ({                                      
                           message : data,                                        
                           duration : 3000,                                      
                          });                                    
                          toast.present();                                                         
                        });                              
                        this.viewCtrl.dismiss();                  
    }


  getConversationStatus()
  {
    let loading = this.load.create({

          content : 'Please wait'

      });

      loading.present();


      let headers=new Headers({'Content-Type':'application/x-www-form-urlencoded'});
      let body = 'ConversationHandle=' + this.MyJData.ConversationHandle + '&email=' + this.MyJData.email;
      this.http.post(this.MyJData.url+'getConversationStatus.php',body,{headers:headers})
      .map(res => res.json())
      .subscribe(data=> {
      this.dataList=data;
      loading.dismiss();
    //  alert(this.dataList[i].FolderName);
      //console.log("data");
      //console.log(data);
      for(let i=0; i<this.dataList.length;i++)
        {
           // alert(this.dataList[i].FolderName);
             if(this.dataList[i].FolderName=='!Low Priority\\Closed')
              {
                  this.closestatus="0";
              }
        }
      });
  }
}
