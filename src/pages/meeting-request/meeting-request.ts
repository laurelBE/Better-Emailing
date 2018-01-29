import { Component } from '@angular/core';
import { NavController, NavParams, ModalController,Platform,LoadingController,PopoverController } from 'ionic-angular';
import { MettingRespondPage } from '../metting-respond/metting-respond';
import { Http,Headers,RequestOptions } from '@angular/http';
import { MyJsonDataProvider } from '../../providers/my-json-data/my-json-data';
import { ShowimagePage } from '../Showimage/Showimage';
import { InAppBrowser,InAppBrowserOptions } from '@ionic-native/in-app-browser';
/**
 * Generated class for the MeetingRequestPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-meeting-request',
  templateUrl: 'meeting-request.html',
})
export class MeetingRequestPage {

   MettingStartDate = {

  };
  MettingEndDate = {
    
  }

  item;
  startDateTime ='';
  endDateTime ='';
  location='';
  from='';
  subject='';
  description='';
  attachments='';

  AttachmentNames;
  numbers2;
  extension;
  extensionval;
  options

  toolbar: String ="primary";

  constructor(public popoverCtrl:PopoverController,private theInAppBrowser: InAppBrowser, public platform:Platform, public load : LoadingController, public myJData : MyJsonDataProvider,public http:Http , public mod: ModalController, public navCtrl: NavController, public navParams: NavParams) {
  
    this.platform.ready().then(() => {            
		   this.platform.registerBackButtonAction(() => {                
         //navigator['app'].exitApp(); 
              this.close(); 
              //this.navCtrl.pop();                        
				});        
    });
      
    this.item = this.navParams.get('item');
    console.log(this.item);

    this.getEventDetails();
  
  }

      ionViewWillEnter() {

    this.platform.registerBackButtonAction(() => {                
         //navigator['app'].exitApp(); 
              this.close(); 
              //this.navCtrl.pop();                        
        });
            
        if(this.myJData.quietTimeStatus==true)
          {
             this.toolbar="quietmodecolor";
          }

}

  ionViewDidLoad() {
    console.log('ionViewDidLoad MeetingRequestPage');
  }
close(){
  //alert("Okk");
    this.navCtrl.pop();
  }
  
  
  mettingRespond()
  {
    let m=this.mod.create(MettingRespondPage,{startDateTime: this.startDateTime,endDateTime:this.endDateTime,location:this.location,subject:this.subject});
    m.present();
  }

  getEventDetails()
  {

    let loading = this.load.create 
                     ({                      
                       content : 'Please wait'               
                       });    
    loading.present();

    let attachArr=this.item.Attachments.split(';');
    let icsFile='';

    console.log(attachArr);

    for(let i=0; i<attachArr.length; i++)
    {
      if(attachArr[i].indexOf('.ics')>0)
        {
          icsFile=attachArr[i].trim();
        }
    }

    let headers=new Headers({'Content-Type':'application/x-www-form-urlencoded'});



    let body = 'fileName='+this.item.MessageHandle + '-'+icsFile;
    console.log(body);
            this.http.post(this.myJData.url+'readICS.php',body,{headers:headers})
            .map(res => res.json())
            .subscribe(data=> {

            console.log(data);

            let sdate = data[0].startDate;
            let startDate=sdate.split("T");
            let tempYr=startDate[0].split("-");
            let tempDate=parseInt(tempYr[2]);
            let tempMonth=parseInt(tempYr[1]);
            let tempYear=parseInt(tempYr[0]);

            let tempTm=startDate[1].split(".");
            let tempDt=tempTm[0].split(":");
            let tempHour=parseInt(tempDt[0]);
            let tempMinute=parseInt(tempDt[1]);
            let tempSec=parseInt(tempDt[2]);



              this.startDateTime=data[0].startDate;
              this.endDateTime=data[0].endDate;
              this.location=data[0].location;
              this.from=this.item.SenderEmail;
              this.subject=data[0].summary;
              this.description=data[0].description;
              //this.attachments=this.item.attachments;

              this.attachments='';

              let att=this.item.Attachments.split(';');

              for(let i=0;i<att.length;i++)
                {
                   if(att[i].indexOf('.ics')<0)
                    {
                      this.attachments=this.attachments + att[i];
                    }
                }
             

              loading.dismiss();
              //let t=new Date(tmpStartDate);

              //console.log(tmpStartDate.toISOString());

              console.log(data);


            }/*,onerror=>{ alert('server error please try after some time')
          loading.dismiss();
           this.navCtrl.pop();
         }*/);
  }

    attachmentSplit(items)
  {
    
    this.AttachmentNames= items.split(';');
    

    this.numbers2 = Array(this.AttachmentNames.length).fill(0).map((x,i)=>i);

    console.log("AttachmentNames " + this.AttachmentNames);
    console.log("numbers2 " + this.numbers2);

    return this.numbers2;
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
  let modals = this.popoverCtrl.create(ShowimagePage,{val: attach=this.myJData.url + 'Newfolder/' + attach});
   modals.present();
 
   // }
    }
 else
    { 
     // alert('hello')
   let target = "_system";
    this.theInAppBrowser.create(this.myJData.url + 'Newfolder/' + attach,target,this.options);
    }
  }
}
