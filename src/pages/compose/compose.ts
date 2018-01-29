import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams,LoadingController,ModalController,ToastController,Platform,ViewController } from 'ionic-angular';
import { SenderChecklistPage } from '../sender-checklist/sender-checklist';
import { Http,RequestOptions,Headers } from '@angular/http';
import { MyJsonDataProvider } from '../../providers/my-json-data/my-json-data';
import { ConversationListPage } from '../conversation-list/conversation-list';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import 'rxjs/add/operator/map';

/**
 * Generated class for the ComposePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-compose',
  templateUrl: 'compose.html',
})
export class ComposePage {

    @ViewChild('myfile') my_file;

  public status: boolean = false;
  showAll : string;

  public responseAction : string='';

  public to : string = "";

  public cc : string = "";

  public bcc : string='';

  public body : string='';

  public subject : string='';

  public conversationHandle : string;
  public senderCHandle:string="";

  public handle : string='';

  public references : string='';

  public a=[];

  public toarray =[];

  public ccarray = [];

  public attachmentNames='';
  public progress=0;

  title : string;
  attachments :string="";

  public progressstr:string;
  public progressval=[];
  progfirst:string;

  quietStatusTimeList;
  arrAttach=[];

  toolbar: String ="primary";

  progressbarHide=true;

  currentAttachCount : number=0;

  @ViewChild('focusInput') myInput ;

  constructor(public viewCtrl : ViewController, public platform:Platform, public file: File, public load : LoadingController,public transfer:FileTransfer, public filePath: FilePath, private fileChooser: FileChooser, public myJData : MyJsonDataProvider, public toast: ToastController, public http: Http,public navCtrl: NavController, public navParams: NavParams, public mod:ModalController) {

   this.platform.ready().then(() => {            
		   this.platform.registerBackButtonAction(() => {                
         //navigator['app'].exitApp(); 
              this.closeModal(); 
              //this.navCtrl.pop();                        
				});        
		}); 
   
      
    this.showAll = "Show all";

    
  }

      ionViewWillEnter() {

    this.platform.registerBackButtonAction(() => {                
         //navigator['app'].exitApp(); 
              this.closeModal(); 
              //this.navCtrl.pop();                        
                });
            
                 if(this.myJData.quietTimeStatus==true)
          {
             this.toolbar="quietmodecolor";
          }

          this.readExternalEmailBox();
			  this.get_QuietTimeStatus();

}

 readExternalEmailBox()
  {

    let headers=new Headers({'Content-Type':'application/x-www-form-urlencoded'});

    console.log("Im called");
    console.log(this.myJData.email);

    let body = 'email='+this.myJData.email;

    this.http.post(this.myJData.url + 'TempReadEmails.php',body,{headers:headers})
      .map(res => res.json())
      .subscribe(data=>console.log(data));

  }

  get_QuietTimeStatus()
  {
      let headers=new Headers({'Content-Type':'application/x-www-form-urlencoded'});

      let options=new RequestOptions({headers:headers});

 let params = 'email='+this.myJData.email;
       let body = 'email='+this.myJData.email;

    
      this.http.post(this.myJData.url + 'getQuietTimeStatus.php',params,{headers:headers})
      .map(res => res.json())
      .subscribe(data => {
         this.quietStatusTimeList  =  data;
         // alert(this.quietStatusTimeList[0].Status);
          if(this.quietStatusTimeList[0].Status=="on")
            {
                      this.myJData.quietTimeStatus=true;
            }
      });
  }


  ionViewDidLoad() {

    console.log('ionViewDidLoad ComposePage');

    let module = this.navParams.get("Module");

    console.log("in compose ");
    console.log(this.navParams.get("item"));


    if(module == "Reply")
    {
        let item = this.navParams.get("item");

        /*
        this.a = item[0].Subject.split(":");

        console.log("A:" +this.a[this.a.length-1]);*/

        if(item.Subject.search("RE:") && item.Subject.search("Re:"))
        {
             this.subject = "RE: "+item.Subject;
        }
        else
        {
           this.subject = item.Subject;
        }

        this.to  = item.FromField + ";";

        console.log("reference : " + item.References);
   
        this.conversationHandle = item.MessageHandle;

        this.handle = item.ConversationHandle;

        this.senderCHandle=item.ConversationHandle;

        this.references=item.References;

        console.log("Ref : " + this.references);

        let b = this.tools_replaceAll(item.Body, "<br>", "\n"); 

        this.body  ="\n\n\n\n"+"On"+item.SentOnDate+" at "+item.SentOnTime+", <"+item.FromField+"> wrote: \n\n "+b;

   
        //this.body  ="\n\n\n\n"+"On"+item[0].SentOnDate+" at "+item[0].SentOnTime+", <"+item[0].FromField+"> wrote: \n\n "+item[0].Body;

        //document.getElementById('body1').nodeValue="<html><br><br>------------------------------<br>"+item[0].Body + "</html>";

        this.responseAction = "Reply";

        console.log("Reply"+this.handle);

        this.title="Reply";
    }
    else  if(module == "ReplyAll")
    {

      let item = this.navParams.get("item");
  //alert(item.ToField);

       console.log("new ToField is: "+item.ToField);
   
       //console.log(item);

       console.log("reference : " + item.References);

       this.references=item.References;

       console.log("Ref : " + this.references);

       if(item.FromField != '')
        {
            this.to  += item.FromField + "; ";
        }
 if(item.ToField.indexOf("undefined") != -1)
    {
      //  alert('hello');
            item.ToField=item.ToField.replace("undefined,","");
          
    }
      this.toarray = item.ToField.trim().split(",");

      console.log("this.to.length :" + this.to.length);
      console.log("this.toarray.length :" + this.toarray.length);

  
    if(this.toarray.length>0 || this.to.length>0 )
    {
        for(let j = 0; j < this.toarray.length; j++ )
      {
          if(this.toarray[j].trim().toLowerCase() != this.myJData.email.toLowerCase() && this.toarray[j].trim()!='' && this.to.indexOf(this.toarray[j].trim().toLowerCase()) < 0)
          {
           /*    for(let i=0;i<this.toarray.length;i++)
        {
          if(this.toarray[i]=="undefined")
            {
                alert('undefined here');
                
            }
        } */
              this.to += this.toarray[j].trim()+"; ";
          }
            
         console.log("this.to : " + this.to);
      }
    }
    else
    {
        let toast = this.toast.create({

              message : "All recipients from this conversation have withdrawn.",

                duration : 3000,

                });

              toast.present();
    }
      

      console.log("Now, ToField is: "+this.to);


       if(item.Subject.search("RE:") && item.Subject.search("Re:"))
       {
            this.subject = "RE: "+item.Subject;
       }
       else
       {
          this.subject = item.Subject;
       }

       console.log("CCField is "+item.CCField);


       this.ccarray = item.CCField.trim().split(",");

       for(let j =0; j < this.ccarray.length; j++)
       {
            if(this.ccarray[j].toLowerCase().trim() != this.myJData.email.toLowerCase() && this.ccarray[j].trim()!='' && this.cc.indexOf(this.ccarray[j].trim().toLowerCase()) < 0)
            {
                if(this.ccarray[j].toLowerCase().trim()!="")
                    {
                        this.cc += this.ccarray[j]+"; ";
                    }   
            }
       }

       console.log("Now, CCField is "+this.cc);

       this.conversationHandle = item.MessageHandle;

       console.log("item[0].MessageHandle : " +item.MessageHandle);

       this.handle = item.ConversationHandle;

       console.log("item[0].ConversationHandle : " +item.ConversationHandle);

       this.senderCHandle=this.handle;
  
      let b = this.tools_replaceAll(item.Body, "<br>", "\n"); 
  
       this.body  ="\n\n\n\n"+"On"+item.SentOnDate+" at "+item.SentOnTime+", <"+item.FromField+"> wrote: \n\n "+b;


       if(this.cc!="")
        {
            this.status = true;
        }


        this.title="Reply All";

        this.responseAction = "Reply All";

    }
    else if(module == "New Reply")
    {

        this.myJData.ConversationHandle=0;
          let item = this.navParams.get("item");

          this.to  = item.FromField+";";

          this.title="Reply";

          this.responseAction = "New Reply";
    }
    else if(module == "New Reply All")
    {

        this.myJData.ConversationHandle=0;
          
        let item = this.navParams.get("item");
        
        
        console.log("ToField is: "+item.ToField);
        
        
        
        if(item.FromField != '')
        {
            this.to  += item.FromField + "; ";
        }
        
        this.toarray = item.ToField.split(",");
        
          
        if(this.toarray.length>0 || this.to.length>0)
        {
            for(let j = 0; j < this.toarray.length; j++ )
        {
            if(this.toarray[j].trim().toLowerCase() != this.myJData.email.toLowerCase() && this.toarray[j].trim()!='' && this.to.indexOf(this.toarray[j].trim().toLowerCase()) < 0)
            {
                this.to += this.toarray[j].trim()+"; ";
            }
        }
        }
        else
        {
            let toast = this.toast.create({

                message : "All recipients from this conversation have withdrawn.",

                    duration : 3000,

                    });

                toast.present();
        }   

        console.log('new reply all');
        console.log(item);
               this.ccarray = item.CCField.split(",");
        
               for(let j =0; j < this.ccarray.length; j++)
               {
                    if(this.ccarray[j].toLowerCase().trim() != this.myJData.email.toLowerCase() && this.ccarray[j].trim()!='' && this.cc.indexOf(this.ccarray[j].trim().toLowerCase()) < 0)
                    {
                          this.cc += this.ccarray[j].trim()+"; ";
                    }
               }
        
          console.log("Now, CCField is "+this.cc);
               
        
        
               /*if(this.myJData.email == item[0].CCField)
               {
                 this.cc = item[0].ToField+";";            
               }
               else if(item[0].CCField != "" || item[0].CCField != null)
               {
                   this.cc = item[0].CCField+";";
               }*/
          
               this.conversationHandle = item.MessageHandle;
        
               this.handle = item.ConversationHandle;
               
          
              // this.body  ="\n\n\n\n"+"On"+item[0].SentOnDate+" at "+item[0].SentOnTime+", <"+item[0].FromField+"> wrote: \n\n "+item[0].Body;
        
        /*
               if(this.cc.length == 2)
               {
                   console.log("if block");
        
                    console.log(this.ccarray.length);
        
                    console.log(this.cc);
        
                   this.status = false;
        
                   //this.cc = null;

                   console.log(this.cc.length);
               }
               else 
               {
                  console.log("else block");
        
                  console.log(this.ccarray.length);
        
        
                  console.log(this.cc);

                  console.log(this.cc.length);
        
                  this.status = true;
               }
                
*/
                if(this.cc!="")
                {
                    this.status = true;
                }
                    
              this.title="Reply All";

              this.responseAction = "New Reply All";
    }
    else if(module =="Forward")
    {

        this.myJData.ConversationHandle=0;
        let item = this.navParams.get("item");
      
        this.subject = "Fwd: "+item.Subject;

        let b = this.tools_replaceAll(item.Body, "<br>", "\n"); 
  
       this.body  ="\n\n\n\n"+"On"+item.SentOnDate+" at "+item.SentOnTime+", <"+item.FromField+"> wrote: \n\n "+b;


        this.body = "\n\n\n---------- Forwarded message ----------\n\n"+ this.body;

        this.title="Forward";

        this.responseAction = "Forward";
      

    }
    else if(module == ""  || module == null)    {
        this.responseAction = "Compose";

        console.log(this.responseAction);

        this.title="Compose";
        this.myJData.ConversationHandle=0;
    }

    
  }

  closeModal()
  {
    this.navCtrl.pop();
  }

  ShowAll()
  {

      this.status = !this.status;

      if(this.status == true)
        {
            this.showAll = "Hide";
        }
        else{
          this.showAll = "Show all";
        }
  }


  change(id) {
    // get elements
    var element   = document.getElementById(id);
    var textarea  = element.getElementsByTagName('textarea')[0];

    // set default style for textarea
    textarea.style.minHeight  = '10';
    textarea.style.height     = '10';

    // limit size to 96 pixels (6 lines of text)
    var scroll_height = textarea.scrollHeight;
    /* if(scroll_height > 96)
      scroll_height = 96; */

    // apply new style
    element.style.height      = scroll_height + "px";
    textarea.style.minHeight  = scroll_height + "px";
    textarea.style.height     = scroll_height + "px";
    }


  change1(id) {
    // get elements
    var element   = document.getElementById(id);
    var textarea  = element.getElementsByTagName('textarea')[0];

    // set default style for textarea
    textarea.style.minHeight  = '10';
    textarea.style.height     = '10';

    // limit size to 96 pixels (6 lines of text)
    var scroll_height = textarea.scrollHeight;
     if(scroll_height > 32)
      scroll_height = 32; 

    // apply new style
    element.style.height      = scroll_height + "px";
    textarea.style.minHeight  = scroll_height + "px";
    textarea.style.height     = scroll_height + "px";
    }

    validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
    }




  senderCheckList(toEmail : string,cc : string,bcc : string,subject : string, body : string)
  {
        let ok=false;
        toEmail=toEmail + ';';
        cc=cc + ';';
        bcc=bcc + ';';
        let toEmail1=toEmail;
        let cc1=cc ;
        let bcc1=bcc;
        toEmail=toEmail.replace(/,/gi, ';');
        cc=cc.replace(/,/gi, ';');
        bcc=bcc.replace(/,/gi, ';');

          toEmail=toEmail.replace(/ /gi, ';');
        cc=cc.replace(/ /gi, ';');
        bcc=bcc.replace(/ /gi, ';');

        let emails = toEmail.split(';');
        let emails1 = cc.split(';');
        let emails2 = bcc.split(';');

        let invalidEmails = [];
        let invalidEmails1 = [];
        let invalidEmails2 = [];
        let validEmails = [];
        let validEmails1 = [];
        let validEmails2 = [];

        for (let i = 0; i < emails.length; i++) { 
            if(!this.validateEmail(emails[i].trim()) && emails[i].trim()!='') {
            invalidEmails.push(emails[i].trim())
            }
            if(this.validateEmail(emails[i].trim()) && emails[i].trim()!='') {
            validEmails.push(emails[i].trim())
            }
        }

        for (let i = 0; i < emails1.length; i++) { 
            if(!this.validateEmail(emails1[i].trim()) && emails1[i].trim()!='') {
            invalidEmails1.push(emails1[i].trim())
            }
            if(this.validateEmail(emails1[i].trim()) && emails1[i].trim()!='') {
            validEmails1.push(emails1[i].trim())
            }
        }
 
        for (let i = 0; i < emails2.length; i++) { 
            if(!this.validateEmail(emails2[i].trim()) && emails2[i].trim()!='') {
            invalidEmails2.push(emails2[i].trim())
            }
            if(this.validateEmail(emails2[i].trim()) && emails2[i].trim()!='') {
            validEmails2.push(emails2[i].trim())
            }
        }
 
       // alert("Invalid To : " + invalidEmails.length);
         //alert("Invalid CC : " + cc + invalidEmails1.length);
          //alert("Invalid bcc : " + invalidEmails2.length)
 
    
         
         if(invalidEmails.length!=0)
        {
            let toast = this.toast.create({

              message : "To list must contain valid email addresses.",

                duration : 3000,

                });

              toast.present();
        }
        else if(invalidEmails1.length!=0)
        {
            let toast = this.toast.create({

              message : "CC list must contain valid email addresses.",

                duration : 3000,

                });

              toast.present();
        }
        else if(invalidEmails2.length!=0)
        {
            let toast = this.toast.create({

              message : "BCC list must contain valid email addresses.",

                duration : 3000,

                });

              toast.present();
        }
        else if((validEmails.length !=0 && toEmail!="") || (validEmails1.length !=0 && cc !="") || (validEmails2.length !=0 && bcc !=""))
        {
                ok=true;
                if((body != "" && body != null) || (subject != "" && subject != null))
                {
                    ok=true;
                }
                else
                    {
                        ok=false;
                        let toast = this.toast.create({

                    message : "Subject is required",

                        duration : 3000,

                        });

                    toast.present();
                    }
        }
        else
        {
            
                let toast = this.toast.create({

                    message : "Sender Email is required",

                        duration : 3000,

                        });

                    toast.present();
           
        }
                

        if(((validEmails.length !=0 && toEmail!="") || (validEmails1.length !=0 && cc !="")) && ok==true)
        {
           //alert("OKK");
            let item={conversationHandle:this.senderCHandle, to:toEmail,cc:cc,bcc:bcc,subject:subject,body:body,handle:this.handle,attachmentNames:this.attachmentNames,responseAction:this.responseAction};
                
                let m = this.mod.create(SenderChecklistPage,{item});

                m.present();
        }
        else if(ok==true)
        {
            
            this.sendEmail(toEmail1,cc1,bcc1,subject, body);
        }
        

    }

  sendEmail(toEmail : string,cc : string,bcc : string,subject : string, body : string)
  {

        let ok=false;
        toEmail=toEmail + ';';
        cc=cc + ';';
        bcc=bcc + ';';

        
        let emails = toEmail.split(';');
        let emails1 = cc.split(';');
        let emails2 = bcc.split(';');

        let invalidEmails = [];
        let invalidEmails1 = [];
        let invalidEmails2 = [];
        let validEmails = [];
        let validEmails1 = [];
        let validEmails2 = [];

        

        for (let i = 0; i < emails.length; i++) { 
            if(!this.validateEmail(emails[i].trim())) {
            invalidEmails.push(emails[i].trim())
            }
            if(this.validateEmail(emails[i].trim()) && emails[i].trim()!='') {
            validEmails.push(emails[i].trim())
            }
        }

        for (let i = 0; i < emails1.length; i++) { 
            if(!this.validateEmail(emails1[i].trim())) {
            invalidEmails1.push(emails1[i].trim())
            }
            if(this.validateEmail(emails1[i].trim()) && emails1[i].trim()!='') {
            validEmails1.push(emails1[i].trim())
            }
        }
 
        for (let i = 0; i < emails2.length; i++) { 
            if(!this.validateEmail(emails2[i].trim())) {
            invalidEmails2.push(emails2[i].trim())
            }
            if(this.validateEmail(emails2[i].trim()) && emails2[i].trim()!='') {
            validEmails2.push(emails2[i].trim())
            }
        }

        //alert("Invalid To : " + invalidEmails.length);
       // alert("Invalid CC : " + cc + invalidEmails1.length);
        //alert("Invalid bcc : " + invalidEmails2.length)

        if(invalidEmails.length!=0)
            {
            let toast = this.toast.create({

              message : "To list must contain valid email addresses.",

                duration : 3000,

                });

              toast.present();
        }
        else if(invalidEmails1.length!=0)
        {
            let toast = this.toast.create({

              message : "CC list must contain valid email addresses.",

                duration : 3000,

                });

              toast.present();
        }
        else if(invalidEmails2.length!=0)
        {
            let toast = this.toast.create({

              message : "BCC list must contain valid email addresses.",

                duration : 3000,

                });

              toast.present();
        }
        else if(((validEmails.length !=0 && toEmail!="") || (validEmails1.length !=0 && cc !="") || (validEmails2.length !=0 && bcc !=""))&& ok)
        {
                ok=true;
                if((body != "" && body != null) || (subject != "" && subject != null))
                {
                    ok=true;
                }
                else
                    {
                        ok=false;
                        let toast = this.toast.create({

                    message : "Subject is required",

                        duration : 3000,

                        });

                    toast.present();
                    }
        }
        else
        {
            let toast = this.toast.create({

              message : " Sender Email is required",

                duration : 3000,

                });

              toast.present();


        }

        if(ok==true)
        {
           

            toEmail=toEmail.replace(/,/gi, ';');
            cc=cc.replace(/,/gi, ';');
            bcc=bcc.replace(/,/gi, ';');

            console.log("toEmail : " + toEmail);

            let headers = new Headers({
                'Content-Type': 'application/x-www-form-urlencoded'
            });
            let options = new RequestOptions({
                headers: headers
            });
            
        let params = 'fromemail='+this.myJData.email +'&toemail='+toEmail+'&subject='+subject+'&body='+body+'&cc='+cc+'&bcc='+bcc+'&responseAction='+this.responseAction
        +'&conversationHandle='+this.conversationHandle+'&handle='+this.handle + "&attachments="+ this.attachmentNames+ "&references="+ this.references;


       // alert(params);
    
        this.http.post(this.myJData.url+"SendEmail_G.php",params,{headers:headers})
        .map(res=> res.text())
        .subscribe(data=>{
                    let toast = this.toast.create({

                        message : data,

                        duration : 3000,

                    });

                    toast.present();

                    //console.log(data);
                    });
        


        

        this.navCtrl.pop();

        this.navCtrl.push(ConversationListPage,{categoryList: 'Inbox',folder:'Inbox',icon : 'ios-mail'}).then(() => {
                              // first we find the index of the current view controller:
                              const index = this.viewCtrl.index;
                              // then we remove it from the navigation stack
                              this.navCtrl.remove(index);
                            });;

        
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
                                    alert("Uploaded");

                                                    
                                        
                                        //alert(this.arrAttach);
                                        this.currentAttachCount +=1;

                                         this.progressbarHide=true;

                                        //alert(this.currentAttachCount);
                                }, (err) => {
                                    alert("E:"+JSON.stringify(err));
                                }); 
                            })
            .catch(err => console.log(err)))
            .catch(e => console.log(e)); 

            
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

        tools_replaceAll(str, find, replace) 
        {
            return str.replace(new RegExp(find, 'g'), replace);
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

        getAttachments()
        {
            //alert(this.arrAttach.length);
             let numbers = Array(this.arrAttach.length).fill(0).map((x,i)=>i);

            return numbers; 
        }

}
