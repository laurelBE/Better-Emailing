import { Component,ViewChild } from '@angular/core';
import { LoadingController,ModalController,Platform,Content,ViewController,ToastController } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { PleaseReadPage } from '../please-read/please-read';
import { InboxPage } from '../inbox/inbox';
import { StartQuietTimePage } from '../start-quiet-time/start-quiet-time';
import { ToolsPage } from '../tools/tools';
import { NewEventPage } from '../new-event/new-event';
import { ComposePage } from '../compose/compose';
import { MenuMailPage } from '../menu-mail/menu-mail';
import { CalendarPage } from '../calendar/calendar';
import { SearchPage } from '../search/search';
import { MyJsonDataProvider } from '../../providers/my-json-data/my-json-data';
import { Http,Headers,RequestOptions } from '@angular/http';
import { ConversationListPage } from '../conversation-list/conversation-list';
import 'rxjs/add/operator/map';
import { HighPriorityPage } from '../high-priority/high-priority';
import { TrashMailsPage } from '../trash-mails/trash-mails';
import { ToDoPage } from '../to-do/to-do';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	@ViewChild(Content) content: Content;

  	public folder : String  = "High Priority";

	dataList = [];
	delegatedDataList = [];

	 public overlayHidden: String = "";

	 HPUnreadCount=0;
	    quietStatusTimeList =[];
  setQuiet=false;
	totalcount1=0;
	totalunreadCount=0;
	todototalcount=0;
	todounreadCount=0;
toolbar: String ="primary";

	HighPriority : string = "ios-arrow-up-outline";

	Todo : string = "ios-arrow-down-outline";

	LowPriority : string = "ios-arrow-down-outline";

	delegatedIcon : string = "ios-arrow-down-outline";

	standardIcon : string = "ios-arrow-down-outline";

	

	 //categoryList = ['Inbox','Inbox','Inbox','Inbox','Inbox','Inbox','!Do List\\Tiny Tasks','!Do List\\Done','!Do List\\Scheduled','!Low Priority\\Sideline','!Low Priority\\Withdraw','!Low Priority\\Closed','!Low Priority\\Redirect','!Delegated','Standard Folders'];

	folders = ['High Priority\\Urgent','High Priority\\Important','High Priority\\Action Requested','High Priority\\Please Read','High Priority\\Following','Inbox','!Do List\\Tiny Tasks','!Do List\\Done','!Do List\\Scheduled','!Low Priority\\Sideline','!Low Priority\\Withdraw','!Low Priority\\Closed','!Low Priority\\Redirect','!Low Priority\\cc','Standard Folders\\Sent','Standard Folders\\Draft','Standard Folders\\Junk','Standard Folders\\Trash'];

   constructor(public toast : ToastController,public viewCtrl :ViewController, public platform:Platform, public http: Http,public myJData : MyJsonDataProvider, public loadingCtrl: LoadingController, public navCtrl : NavController,public mod: ModalController) {
	    this.platform.ready().then(() => {            
		   this.platform.registerBackButtonAction(() => {                
			   navigator['app'].exitApp();                            
				});        
		}); 

  if(this.myJData.quietTimeStatus==true)
          {
             this.toolbar="quietmodecolor";
          }
		
		
    }

	public buttonClicked: boolean = true;
	
	public todo: boolean = false;
	
	public low: boolean = false;

	public delegate : boolean = false;

	public standard : boolean = false;

	public hidden : boolean = false;

	
	 presentLoading() {
    this.loadingCtrl.create({
      content: 'Please wait...',
      duration: 3000,
      dismissOnPageChange: true
	}).present();

	
	
	//this.navCtrl.setRoot(this.navCtrl.getActive().component);
	
  }


      ionViewWillEnter() {
 //this.get_QuietTimeStatus();
    this.platform.registerBackButtonAction(() => {                
         navigator['app'].exitApp(); 
              //this.cancel(); 
              //this.navCtrl.pop();                        
				});

			  this.readExternalEmailBox();
			 	this.get_QuietTimeStatus();
			//this.navCtrl.setRoot(this.navCtrl.getActive().component);

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

  ionViewDidEnter()
  {
	  //alert(this.myJData.quietTimeStatus);
  }

  
  ionViewDidLoad() 
  {
	  
	  //alert(this.myJData.quietTimeStatus);

/* 	let loading = this.loadingCtrl.create({

            content : 'Please wait'

          });

          loading.present(); */
	
	for(let i=0; i<this.folders.length; i++ )
		{

			
			
			this.get_FolderListCount(this.folders[i]).subscribe(data => {this.dataList[i] = data;
		//alert(this.dataList[i][0].totalCount);
		//this.valuelist[]=this.dataList;
		if(i<5)
			{
				this.totalcount1=this.totalcount1+parseInt(this.dataList[i][0].totalCount);
				this.totalunreadCount=this.totalunreadCount+parseInt(this.dataList[i][0].unreadCount);
			}
		//alert(this.totalcount);
		if( 5<i)
			{
				if(i<9)
					{
						this.todototalcount=this.todototalcount+parseInt(this.dataList[i][0].totalCount);
				this.todounreadCount=this.todounreadCount+parseInt(this.dataList[i][0].unreadCount);
					}
			}
			}
		);

		}

	this.getDelegated().subscribe(data => {this.delegatedDataList = data;
	//loading.dismiss()
});

  }
  
  
  public onButtonClick() 
  {

        this.buttonClicked = !this.buttonClicked;
		
		if(this.HighPriority == "ios-arrow-up-outline")
		{
			this.HighPriority = "ios-arrow-down-outline"
		}
		else if(this.HighPriority == "ios-arrow-down-outline")
		{
			this.HighPriority = "ios-arrow-up-outline"
			let yOffset = document.getElementById("highPriority").offsetTop;
        	this.content.scrollTo(0, yOffset-50);
		}

		

	}
	

	quotesAction()
    {
      if(this.myJData.quietTimeStatus==true)
        {
          this.myJData.quietTimeStatus=false;
          this.offQuietMode();
        }
        else{
          this.myJData.quietTimeStatus=true;
          
        }
    }

   offQuietMode() 
   {
     //alert('quiet')
        let headers=new Headers({'Content-Type':'application/x-www-form-urlencoded'});

      let options=new RequestOptions({headers:headers});

 let params = 'email='+this.myJData.email;
       let body = 'email='+this.myJData.email;

    
      this.http.post(this.myJData.url + 'offQuietTime.php',params,{headers:headers})
      .map(res => res.text())
      .subscribe(data => {
     //    this.quietStatusTimeList  =  data;
          let toast = this.toast.create({

                              message : data,

                                duration : 3000,

                                });

                              toast.present();
							}); 
							this.navCtrl.setRoot(HomePage);   
     
   }
  
	
	gotoPlease()
	{
		this.navCtrl.push(PleaseReadPage)
		.then(() => {
                              // first we find the index of the current view controller:
                              const index = this.viewCtrl.index;
                              // then we remove it from the navigation stack
                              this.navCtrl.remove(index);
                            });
		
	}
	
	
	onTodoClick()
	{
		 this.todo = !this.todo;

		 if(this.Todo == "ios-arrow-up-outline")
		{
			this.Todo = "ios-arrow-down-outline"
			
		}
		else if(this.Todo == "ios-arrow-down-outline")
		{
			this.Todo = "ios-arrow-up-outline"
			let yOffset = document.getElementById("ToDo").offsetTop;
        	this.content.scrollTo(0, yOffset-50);
		}

		
	}
	
	onDelegateClick()
	{
		this.delegate = !this.delegate;

		 if(this.delegatedIcon == "ios-arrow-down-outline")
		{
			this.delegatedIcon = "ios-arrow-up-outline"
			let yOffset = document.getElementById("Delegate").offsetTop;
        	this.content.scrollTo(0, yOffset-50);
		}
		else if(this.delegatedIcon == "ios-arrow-up-outline")
		{
			this.delegatedIcon = "ios-arrow-down-outline"
		}
		
	}

	onLowClick()
	{
		this.low = !this.low;

		if(this.LowPriority == "ios-arrow-down-outline")
		{
			this.LowPriority = "ios-arrow-up-outline"
		}
		else if(this.LowPriority == "ios-arrow-up-outline")
		{
			this.LowPriority = "ios-arrow-down-outline"
		}
		let yOffset = document.getElementById("LowPriority").offsetTop;
        this.content.scrollTo(0, yOffset-50);
	}

	onStandardClick()
	{
			this.standard = !this.standard;

			if(this.standardIcon == "ios-arrow-down-outline")
			{
				this.standardIcon = "ios-arrow-up-outline"
				let yOffset = document.getElementById("StandardFolder").offsetTop;
        		this.content.scrollTo(0, yOffset-50);
			}
			else if(this.standardIcon == "ios-arrow-up-outline")
			{
				this.standardIcon = "ios-arrow-down-outline"
			}
			
	}
	
	expand()
	{
		this.buttonClicked = true;
		this.todo =true;
		this.low =true;
		this.standard=true;
		this.delegate=true;

		this.HighPriority = "ios-arrow-up-outline";
		this.Todo = "ios-arrow-up-outline";
		this.delegatedIcon = "ios-arrow-up-outline";
		this.LowPriority = "ios-arrow-up-outline";
		this.standardIcon = "ios-arrow-up-outline";

	}


	
	collapse()
	{
		this.buttonClicked = false;
		this.todo =false;
		this.low =false;
		this.standard=false;
		this.delegate=false;

		this.HighPriority = "ios-arrow-down-outline";
		this.Todo = "ios-arrow-down-outline";
		this.delegatedIcon = "ios-arrow-down-outline";
		this.LowPriority = "ios-arrow-down-outline";
		this.standardIcon = "ios-arrow-down-outline";
	}
	
	
	openInbox(openInbox)
	{
		this.navCtrl.push(InboxPage);
	}

	startQuietTime()
	{
		if(this.myJData.quietTimeStatus==true)
        {
          this.myJData.quietTimeStatus=false;
          this.offQuietMode();
        }
        else{
          
		  //this.navCtrl.push(StartQuietTimePage);
		  
		  let m = this.mod.create(StartQuietTimePage);

		m.present();
        }
		
	
	}

	newevent()
	{
		 this.navCtrl.push(NewEventPage);
		 
	}

	compose()
	{
        let m = this.mod.create(ComposePage);

		m.present();
	}
	openTools()
	{
		///this.navCtrl.push(ToolsPage);
		this.overlayHidden = "my-overlay";
		this.hidden=false;
		let m = this.mod.create(ToolsPage);

		m.present();
		m.onDidDismiss((data)=> {
        if(data.cancel=="true")
          {
            this.overlayHidden="";
          }
      });
	}

	OpenHighPriorityList()
	{
		this.navCtrl.push(HighPriorityPage).then(() => {
                              // first we find the index of the current view controller:
                              const index = this.viewCtrl.index;
                              // then we remove it from the navigation stack
                              this.navCtrl.remove(index);
                            });
	}
	

	openMailList()
	{

		let m = this.mod.create(MenuMailPage);

		m.present();
	}

	calc(){
		this.navCtrl.push(CalendarPage);
	}
	
	searchPage()
	{
	this.navCtrl.push(SearchPage);
	}

	openConversationList(categoryList,folder,icon)
	{
		
		this.navCtrl.push(ConversationListPage,{categoryList: categoryList,folder:folder,icon : icon})
		.then(() => {
                              // first we find the index of the current view controller:
                              const index = this.viewCtrl.index;
                              // then we remove it from the navigation stack
                              this.navCtrl.remove(index);
                            });
	}

	openTrashMails()
	{
		this.navCtrl.push(TrashMailsPage,{data:"1"}).then(() => {
                              // first we find the index of the current view controller:
                              const index = this.viewCtrl.index;
                              // then we remove it from the navigation stack
                              this.navCtrl.remove(index);
                            });
	}
     openSentMails()
	{
		this.navCtrl.push(TrashMailsPage,{data:"2"}).then(() => {
                              // first we find the index of the current view controller:
                              const index = this.viewCtrl.index;
                              // then we remove it from the navigation stack
                              this.navCtrl.remove(index);
                            });
	}
 openDraftMails()
	{
		this.navCtrl.push(TrashMailsPage,{data:"3"}).then(() => {
                              // first we find the index of the current view controller:
                              const index = this.viewCtrl.index;
                              // then we remove it from the navigation stack
                              this.navCtrl.remove(index);
                            });
	}
	OpenToDoList()
	{
		this.navCtrl.push(ToDoPage).then(() => {
                              // first we find the index of the current view controller:
                              const index = this.viewCtrl.index;
                              // then we remove it from the navigation stack
                              this.navCtrl.remove(index);
                            });
	}

   get_FolderListCount(folder)
   {
      let headers=new Headers({'Content-Type':'application/x-www-form-urlencoded'});

	  let options=new RequestOptions({headers:headers});
	  
	  let body = 'email=' + this.myJData.email + '&folder='+folder ;

    
      return this.http.post(this.myJData.url + 'getFolderListCount.php',body,{headers:headers})
      .map(res => res.json());
  }

  getDelegated()
  {
	  let headers=new Headers({'Content-Type':'application/x-www-form-urlencoded'});

	  let options=new RequestOptions({headers:headers});
	  
	  let body = 'email=' + this.myJData.email + '&folder=Delegated' ;

    
      return this.http.post(this.myJData.url + 'getDelegatedFolderNamesAndCount.php',body,{headers:headers})
      .map(res => res.json());
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
		//  loading.dismiss();
         this.quietStatusTimeList  =  data;
      //    alert(this.quietStatusTimeList[0].Status);
          if(this.quietStatusTimeList[0].Status=="on")
            {
					 this.toolbar="quietmodecolor";
					 this.myJData.quietTimeStatus=true;
			}
					else{
						 this.myJData.quietTimeStatus=false;
					}
				
      });
  }
}
