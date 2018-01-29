import { Component } from '@angular/core';
import { NavController, ToastController,ViewController,NavParams,ModalController,Platform,LoadingController} from 'ionic-angular';
import { NewEventAlertPage } from '../new-event-alert/new-event-alert';
import { ComposePage } from '../compose/compose';
import { Http,Headers } from '@angular/http';
import { MyJsonDataProvider } from '../../providers/my-json-data/my-json-data';
import { InAppBrowser,InAppBrowserOptions,InAppBrowserEvent } from '@ionic-native/in-app-browser';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import { File } from '@ionic-native/file';
import { CalendarPage } from '../calendar/calendar';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import moment from 'moment';
/**
 * Generated class for the NewEventPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-new-event',
  templateUrl: 'new-event.html',
})
export class NewEventPage {

  
  allDay;
  minEventEndTime;
  minEventStartTime;
  eventEndTime;
  eventStartTime;
  subject;
  attachments :string="";
  public attachmentNames='';
  arrAttach=[];
  currentAttachCount : number=0;

  public progressstr:string;
  public progressval=[];
  progfirst:string;
  public progress=0;

  progressbarHide=true;

  toolbar: String ="primary";

  constructor(public platform: Platform, public file: File,public transfer:FileTransfer,public filePath: FilePath, private fileChooser: FileChooser, public load : LoadingController,public inAppBrowser: InAppBrowser,public toast: ToastController,public viewCtrl : ViewController, public myJData : MyJsonDataProvider,public http : Http, public navCtrl: NavController, public navParams: NavParams,public mod: ModalController) {
 
 this.platform.ready().then(() => {            
		   this.platform.registerBackButtonAction(() => {                
         //navigator['app'].exitApp(); 
              this.cancel1(); 
              //this.navCtrl.pop();                        
				});        
        });
            
        this.eventStartTime=new Date().toISOString();
        //this.eventStartTime=
  // this.endDate=new Date().toISOString;
   this.eventEndTime=new Date().toISOString();

   

  //alert(moment(this.eventStartTime).format("YYYY-MM-DD HH:mm:ss"));
  //alert(this.eventStartTime);

  this.eventStartTime=moment(this.eventStartTime).format("YYYY-MM-DDTHH:mm:ssZ");
 this.eventEndTime=moment(this.eventEndTime).format("YYYY-MM-DDTHH:mm:ssZ");
 this.minEventEndTime=this.eventEndTime;
  this.minEventStartTime=this.eventStartTime;

  //alert(this.eventStartTime);
  }

  

        ionViewWillEnter() {

    this.platform.registerBackButtonAction(() => {                
         //navigator['app'].exitApp(); 
              this.cancel1(); 
              //this.navCtrl.pop();                        
        });
            
        if(this.myJData.quietTimeStatus==true)
          {
             this.toolbar="quietmodecolor";
          }

}

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewEventPage');

    this.allDay=false;
  }

  cancel1(){

 //   this.navCtrl.pop();
   this.navCtrl.push(CalendarPage)
                          .then(() => {
                              // first we find the index of the current view controller:
                              const index = this.viewCtrl.index;
                              // then we remove it from the navigation stack
                              this.navCtrl.remove(index);
                            });
 
  }
  alertpages()
  {
     let m = this.mod.create(NewEventAlertPage);

		m.present();
  }


  sent(eventStartTime,eventEndTime,invitiees,location,subject,description)
  {
    alert("eventStartTime: " + this.eventStartTime + " eventEndTime: " +this.eventEndTime);

    if(this.eventStartTime>this.eventEndTime)
        {
          let toast = this.toast.create({

                              message : 'End time must be greater than start time',

                              duration : 3000,

                          });

                          toast.present();
          
        }
                        else
                            {
    var blank_reg_exp = /^([\s]{0,}[^\s]{1,}[\s]{0,}){1,}$/,
		error = 0,
    parameters;

     var element = <HTMLInputElement> document.getElementById("allDayEvent");
    var allDayChecked = element.checked;

    let eventType = "FIXED-TIME";
    if(allDayChecked)
      {
        eventType = "ALL-DAY";
      }

    if(!blank_reg_exp.test(this.subject))
    {
		  error = 1;
  	}


    let title="Its Working";
    /* let start_time=  eventType == 'FIXED-TIME' ? this.eventStartTime : 'null';
    let end_time= eventType == 'FIXED-TIME' ? this.eventEndTime : 'null';
    let event_date= eventType == 'ALL-DAY' ? new Date() : 'null'; */
    let allday= eventType == 'ALL-DAY' ? 1 : 0;

    let start_time=  eventType == 'FIXED-TIME' ? '12-12-2017T12:12:00' : 'null';
    let end_time= eventType == 'FIXED-TIME' ? '12-12-2017T16:12:00' : 'null';
    let event_date= eventType == 'FIXED-TIME' ? '12-12-2017' : 'null';
  
  parameters = 'title='+ title +'&start_time=' + start_time + '&end_time=' + end_time + '&event_date=' + event_date + '&all_day=' + allday;
     let loading = this.load.create({

                content : 'Please wait'

            });

          

            let headers=new Headers({'Content-Type':'application/x-www-form-urlencoded'});

            loading.present();

            eventStartTime=new Date(eventStartTime).toISOString();
            eventEndTime=new Date(eventEndTime).toISOString();
            
            let body = 'email='+this.myJData.email + '&attendee='+ invitiees + '&startDate=' + eventStartTime+ '&endDate=' + eventEndTime+ '&location=' + location+'&subject='+subject + '&description=' + description+ "&attachments="+ this.attachmentNames;
            //alert(body + '        ' + this.eventStartTime );
            this.http.post(this.myJData.url+'sendMeetingInvite.php',body,{headers:headers})
            .map(res => res.text(),loading.dismiss())
            .subscribe(data=>{this.viewCtrl.dismiss();
              //alert(data);
                              let toast = this.toast.create({

                              message : data,

                                duration : 3000,

                                });

                              toast.present();
                            });
                        
var ref = window.open('http://be3.cloudapp.net/bephp/insertEvent.php?location=' + location+'&subject='+subject+ '&startDate=' + eventStartTime+ '&endDate=' + eventEndTime, '_self', 'location=no');           
var checkevent:boolean=true;          
ref.addEventListener('loadstop', function(event: InAppBrowserEvent) 
{       
    if(event.url.toString().includes("?location="))    
        {        
            checkevent=true;   
            alert('event added');         
        //  ref.close();    
        }  
    if(event.url.toString().includes("?code="))    
        {             
            checkevent=false;      
           // ref.close();   // var ref1 = window.open('http://be3.cloudapp.net/BE_PHP_1_LT/insertEvent.php?location=' + location+'&subject='+subject+ '&startDate=' + eventStartTime+ '&endDate=' + eventEndTime, '_self', 'location=no');  //this.newsent();
        } 
        
    if(checkevent==false)    
        {                       
            var ref1 = window.open('http://be3.cloudapp.net/bephp/insertEvent.php?location=' + location+'&subject='+subject+ '&startDate=' + eventStartTime+ '&endDate=' + eventEndTime, '_self', 'location=no');         
            ref1.addEventListener('loadstop', function(event: InAppBrowserEvent) 
            {      
                if(event.url.toString().includes("?location="))    
                    {        
                        alert('event added now');       
                    //s    ref1.close();    
                    }          
            });       
        }

});
                            } 
  }

  
        CallAttach()
        {
            
             this.fileChooser.open()
            .then(uri => this.filePath.resolveNativePath(uri)
            .then(filePath =>{this.attachments =filePath;

                const fileTransfer: FileTransferObject = this.transfer.create();

                let options1: FileUploadOptions = {
                            fileKey: 'ionicfile',
                            fileName: this.attachments.substr(this.attachments.lastIndexOf('/') + 1),
                            chunkedMode: false,
                            headers: {}
                            }

                this.attachmentNames=this.attachmentNames + this.attachments.substr(this.attachments.lastIndexOf('/') + 1) + ";";

                this.arrAttach.push(this.attachments.substr(this.attachments.lastIndexOf('/') + 1));

                //alert(this.attachmentNames);
                this.progress=0;
                
                this.progressbarHide=false;

                fileTransfer.onProgress(progressEvent => {
                                if (progressEvent.lengthComputable) {
                                    //alert((progressEvent.loaded / progressEvent.total)*100); 
                                    this.progress=(progressEvent.loaded / progressEvent.total) * 100;  
                                    this.progressstr=this.progress.toString();
                                    this.progressval=this.progressstr.split("."); 
                                    this.progfirst=this.progressval[0];
                                } else {
                                }
                            });
                
                fileTransfer.upload(this.attachments,encodeURI(this.myJData.url + 'attachment.php'),options1)
                                    .then((data) => {
                                    this.presentToast("File Uploaded Successfully.");

                                                    
                                        
                                        //alert(this.arrAttach);
                                        this.currentAttachCount +=1;

                                         this.progressbarHide=true;

                                        //alert(this.currentAttachCount);
                                }, (err) => {
                                    this.presentToast("E:"+JSON.stringify(err));
                                }); 
                            })
            .catch(err => console.log(err)))
            .catch(e => console.log(e)); 

            
        }

   funAllDayEvent()
  {
    /* var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var value = idAttr.nodeValue; */

    this.allDay=!this.allDay;
  } 

  DeleteFile(attach)
        {
            let temp=[];
            this.http.get(this.myJData.url + 'DeleteFileTest.php?file=' + attach)
            .map(res => res.text())
            .subscribe(data=>this.presentToast(data));;
            for(let i=0;i<this.arrAttach.length;i++)
            {
                if(this.arrAttach[i]!=attach)
                {
                    temp.push(this.arrAttach[i]);
                }

            }
            this.arrAttach=temp;
            this.currentAttachCount-=1;
        }

        presentToast(msg) 
        {
            let toast = this.toast.create({
                message: msg,
                duration: 3000,
                position: 'bottom'
            });

            toast.onDidDismiss(() => {
                console.log('Dismissed toast');
            });

            toast.present();
        }

        getAttachments()
        {
            //alert(this.arrAttach.length);
             let numbers = Array(this.arrAttach.length).fill(0).map((x,i)=>i);

            return numbers; 
        }

}
