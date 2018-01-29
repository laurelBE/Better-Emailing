import { Component } from '@angular/core';
import { NavController, NavParams,ModalController } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';
import { AlertController } from 'ionic-angular';
import { NewEventPage } from '../new-event/new-event';
import { ComposePage } from '../compose/compose';
import { SearchPage } from '../search/search';
import { HomePage } from '../home/home';
import { MenuMailPage } from '../menu-mail/menu-mail';
/**
 * Generated class for the CalendarDemoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-calendar-demo',
  templateUrl: 'calendar-demo.html',
})
export class CalendarDemoPage {

    datedisplay1;
  datedisplay2;
   datedisplay3;
  datedisplay4;
  datedisplay5;
  datedisplay6;
  datedisplay7;
  todaydate;
  datas;
  intval;
  firstday;
  secondday;
  thirdday;
  today1;
  lastintval;
  last2intval;
  newItem:string;
  msg=[];
  dayvalue=[];
  monthDays =0;
  gsDayNames = ['S','M','T','W','T','F','S'];
  modfiedDayNames = [];

  DayName1=4;
  DayName2=5;
  DayName3=6;
  DayName4=0;
  DayName5=1;
  DayName6=2;
  DayName7=3;

  year;
  month;

  selectedcolor=[];
  
  constructor(public mod: ModalController, public calendar: Calendar,public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams) {
  
this.today1 = new Date().toISOString();

 this.datas=new Date().getDate();
 

 let date_inicial:Date = new Date();
date_inicial.setDate(1);

console.log(date_inicial);
console.log(date_inicial.toDateString());
console.log(date_inicial.toISOString());

this.year=new Date().getFullYear();
 this.month=new Date().getMonth()+1;

 for(let i=0; i<7;i++)
  {
    this.selectedcolor[i]="#d2ddb3";
    if(i==3)
      {
        this.selectedcolor[i]="#fff";
      }
  }

 //console.log("date : : "+ new Date());

 //console.log("month : : " + this.month);

/* 
   this.intval=this.datas+1;
    this.lastintval=this.intval+1;
    this.thirdday=this.datas-1;
    this.secondday=this.thirdday-1;
    this.firstday=this.secondday-1;
   this.datedisplay4=String(new Date().getDate());
   this.datedisplay5=String(this.intval);
   this.datedisplay6=String(this.lastintval);
    this.datedisplay1=String(this.firstday);
   this.datedisplay2=String(this.secondday);
   this.datedisplay3=String(this.thirdday); */

   this.setValues(this.month,this.year);

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CalenderdisplayPage');
  
  }

/*   
  showAlert1() {
  
     let alert = this.alertCtrl.create({
      title: this.datedisplay1,
      subTitle: 'Your friend, Obi wan Kenobi, just accepted your friend request!',
      buttons: ['OK']
    });
    alert.present(); 
  }
 */
  
  
  showAlert( newItem: Date ): void 
  {
    
   this.msg=this.today1.split("-");
   this.dayvalue=this.msg[2].split("T");
   this.datedisplay3=this.dayvalue[0];
   this.datas=parseInt(this.dayvalue[0]);

   this.year=this.msg[0];
   this.month=this.msg[1];
  
   this.setValues(this.msg[1],this.msg[0]);

    newItem = newItem;
  
   /*  */
}

  setValues(m,y)
  {
     this.checkMonth(m,y);
    
   //console.log(this.msg[1] +this.msg[0]);

   var dayOfWeek = new Date(this.today1).getDay(); 

   //console.log("Day of week : " + this.gsDayNames[dayOfWeek]);

   let j=dayOfWeek;
      for(let i=0; i<7;i++)
        {
          
          if(j<7)
            {
              this.modfiedDayNames[i]=this.gsDayNames[j];
              j++;
            }
            else
            {
                j=0;
                this.modfiedDayNames[i]=this.gsDayNames[j];
                j++;
            }
        }
      
  

   this.intval=this.datas+1;
   if(this.intval>this.monthDays)
    {
      this.intval=1;
    }
    this.lastintval=this.intval+1;
    if(this.lastintval>this.monthDays)
    {
      this.lastintval=1;
    }
    this.last2intval=this.lastintval+1;
    if(this.last2intval>this.monthDays)
    {
      this.last2intval=1;
    }

    this.checkMonth(m-1,y);

    if(this.datas==1)
    {
      this.thirdday=this.monthDays;
    }
    else
    {
      this.thirdday=this.datas-1;
    }
    this.secondday=this.thirdday-1;
    this.firstday=this.secondday-1;
    this.datedisplay5=String(this.intval);
    this.datedisplay6=String(this.lastintval);
    this.datedisplay7=String(this.last2intval);
    this.datedisplay1=String(this.firstday);
    this.datedisplay2=String(this.secondday);
    this.datedisplay3=String(this.thirdday);
    this.datedisplay4=String(this.datas-0);

  }

  PreviousDate()
  {

           let tempDay,tempDate;
            tempDay=this.modfiedDayNames[6];
            this.modfiedDayNames[6]=this.modfiedDayNames[5];
            this.modfiedDayNames[5]=this.modfiedDayNames[4];
            this.modfiedDayNames[4]=this.modfiedDayNames[3];
            this.modfiedDayNames[3]=this.modfiedDayNames[2];
            this.modfiedDayNames[2]=this.modfiedDayNames[1];
            this.modfiedDayNames[1]=this.modfiedDayNames[0];
            this.modfiedDayNames[0]=tempDay;
             
/*             let flag=true;
            let var1=-1;
            let array1=[];
            array1[0]=this.firstday;
            array1[1]=this.secondday;
            array1[2]=this.thirdday;
            array1[3]=this.datas;
            array1[4]=this.intval;
            array1[5]=this.lastintval;
            array1[6]=this.last2intval;

            for(let i=0; i<7;i++)
              {
                if(array1[i]==1)
                  {
                    var1=i;
                    flag=false;
                  }
              }

              console.log("var1: " + var1);
            if(flag==false)
              {
                if(var1==0)
                {
                  
                  this.secondday=this.firstday;
                  this.thirdday=this.secondday+1;
                  this.datas=this.thirdday+1;
                  this.intval=this.datas+1;
                  this.lastintval=this.intval+1;
                  this.last2intval=this.lastintval+1;
                  console.log(this.month-1+"month");
                  this.checkMonth(this.month-1,this.year);
                  this.firstday=this.monthDays;
                  this.month=this.month-1;
                }
                else if(var1==1)
                  {
                  
                  this.thirdday=this.secondday;
                  this.datas=this.thirdday+1;
                  this.intval=this.datas+1;
                  this.lastintval=this.intval+1;
                  this.last2intval=this.lastintval+1;
                  this.checkMonth(this.month-1,this.year);
                  this.secondday=this.monthDays;
                  this.firstday=this.secondday-1;
                  console.log(this.month-1+"month");
                  this.month=this.month-1;
                  }
                else if(var1==2)
                  {
                  this.datas=this.thirdday;
                  this.intval=this.datas+1;
                  this.lastintval=this.intval+1;
                  this.last2intval=this.lastintval+1;
                  this.checkMonth(this.month-1,this.year);
                  this.thirdday=this.monthDays;
                  this.secondday=this.thirdday-1;
                  this.firstday=this.secondday-1;
                  console.log(this.month-1+"month");
                  this.month=this.month-1;
                  }
                  else if(var1==3)
                  {
                  this.intval=this.datas;
                  this.lastintval=this.intval+1;
                  this.last2intval=this.lastintval+1;
                  this.checkMonth(this.month-1,this.year);
                  this.datas=this.monthDays;
                  this.thirdday=this.datas-1;
                  this.secondday=this.thirdday-1;
                  this.firstday=this.secondday-1;
                  console.log(this.month-1+"month");
                  this.month=this.month-1;
                  }
                  else if(var1==4)
                  {
                  
                  this.lastintval=this.intval;
                  this.last2intval=this.lastintval+1;
                  this.checkMonth(this.month-1,this.year);
                  this.intval=this.monthDays;
                  this.datas=this.intval;
                  this.thirdday=this.datas-1;
                  this.secondday=this.thirdday-1;
                  this.firstday=this.secondday-1;
                  this.month=this.month-1;
                  }
                  else if(var1==5)
                  {
                  
                  this.last2intval=this.lastintval;
                  this.checkMonth(this.month-1,this.year);
                  this.lastintval=this.monthDays;
                  this.intval=this.lastintval;
                  this.datas=this.intval;
                  this.thirdday=this.datas-1;
                  this.secondday=this.thirdday-1;
                  this.firstday=this.secondday-1;
               //    this.month=this.month-1;
                  
                  }
                  else if(var1==6)
                  {
                  this.checkMonth(this.month-1,this.year);
                  this.last2intval=this.monthDays;
                  this.lastintval=this.last2intval-1;
                  this.intval=this.lastintval;
                  this.datas=this.intval;
                  this.thirdday=this.datas-1;
                  this.secondday=this.thirdday-1;
                  this.firstday=this.secondday-1;
                //   this.month=this.month-1;
                  
                  }

              }
                else
                  {
                  this.secondday=this.firstday;
                  this.thirdday=this.secondday+1;
                  this.datas=this.thirdday+1;
                  this.intval=this.datas+1;
                  this.lastintval=this.intval+1;
                  this.last2intval=this.lastintval+1;
                  this.firstday=this.firstday-1;
                 
                  }  */
              
              
                tempDate=this.firstday;
                this.last2intval=this.lastintval;
                this.lastintval=this.intval;
                this.intval=this.datas;
                this.datas=this.thirdday;
                this.thirdday=this.secondday;
                this.secondday=this.firstday;
                this.checkMonth(this.month-1,this.year);
                //console.log("this.month in prev date :" + (this.month-1));
              if(tempDate==1)
                {
                  this.firstday=this.monthDays;
                  this.month=this.month-1;
                  if(this.month==0)
                    {
                      this.month=12;
                      this.year=this.year-1;
                    }

                }
                else
                {
                  
                  this.firstday=tempDate-1;
                } 

              this.datedisplay5=String(this.intval);
              this.datedisplay6=String(this.lastintval);
              this.datedisplay7=String(this.last2intval);
              this.datedisplay1=String(this.firstday);
              this.datedisplay2=String(this.secondday);
              this.datedisplay3=String(this.thirdday);
              this.datedisplay4=String(this.datas-0);
       
  }

  NextDate()
  {

           let tempDay, tempDate;
            tempDay=this.modfiedDayNames[0];
            this.modfiedDayNames[0]=this.modfiedDayNames[1];
            this.modfiedDayNames[1]=this.modfiedDayNames[2];
            this.modfiedDayNames[2]=this.modfiedDayNames[3];
            this.modfiedDayNames[3]=this.modfiedDayNames[4];
            this.modfiedDayNames[4]=this.modfiedDayNames[5];
            this.modfiedDayNames[5]=this.modfiedDayNames[6]
            this.modfiedDayNames[6]=tempDay;

            
                tempDate=this.last2intval;
                this.firstday=this.secondday;
                this.secondday=this.thirdday;
                this.thirdday=this.datas;
                this.datas=this.intval;
                this.intval=this.lastintval;
                this.lastintval=this.last2intval;
                this.checkMonth(this.month,this.year);
                
              if(tempDate==this.monthDays)
                {
                  this.last2intval=1;
                  this.month=this.month+1;
                  if(this.month==12)
                    {
                      this.month=1;
                      this.year=this.year+1;
                    }

                }
                else
                {
                  
                  this.last2intval=tempDate+1;
                } 

              this.datedisplay5=String(this.intval);
              this.datedisplay6=String(this.lastintval);
              this.datedisplay7=String(this.last2intval);
              this.datedisplay1=String(this.firstday);
              this.datedisplay2=String(this.secondday);
              this.datedisplay3=String(this.thirdday);
              this.datedisplay4=String(this.datas-0);
                
  }
   getDate(date){
 alert("hii");
     date = date.split('\/');
     date = date[2] + '-' + date[0] + '-' + date[1];
     let re = /\//gi;
     date = date.replace(re, "-");
     return date;
   }
    up()
    {
    
     this.intval=parseInt(this.datedisplay4)+1;
    this.lastintval=this.intval+1;
    this.secondday=this.datedisplay4-1;
    this.firstday=this.secondday-1;
    this.datedisplay4=String(this.datedisplay4);
    this.datedisplay5=String(this.intval);
    this.datedisplay6=String(this.lastintval);
    this.datedisplay7=String(this.last2intval);
    this.datedisplay1=String(this.firstday);
    this.datedisplay2=String(this.secondday);
    this.datedisplay3=String(this.thirdday);

      
    }

    checkMonth(month,year)
    {
         console.log("ojfjd : " + month);
         
        let mon= String(month);
        if(mon.length==1)
          {
            mon='0'+mon;
          }
        console.log(mon);
      switch(mon)
      {
        
        case '01':
                this.monthDays=31;
               
                break;
        case '02': 
                let leap :boolean;
                if(year % 4 == 0)
                {
                    if( year % 100 == 0)
                    {
                        // year is divisible by 400, hence the year is a leap year
                        if ( year % 400 == 0)
                            leap = true;
                        else
                            leap = false;
                    }
                    else
                        leap = true;
                }
                else
                    leap = false;
                if(leap)
                  {
                    this.monthDays=29;
                  }
                  else
                  {
                    this.monthDays=28;
                  }
                break;
          case '03': this.monthDays=31;
                break;

          case '04': this.monthDays=30;
                break;

          case '05': this.monthDays=31;
          
                break;

          case '06': this.monthDays=30;
          
                break;

          case '07': this.monthDays=31;
          
                break;

          case '08': this.monthDays=31;
          
                break;

          case '09': 
                
                this.monthDays=30;
                
                break;

          case '10': this.monthDays=31;
                break;

          case '11': this.monthDays=30;
                break;

          case '12': this.monthDays=31;
                break;

         
      }
    }

    changeBackColor(id)
    {
      for(let i=0;i<7;i++)
        {
          this.selectedcolor[i]="#d2ddb3";
          if(i==id-1)
            {
              this.selectedcolor[i]="#fff";
            }
        }
    }

addEvent()
  {
    
  }

  cancel()
  {
    this.navCtrl.pop();
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
  
  folderlist()
  {
    this.navCtrl.push(HomePage);
  }

  searchPage()
  {
   this.navCtrl.push(SearchPage);
  }

  openMailList()
  {
    		let m = this.mod.create(MenuMailPage);

		m.present();
  }

}
