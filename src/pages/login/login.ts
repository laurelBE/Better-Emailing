import { Component } from '@angular/core';
import { NavController, NavParams,ModalController,LoadingController,Platform,ToastController,ViewController} from 'ionic-angular';
import { HomePage } from '../home/home';
import { HighPriorityPage } from '../high-priority/high-priority';
import { MyJsonDataProvider } from '../../providers/my-json-data/my-json-data';
import { Http,Headers,RequestOptions } from '@angular/http';
import { GooglePlus } from '@ionic-native/google-plus';
import { NativeStorage } from '@ionic-native/native-storage';
import moment from 'moment';
import { DemoiPage } from '../demoi/demoi';
import { Network } from '@ionic-native/network';
/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  mailIdList =[];

  EmailTextColor : String ="#ff0000";

  toolbar: String ="primary";

  quietStatusTimeList;

  internetConn : boolean=true;

  constructor(public network : Network, public nativeStorage : NativeStorage,private viewCtrl: ViewController, public googlePlus :GooglePlus, public toast: ToastController,public platform:Platform, public load : LoadingController, public myJData : MyJsonDataProvider,public http:Http , public navCtrl: NavController, public navParams: NavParams) {
  
  
     this.myJData.quietTimeStatus=false;

    this.platform.ready().then(() => {            
		   this.platform.registerBackButtonAction(() => {                
			   navigator['app'].exitApp();                            
				});        
    });

 
      //let tz=moment.format();
     console.log(moment().format());

  }

    
  displayNetworkUpdate(connectionState: string){
    let networkType = this.network.type;
    this.toast.create({
      message: `You are now ${connectionState}`,
      duration: 3000
    }).present();

    if(connectionState=='on')
      {
        alert("Okk");
      }
  }

      ionViewWillEnter() {

    this.platform.registerBackButtonAction(() => {                
         navigator['app'].exitApp(); 
              //this.cancel(); 
              //this.navCtrl.pop();                        
        });
            
         if(this.myJData.quietTimeStatus==true)
          {
             this.toolbar="quietmodecolor";
          }

 

}

  ionViewDidLoad() {

     this.platform.ready().then(() => {            
		   this.platform.registerBackButtonAction(() => {                
			   navigator['app'].exitApp();                            
				});        
    });
  

      console.log("value changed");

    this.myJData.retreiveMails= true;
  }

  OpenHome(EmailId)
  {

    

    if(EmailId == "" || EmailId == null)
        {
             let toast = this.toast.create({

              message : "Email Address is required",

                duration : 3000,

                });

              toast.present();
        }
     else
         {
            this.checkForEmailId(EmailId);            
        }

    
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

         this.navCtrl.push(HighPriorityPage)
                          .then(() => {
                              // first we find the index of the current view controller:
                              const index = this.viewCtrl.index;
                              // then we remove it from the navigation stack
                              this.navCtrl.remove(index);
                            });

         // alert(this.quietStatusTimeList[0].Status);
          if(this.quietStatusTimeList[0].Status=="on")
            {
                      this.myJData.quietTimeStatus=true;
            }
      });
  }

changeEmailIdColor(EmailId)
{
  var patt = /[a-zA-Z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,3}$/;
  if(patt.test(EmailId))
     this.EmailTextColor = "#000000";

}

  checkForEmailId(EmailId)
  {
     
    this.network.onDisconnect().subscribe(data => {
      console.log(data);
     
      this.displayNetworkUpdate(data.type);
    }, error => console.error(error));

    this.network.onConnect().subscribe(data => {
      console.log(data);
      
      this.displayNetworkUpdate(data.type);
    }, error => console.error(error));
   
  
        let loading = this.load.create({

            content : 'Please wait'

          });

          loading.present();

          let headers=new Headers({'Content-Type':'application/x-www-form-urlencoded'});

          let eventStartTime=new Date().toISOString();
          eventStartTime=moment(eventStartTime).format("YYYY-MM-DDTHH:mm:ssZ");

          let body = 'email='+ EmailId + '&date=' + eventStartTime;

          this.http.post(this.myJData.url +'getEmailIdForLogin.php',body,{headers:headers})
          .map(res => res.json() )
          .subscribe(data=> {
          this.mailIdList = data;

          console.log(this.mailIdList);
          loading.dismiss();


          let IsUser : boolean=false;

           for(let i=0; i<this.mailIdList.length;i++)
                      {
                        
                        if(this.mailIdList[i].UserEmail.toLowerCase()==EmailId.toLowerCase())
                          {
                            IsUser= true;
                          }
                      }
                       

                    if(IsUser)
                      {
                        this.myJData.email = EmailId; 
                        //this.readExternalEmailBox();
                        this.get_QuietTimeStatus()

                        

    let headers=new Headers({'Content-Type':'application/x-www-form-urlencoded'});

    console.log("Im called");
    console.log(this.myJData.email);

    let body = 'email='+this.myJData.email;
/* 
    this.http.post(this.myJData.url + 'TempReadEmails.php',body,{headers:headers})
      .map(res => res.json())
      .subscribe(data=>{
                          loading.dismiss();
                          this.navCtrl.push(HighPriorityPage)
                          .then(() => {
                              // first we find the index of the current view controller:
                              const index = this.viewCtrl.index;
                              // then we remove it from the navigation stack
                              this.navCtrl.remove(index);
                            });});
                            */
                        
                      }
                      else
                        {
                          //loading.dismiss();
                              let toast = this.toast.create({

                              message : "Email address not registered.",

                                duration : 3000,

                                });

                              toast.present();
                        }

          }); 
                      
                         
  }   

  readExternalEmailBox()
  {

    let loading = this.load.create({

          content : 'Please wait'

      });

      loading.present();

    let headers=new Headers({'Content-Type':'application/x-www-form-urlencoded'});

    console.log("Im called");
    console.log(this.myJData.email);

    let body = 'email='+this.myJData.email;

    this.http.post(this.myJData.url + 'TempReadEmails.php',body,{headers:headers})
      .map(res => res.json())
      .subscribe(data=>{
                          loading.dismiss();
                          this.navCtrl.push(HighPriorityPage)
                          .then(() => {
                              // first we find the index of the current view controller:
                              const index = this.viewCtrl.index;
                              // then we remove it from the navigation stack
                              this.navCtrl.remove(index);
                            });});

  }

/*   checkForEmailId(email){
 
    this.googlePlus.login({
    'webClientId': '783529130940-l110fvh2tgc25oppkc5le5js0rqe39ih.apps.googleusercontent.com',
    'offline': true
  }).then( res => console.log(res))
    .catch(err => console.error(err)); */
   /* let nav = this.navCtrl;
	let env = this;
  let loading = this.load.create({
    content: 'Please wait...'
  });
  loading.present();
  this.googlePlus.login({
    'scopes': '', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
    'webClientId': '783529130940-lc58lob1tqa444j2r1tv0p97cumn109r.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
    'offline': true
  })
  .then(function (user) {
    loading.dismiss();

    env.nativeStorage.setItem('user', {
      name: user.displayName,
      email: user.email,
      picture: user.imageUrl
    })
    .then(function(){
      nav.push(HighPriorityPage);
    }, function (error) {
      console.log(error);
    })
  }, function (error) {
    loading.dismiss();
  });

   GooglePlus.login({
          'webClientId': ''
        }).then((res) => {
            console.log(res);
        }, (err) => {
            console.log(err);
        }); 
   }  

   */     

}
