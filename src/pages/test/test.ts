import { Component } from '@angular/core';
import { NavController, NavParams,ViewController,ModalController,Platform} from 'ionic-angular';
import { ComposePage } from '../compose/compose';
import { Http,Headers,RequestOptions } from '@angular/http';
import { MyJsonDataProvider } from '../../providers/my-json-data/my-json-data';
import { MaildetailPage } from '../maildetail/maildetail';

/**
 * Generated class for the TestPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-test',
  templateUrl: 'test.html',
})
export class TestPage {

 

  public conversationHandle : string;

  public data : any;

  statuses = [];
 ToAdd="";
 CCAdd="";
  item;
  status;
  toolbar: String ="primary";
categoryList;
  quietStatusTimeList =[];

  constructor(public platform : Platform,public MyJData : MyJsonDataProvider,public http:Http ,public navCtrl: NavController, public navParams: NavParams,public viewCtrl : ViewController,public modelCtrl: ModalController) {
  
    this.platform.ready().then(() => {            
		   this.platform.registerBackButtonAction(() => {                
         //navigator['app'].exitApp(); 
              this.cancel(); 
              //this.navCtrl.pop();                        
				});        
		});
  
  
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

           this.get_QuietTimeStatus();

}

  ionViewDidLoad() {
    console.log('ionViewDidLoad TestPage');

    this.item = this.navParams.get("item");
     this.status = this.navParams.get("status");
     this.categoryList=this.navParams.get("categoryList");
    // alert(this.categoryList);
     console.log(this.status);

   this.data=this.item;
  }
  back(){
    this.navCtrl.pop();
  }
  cancel()
  {
   /*  const data= {cancel:"true"};
      this.viewCtrl.dismiss(data); */
      this.viewCtrl.dismiss();
      //this.navCtrl.setRoot(MaildetailPage);  
  }
  compose()
  {
    this.viewCtrl.dismiss();
      let modal = this.modelCtrl.create(ComposePage);

      modal.present();
  }


  reply()
  {
      this.viewCtrl.dismiss();
        this.navCtrl.push(ComposePage,{item :this.data,"Module":"Reply"});

        console.log(this.data);
  }

   replyAll()
  {

if(this.categoryList=='Action Requested')    
        {    
              let headers=new Headers({'Content-Type':'application/x-www-form-urlencoded'});  
                  let options=new RequestOptions({headers:headers});    
                     let body =  'ConversationHandle=' + this.item.ConversationHandle + '&userEmail=' + this.item.FromField;       //alert(FinalTo + ', ' + From);      
                         this.http.post(this.MyJData.url + 'getNotificationParticipantsAddresses.php',body,{headers:headers})      .map(res => res.json())      .subscribe(data=> {       
                              for(let i=0;i<data.length;i++)          
                                  {           
                                  //  alert(data[i].ToField);
                                       this.ToAdd=data[i].ToField;  
                                 //       alert(data[i].CCField);     
                                              this.CCAdd=data[i].CCField;      
                                                  }   
                                             });   
                                              
                                            } 
    let item1;
    let tempTo,To,From,tempCC;
    
    let headers=new Headers({'Content-Type':'application/x-www-form-urlencoded'});

      let options=new RequestOptions({headers:headers});

      

       let body =  'ConversationHandle=' + this.item.ConversationHandle + '&ToField=' + this.item.ToField + ', ' + this.item.FromField+', '+this.item.CCField;
    //alert(body);
      this.http.post(this.MyJData.url + 'getAdditionalParticipants.php',body,{headers:headers})
      .map(res => res.json())
      .subscribe(data=> {

        //alert(data[0].participantsAddresses);

        
        console.log("ToField : " + this.item.ToField);
         console.log("CC : " + this.item.CCField);
       //  console.log("status : " + this.status);
        console.log(data[0].participantsAddresses);
        console.log(data);

        if(this.status[0]==15 || this.status[0]==14)
      {
        From='';
      }
    else
      {
        From=this.item.FromField;
      }

    let Tto=[];
    let Cc=[];

    console.log("this.item.ToField :" + this.item.ToField);
    if(this.item.ToField !=undefined)
       {
        //  alert(this.item.ToField);
   //     this.item.ToField="laureltech2020@gmail.com,laureltech2017@gmail.com";
         tempTo=this.item.ToField.split(',');
         tempCC=this.item.CCField.split(',');
        // alert(tempCC);
         To= tempTo.filter(function(elem, index, self) {
          return index == self.indexOf(elem);
          });

      
      let k=0;
      for(let i=0;i<To.length;i++)
        {
          if(To[i].trim())
            {
              Tto[k]=To[i];
              k++;
            }
        }


         let kc=0;
      for(let i=0;i<tempCC.length;i++)
        {
          if(tempCC[i].trim())
            {
              Cc[kc]=tempCC[i];
              kc++;
            }
        }

       }
    let FinalTo='';
    let FinalCC='';
    let temp=0;
   
    for(let i=1; i<this.status.length;i++)
    {
      
      if(this.status[i]==15 || this.status[i]==14)
      {
      }
      else
      {
        //console.log("FinalTo : " + FinalTo);
        if(temp==0)
        {
          FinalTo += String(Tto[i-1]);
        
          temp=1;
        }
        else
        {
          FinalTo += ',' + String(Tto[i-1]);
        }
        
      }
    }

 for(let i=Tto.length+1; i<this.status.length;i++)
    {
      for(let j=0;j<Cc.length;j++)
        {
     // alert(i)
      if(this.status[i]==15 || this.status[i]==14)
      {
      }
      else
      {
        //console.log("FinalTo : " + FinalTo);
       /// alert(Cc[j]);
         if(temp==0)
        {
          FinalCC += String(Cc[j]);
        
          temp=1;
        }
        else
        {
          FinalCC += ',' + String(Cc[j]);
        } 
        
      }
        }
    }
 
    
   if(this.categoryList=='Action Requested')    
        {  
    FinalTo=FinalTo+ ', '+data[0].participantsAddresses+','+this.ToAdd;
        }
  else{
    FinalTo=FinalTo+ ', '+data[0].participantsAddresses;
  }




  if(this.categoryList=='Action Requested')    
        {  
    FinalCC=FinalCC+','+this.CCAdd;
        }
  else{
    FinalCC=FinalCC;
  }
   // alert(FinalCC);
   
    item1={
              MessageHandle:this.item.MessageHandle,
              ConversationHandle:this.item.ConversationHandle,
              FromField:From,
              Subject:this.item.Subject,
              BodyTeaser:this.item.BodyTeaser,
              ToField:FinalTo,
           // ToField:this.item.ToField,
             // CCField:this.item.CCField,
             CCField:FinalCC,
              Body:this.item.Body,
              AttachmentCount:this.item.AttachmentCount,
              Attachments:this.item.Attachments,
              SentOnDate:this.item.SentOnDate,
              SentOnTime:this.item.SentOnTime,
              CategoryLists:this.item.CategoryLists,
              References:this.item.References
    }

    console.log(item1);



    this.data=item1;

    this.viewCtrl.dismiss();
    this.navCtrl.push(ComposePage,{item :this.data,"Module":"ReplyAll"});

 
    });
  }


  forward()
  {
      this.viewCtrl.dismiss();
      this.navCtrl.push(ComposePage,{item :this.data,"Module":"Forward"});

      console.log(this.data);      
  }

  NewReply()
  {
    this.viewCtrl.dismiss();
      this.navCtrl.push(ComposePage,{item :this.data,"Module":"New Reply"});

        console.log(this.data);
  }

  NewReplyAll()
  {

    let item1;
    let tempTo,To,From;
    
if(this.categoryList=='Action Requested')    
        {    
              let headers=new Headers({'Content-Type':'application/x-www-form-urlencoded'});  
                  let options=new RequestOptions({headers:headers});    
                     let body =  'ConversationHandle=' + this.item.ConversationHandle + '&userEmail=' + this.item.FromField;       //alert(FinalTo + ', ' + From);      
                         this.http.post(this.MyJData.url + 'getNotificationParticipantsAddresses.php',body,{headers:headers})      .map(res => res.json())      .subscribe(data=> {       
                              for(let i=0;i<data.length;i++)          
                                  {           
                                  //  alert(data[i].ToField);
                                       this.ToAdd=data[i].ToField;  
                                 //       alert(data[i].CCField);     
                                              this.CCAdd=data[i].CCField;      
                                                  }   
                                             });   
                                              
                                            } 
    if(this.status[0]==15 || this.status[0]==14)
      {
        From='';
      }
    else
      {
        From=this.item.FromField;
      }

    let Tto=[];


    console.log("this.item.ToField :" + this.item.ToField);
    if(this.item.ToField !=undefined)
       {
         tempTo=this.item.ToField.split(',');
         To= tempTo.filter(function(elem, index, self) {
          return index == self.indexOf(elem);
          });

      
      let k=0;
      for(let i=0;i<To.length;i++)
        {
          if(To[i].trim())
            {
              Tto[k]=To[i];
              k++;
            }
        }

       }
    let FinalTo='';
    let FinalCC='';
    let temp=0;

    for(let i=1; i<this.status.length;i++)
    {
      
      if(this.status[i]==15 || this.status[i]==14)
      {
      }
      else
      {
        console.log("FinalTo : " + FinalTo);
        if(temp==0)
        {
          FinalTo += String(Tto[i-1]);
          temp=1;
        }
        else
        {
          FinalTo += ',' + String(Tto[i-1]);
        }
        
      }
    }

    let headers=new Headers({'Content-Type':'application/x-www-form-urlencoded'});

      let options=new RequestOptions({headers:headers});


       let body =  'ConversationHandle=' + this.item.ConversationHandle + '&ToField=' + FinalTo + ', ' + this.item.FromField;

       //alert(FinalTo + ', ' + From);
    
      this.http.post(this.MyJData.url + 'getAdditionalParticipants.php',body,{headers:headers})
      .map(res => res.json())
      .subscribe(data=> {

     if(this.categoryList=='Action Requested')    
        {  
    FinalTo=FinalTo+ ', '+data[0].participantsAddresses+','+this.ToAdd;
        }
  else{
    FinalTo=FinalTo+ ', '+data[0].participantsAddresses;
  }




  if(this.categoryList=='Action Requested')    
        {  
    FinalCC=FinalCC+ ', '+this.CCAdd;
        }
  else{
    FinalCC=FinalCC;
  }

        //alert(FinalTo);

        item1={
              MessageHandle:this.item.MessageHandle,
              ConversationHandle:this.item.ConversationHandle,
              FromField:From,
              Subject:this.item.Subject,
              BodyTeaser:this.item.BodyTeaser,
           //   ToField:FinalTo,
           ToField:FinalTo,
              CCField:this.item.CCField,
              Body:this.item.Body,
              AttachmentCount:this.item.AttachmentCount,
              Attachments:this.item.Attachments,
              SentOnDate:this.item.SentOnDate,
              SentOnTime:this.item.SentOnTime,
              CategoryLists:this.item.CategoryLists,
              
    }
    

    this.data=item1;
    console.log('this.data');
    console.log(this.data);

    this.viewCtrl.dismiss();
        this.navCtrl.push(ComposePage,{item :this.data,"Module":"New Reply All"});

        console.log(this.data);
      
      });

    
  }

  get_QuietTimeStatus()
  {

   // alert("okk");

   
      let headers=new Headers({'Content-Type':'application/x-www-form-urlencoded'});

      let options=new RequestOptions({headers:headers});

 let params = 'email='+this.MyJData.email;
       let body = 'email='+this.MyJData.email;

    
      this.http.post(this.MyJData.url + 'getQuietTimeStatus.php',params,{headers:headers})
      .map(res => res.json())
      .subscribe(data => {
         this.quietStatusTimeList  =  data;
         //alert(this.quietStatusTimeList[0].Status);
          if(this.quietStatusTimeList[0].Status=="on")
            {
                      this.MyJData.quietTimeStatus=true;
                      this.toolbar="quietmodecolor";
            }
                    
      });
  }

}
