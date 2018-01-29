import { Component } from '@angular/core';
import { NavController, NavParams, ModalController,Platform } from 'ionic-angular';
import { ScheduleAlertPage } from '../schedule-alert/schedule-alert';
import { MyJsonDataProvider } from '../../providers/my-json-data/my-json-data';
import { InAppBrowser,InAppBrowserOptions,InAppBrowserEvent } from '@ionic-native/in-app-browser';
import moment from 'moment';
import { Http,Headers,RequestOptions } from '@angular/http';
/**
 * Generated class for the SchedulePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html',
})
export class SchedulePage {

  toolbar: String ="primary";
  today11;
  mintoday1;
 today2;
  mintoday2;
  item1;
  subject;

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
  tempToday1;
  lastintval;
  last2intval;
  newItem:string;
  msg=[];
  dayvalue=[];
  monthDays =0;
  finalMonth;
  finalYear;
  gsDayNames = ['S','M','T','W','T','F','S'];
  modfiedDayNames = [];

  DayName1=4;
  DayName2=5;
  DayName3=6;
  DayName4=0;
  DayName5=1;
  DayName6=2;
  DayName7=3;

  flag=0;
  flag1=0;

  top=0;
  height=0;
  topInPx=[];
  heightOfDiv=[];

  eventList = [];
  finalEventList = [];

  

  year : number;
  month : number;

  prvMonth : number;
  nextMonth : number=0;

  scrollAmount;

  selectedcolor=[];
  constructor(public myJData:MyJsonDataProvider,public http : Http, public platform:Platform, public mod:ModalController, public navCtrl: NavController, public navParams: NavParams) {
  
  
    this.platform.ready().then(() => {            
		   this.platform.registerBackButtonAction(() => {                
         //navigator['app'].exitApp(); 
              this.cancel(); 
              //this.navCtrl.pop();                        
				});        
    });
      this.item1 = this.navParams.get("item");
      this.subject="this.item1.MessageHandle";
     // alert(this.item1.Subject);
    this.today11=new Date().toISOString();
        //this.eventStartTime=
 
  this.today11=moment(this.today11).format("YYYY-MM-DDTHH:mm:ssZ");

  this.mintoday1=this.today11;

   this.today2=new Date().toISOString();
        //this.eventStartTime=
 
  this.today2=moment(this.today2).format("YYYY-MM-DDTHH:mm:ssZ");

  this.mintoday2=this.today2;

   this.today1 = new Date().toISOString();

 this.tempToday1=this.today1;

 this.datas=new Date().getDate();
 
 
 let date_inicial:Date = new Date();
date_inicial.setDate(1);

console.log(this.today1);
console.log(date_inicial.toDateString());
console.log(date_inicial.toISOString());

this.year=new Date().getFullYear();
this.finalYear=new Date().getFullYear();
 this.month=new Date().getMonth()+1;

 this.flag1=1;

 this.prvMonth=this.month-1;
 this.nextMonth =this.month + 1;
 this.finalMonth=new Date().getMonth()+1;

 if(this.prvMonth<=0)
  {
    this.prvMonth=12;
  }

  if(this.nextMonth>12)
    {
      this.nextMonth=1;
    }

 for(let i=0; i<7;i++)
  {
    this.selectedcolor[i]="#d2ddb3";
    if(i==3)
      {
        this.selectedcolor[i]="#fff";
      }
  }

   this.setValues(this.month,this.year);

 
  }

      ionViewWillEnter() {

    this.platform.registerBackButtonAction(() => {                
         //navigator['app'].exitApp(); 
              this.cancel(); 
              //this.navCtrl.pop();                        
        });
            
        if(this.myJData.quietTimeStatus==true)
          {
             this.toolbar="quietmodecolor";
          }

}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SchedulePage');
  }

  cancel()
  {
    this.navCtrl.pop();
  }

  ScheduleAlertAction()
  {
      let m=this.mod.create(ScheduleAlertPage);
      m.present();
  }

  addevent(today11,today2)
{
  alert(this.today11);
  alert(this.today2);
    var ref = window.open('http://be3.cloudapp.net/bephp/insertEvent.php?location=hii'+'&subject='+this.item1.Subject+ '&startDate=' + today11+ '&endDate=' + today2, '_self', 'location=no');           
var checkevent:boolean=true;          
 ref.addEventListener('loadstop', function(event: InAppBrowserEvent) 
{       
    if(event.url.toString().includes("?location="))    
        {        
            checkevent=true;        
        //    ref.close();    
        }  
    if(event.url.toString().includes("?code="))    
        {             
            checkevent=false;      
           // ref.close();   // var ref1 = window.open('http://be3.cloudapp.net/BE_PHP_1_LT/insertEvent.php?location=' + location+'&subject='+subject+ '&startDate=' + eventStartTime+ '&endDate=' + eventEndTime, '_self', 'location=no');  //this.newsent();
        } 
        
    if(checkevent==false)    
        {                       
            var ref1 = window.open('http://be3.cloudapp.net/bephp/insertEvent.php?location=hii' +'&subject='+this.item1.Subject+ '&startDate=' + today11+ '&endDate=' + today2, '_self', 'location=no');         
            ref1.addEventListener('loadstop', function(event: InAppBrowserEvent) 
            {      
                if(event.url.toString().includes("?location="))    
                    {               
                       // ref1.close();    
                    }          
            });       
        }

});  
}





showAlert( newItem: Date ): void 
  {
     console.log("flag : " + this.flag);
     if(this.flag!=1 && this.flag!=2 && this.flag!=3)
      { 
          this.tempToday1=this.today1;
          this.msg=this.tempToday1.split("-");
          this.dayvalue=this.msg[2].split("T");
          this.datedisplay3=parseInt(this.dayvalue[0]);
          this.datas=parseInt(this.dayvalue[0]);

          

          this.year=parseInt(this.msg[0]);
          this.finalYear=parseInt(this.msg[0]);
          this.month=Number.parseInt(this.msg[1]) ;
          this.prvMonth=this.month-1;
          this.nextMonth=this.month+1;
          this.finalMonth=Number.parseInt(this.msg[1]);

          this.flag1=1;



           if(this.prvMonth<=0)
            {
              this.prvMonth=12;
            }

            if(this.nextMonth>12)
              {
                this.nextMonth=1;
              }

          console.log("In alert : ");
          console.log("this.month : " +this.month);
          console.log("this.prvMonth : " + this.prvMonth);
          console.log("this.nextMonth : "+this.nextMonth);
          

          //console.log("In alert final month : " + this.finalMonth);
          
          this.setValues(Number.parseInt(this.msg[1]),parseInt(this.msg[0])); 

          console.log(" this.msg[1] : " + this.msg[1]);
          console.log(" this.msg[0] : " +this.msg[0] );
          
          if(this.datas==1 || this.datas==2 || this.datas==3)
            {
             
              this.month= Number.parseInt(this.msg[1])-1;

              if(this.month<=0)
                {
                  this.month=12;
                  //this.year=this.year-1;
                }
               console.log("this m : " + this.month);
            }
            else
              {
                this.month=Number.parseInt(this.msg[1]);
              }

              for(let i=0; i<7;i++)
              {
                this.selectedcolor[i]="#d2ddb3";
                if(i==3)
                  {
                    this.selectedcolor[i]="#fff";
                  }
              }
      }
      else
        {
          this.flag=0;
          //console.log("In alert : ");
        } 

   // newItem = newItem;

}

  setValues(m,y)
  {
     this.monthDays=this.checkMonth(m,y);

     console.log("this.monthDays fgfg : " + this.monthDays);

   var dayOfWeek = new Date(this.tempToday1).getDay(); 

   let j=dayOfWeek;
   console.log("j : "+j);

   console.log("data : " + this.today1);
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

    if((m-1)<=0)
      {
        m=12;
      }
      else
        {
          m=m-1;
        }
    this.monthDays= this.checkMonth(m,y);

    //console.log(" m1 : " + (m-1));

    if(this.datas==1)
    {
      this.thirdday=this.monthDays;
    }
    else
    {
      this.thirdday=this.datas-1;
    }
    if(this.datas==2)
      {
        this.secondday=this.monthDays;
      }
      else
      {
        this.secondday=this.thirdday-1;
      }
      if(this.datas==3)
      {
        this.firstday=this.monthDays;
      }
      else
      {
        this.firstday=this.secondday-1;
      }
    
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
    this.flag=1; 
    
     for(let i=0; i<7;i++)
      {
        this.selectedcolor[i]="#d2ddb3";
        if(i==3)
          {
            this.selectedcolor[i]="#fff";
          }
      }

    let t;
           let dayval;

            t=this.tempToday1.split("-");
          this.finalMonth=Number.parseInt(t[1]) ;

          console.log("this.month in prv :" + this.month);
          console.log("this.year in prv :" + this.year);

          if(this.datas==1)
              {
                this.finalMonth=this.month;
                if(this.finalMonth==12)
                  {
                     this.finalYear=this.finalYear-1;

                  }
              }

          this.monthDays= this.checkMonth(this.finalMonth,this.finalYear);

          

          console.log("final " + this.finalMonth );

            //this.changeDatePickerDate();
             if(this.datas<=1)
                    {
                      
                      console.log("finalMonth : " + this.finalMonth);
                      
                      //this.finalYear=this.year;

                      console.log("finalMonth 2 : " + this.month);

                      let temp12=String(this.finalMonth);

                      console.log("finalMonth 1 : " + this.finalMonth);
                      console.log(" temp11:" +temp12);
                      if(this.finalMonth<=0)
                        {
                          this.finalMonth=12;
                        }
                      if(temp12.length==1)
                        {
                          console.log("this.finalMonth :" +this.finalMonth)
                          temp12="0"+this.finalMonth;
                          console.log(" temp1:" +temp12)
                        }
                      let str= this.finalYear+"-"+temp12+"-"+this.thirdday+"T11:48:20.084Z";
                      var date1=new Date(str);
                      console.log("date1 :" + str);
                      this.today1 = date1.toISOString(); 
                      this.tempToday1=this.today1;
                     // console.log("In Prevoius date2"); 
                    }
                    else
                      {
                        let temp1=String(this.finalMonth);

                        console.log("length: " +String(this.finalMonth).length);
                        if(temp1.length==1)
                          {
                            console.log("this.finalMonth :" +this.finalMonth)
                            temp1="0"+this.finalMonth;
                          }
                          let temp2=String(this.thirdday);
                        if(temp2.length==1)
                          {
                            console.log("this.thirdday 1 :" +this.thirdday)
                            temp2="0"+this.thirdday;
                          }
                        let str= this.finalYear+"-"+temp1+"-"+temp2+"T11:48:20.084Z";
                        var date1=new Date(str);
                        console.log("date1 :" + str);
                        this.today1 = date1.toISOString(); 
                        this.tempToday1=this.today1;
                        console.log("datas : "+this.today1);
                      }


    let tempDay,tempDate;

           
            tempDay=this.modfiedDayNames[6];
            this.modfiedDayNames[6]=this.modfiedDayNames[5];
            this.modfiedDayNames[5]=this.modfiedDayNames[4];
            this.modfiedDayNames[4]=this.modfiedDayNames[3];
            this.modfiedDayNames[3]=this.modfiedDayNames[2];
            this.modfiedDayNames[2]=this.modfiedDayNames[1];
            this.modfiedDayNames[1]=this.modfiedDayNames[0];
            this.modfiedDayNames[0]=tempDay;

            
             

                tempDate=this.firstday;
                this.last2intval=this.lastintval;
                this.lastintval=this.intval;
                this.intval=this.datas;
                this.datas=this.thirdday;
                this.thirdday=this.secondday;
                this.secondday=this.firstday;
                this.monthDays= this.checkMonth(this.prvMonth,this.year);

                //console.log("this.Monthdays : " + this.monthDays);

                //console.log("this.month : " + this.prvMonth);
               
              if(tempDate==1)
                {  
                  this.firstday=this.monthDays;
                  this.month=this.month-1;
                  this.prvMonth=this.prvMonth-1;
                  this.nextMonth=this.month+1;
                  
                  if(this.month<=0)
                    {
                      console.log("in prv this.month :"+this.month);
                      this.month=12;
                      this.year=this.year-1;
                    }
                    if(this.prvMonth<=0)
                    {
                      this.prvMonth=12;
                    }

                    if(this.nextMonth>12)
                      {
                        this.nextMonth=1;
                      }

                }
                else
                {
                  
                  this.firstday=tempDate-1;
                 
                
                } 
                
              this.datedisplay1=String(this.firstday);
              this.datedisplay2=String(this.secondday);
              this.datedisplay3=String(this.thirdday);
              this.datedisplay4=String(this.datas-0);
              this.datedisplay5=String(this.intval);
              this.datedisplay6=String(this.lastintval);
              this.datedisplay7=String(this.last2intval);

              console.log("In prv date: ");
              console.log("this.month : " +this.month);
               console.log("this.prvMonth : " + this.prvMonth);
                console.log("this.nextMonth : "+this.nextMonth);
              
  }

/* changeDatePickerDate()
{
            let str= this.month + "/" + this.datas + "/" +this.year;
          var date1=new Date(str);
          console.log("date1" + date1);
          this.today1 = date1.toISOString(); 

} */


  NextDate()
  {
    this.flag=2;
    

      for(let i=0; i<7;i++)
      {
        this.selectedcolor[i]="#d2ddb3";
        if(i==3)
          {
            this.selectedcolor[i]="#fff";
          }
      }

    let t;
           let dayval;

            t=this.tempToday1.split("-");
          this.finalMonth=parseInt(t[1]);

          console.log("parseInt(t[1]) : " + parseInt(t[1]));

          if(this.intval==1)
              {
                this.finalMonth=this.month+1;

                if(this.finalMonth>12)
                  {
                    this.finalMonth=1;
                    this.finalYear=this.finalYear+1;
                    
                  }
                
              }

       

            
         
          console.log("final n " + this.finalYear );

            this.monthDays= this.checkMonth(this.finalMonth,this.finalYear);

            console.log("monthdays : " + this.monthDays);

            
                   
                      if(this.datas>=this.monthDays)
                    {
                      
                      console.log("finalMonth n : " + this.finalMonth);
                      
                      if(this.finalMonth>12)
                        {
                          this.finalMonth=1;
                        }
                      //this.finalYear=this.year;
                      let temp1=String(this.finalMonth);
                      if(temp1.length==1)
                        {
                          //console.log("this.finalMonth n :" +this.finalMonth)
                          temp1="0"+this.finalMonth;
                        }
                        let temp2=String(this.intval);
                        if(temp2.length==1)
                          {
                            //console.log("this.finaldate n :" +this.intval)
                            temp2="0"+this.intval;
                          }
                      let str= this.finalYear+"-"+temp1+"-"+temp2+"T11:48:20.084Z";
                      var date1=new Date(str);
                      console.log("date1 n :" + str);
                      this.today1 = date1.toISOString(); 
                     this.tempToday1=this.today1;
                      
                     // console.log("In Prevoius date2"); 
                    }
                    else
                      {
           
                        let temp1=String(this.finalMonth);
                        if(temp1.length==1)
                          {
                            console.log("this.finalMonth n :" +this.finalMonth)
                            temp1="0"+this.finalMonth;
                          }
                          let temp2=String(this.intval);
                        if(temp2.length==1)
                          {
                            console.log("this.finaldate n :" +this.intval)
                            temp2="0"+this.intval;
                          }
                        let str= this.finalYear+"-"+temp1+"-"+temp2+"T11:48:20.084Z";
                        var date1=new Date(str);
                        console.log("date1 n :" + str);
                        this.today1 = date1.toISOString(); 
                        this.tempToday1=this.today1;
                        console.log("datas n : "+this.today1);
                      
                      }
                     





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
            
            this.monthDays= this.checkMonth(this.month,this.year);

            console.log("this.monthdays n : " + this.monthDays);
            //console.log("temdate : " + tempDate);

            console.log("tempDate==this.monthDays :" + (tempDate==this.monthDays));

            if(this.firstday==1)
              {
                this.month=Number(this.month)+1;
                  this.prvMonth=this.month-1;
                  this.nextMonth=this.month+1;
                  
                  if(this.month>12)
                    {
                      this.month=1;
                      this.year=this.year+1;
                    }
              }

            if(tempDate==this.monthDays)
                {
                  this.last2intval=1;

                  console.log("this.month  nn : "+this.month);
                  
                }
                else
                {
                  
                  this.last2intval=tempDate+1;
                } 

                if(this.prvMonth<=0)
                    {
                      this.prvMonth=12;
                    }

                    if(this.nextMonth>12)
                      {
                        this.nextMonth=1;
                      }

              this.datedisplay5=String(this.intval);
              this.datedisplay6=String(this.lastintval);
              this.datedisplay7=String(this.last2intval);
              this.datedisplay1=String(this.firstday);
              this.datedisplay2=String(this.secondday);
              this.datedisplay3=String(this.thirdday);
              this.datedisplay4=String(this.datas-0);

              console.log("In Next date : ");
              console.log("this.month : " +this.month);
               console.log("this.prvMonth : " + this.prvMonth);
                console.log("this.nextMonth : "+this.nextMonth);

  }
   /* getDate(date){
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

      
    } */

    checkMonth(month,year)
    {
         //console.log("ojfjd : " + month);
         
        let mon= String(month);
        if(mon.length==1)
          {
            mon='0'+mon;
          }
        //console.log(mon);
      switch(mon)
      {
        
        case '01': return 31;

        case '02': 
                let leap :boolean;
                if(year % 4 == 0)
                {
                    if( year % 100 == 0)
                    {
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
                    return 29;
                  }
                  else
                  {
                    return 28;
                  }
                
          case '03': return 31;
                
          case '04': return 30;

          case '05':return 31;

          case '06': return 30;

          case '07': return 31;

          case '08': return 31;

          case '09': return 30;

          case '10': return 31;

          case '11': return 30;

          case '12': return 31;

         
      }
    }

    changeBackColor(id)
    {
      //alert("OK");
      for(let i=0;i<7;i++)
        {
          this.selectedcolor[i]="#d2ddb3";
          if(i==id-1)
            {
              this.selectedcolor[i]="#fff";
            }
           
        }

         let date, month, year,noOfDays;
           if(id==1)
            {
              date=this.firstday;
              //console.log("date first day : " + date);
            }
          if(id==2)
            {
              date=this.secondday;
            }
          if(id==3)
            {
              date=this.thirdday;
            }
          if(id==4)
            {
              date=this.datas;
              
            }
          if(id==5)
            {
              date=this.intval;
            }
          if(id==6)
            {
              date=this.lastintval;
            }
          if(id==7)
            {
              date=this.last2intval;
            }

            this.flag=3;

          let t;
          let dayval;

          t=this.tempToday1.split("-");
          month=parseInt(t[1]);
          year=parseInt(t[0]);

          let tmon=month-1;
          if(tmon<=0)
            {
              tmon=12;
            }

          //console.log("monthdays fffff : " + this.monthDays);

          noOfDays=this.checkMonth(tmon,year);

          
          
          console.log("noOfDays fffff : " + noOfDays);
          // console.log(" month fffff : " + month);
           // console.log("year fffff : " + year);

          if(date==noOfDays || date==(noOfDays-1) || date==(noOfDays-2) || this.datas==(noOfDays-3) || this.datas==(noOfDays-4) )
            {
              console.log("this.month 1 : " +this.month);
              month=this.month;
              if(month==12)
              {

                year=this.finalYear-1;
              }
            }
            else
            {
              console.log("ok1");
              month=parseInt(t[1]);
            }
            if(this.datas==noOfDays || this.datas==(noOfDays-1) || this.datas==(noOfDays-2) || this.datas==(noOfDays-3) )
              {
                if(date==1 || date==2 || date==3 || date==4 )
                {
                  month=parseInt(t[1])+1;
                  if(month>12)
                    {
                      month=1;
                      year=parseInt(t[0])+1;
                    }
                  
                }
              }
              else if(date==1 || date==2 || date==3 || date==4 )
                {
                  month=parseInt(t[1]);
                  year=parseInt(t[0]);
                }
            

            let temp1=String(month);
            if(temp1.length==1)
              {
                          //console.log("this.finalMonth n :" +this.finalMonth)
                temp1="0"+month;
              }
              let temp2=String(date);

              console.log("date 1 : " + date);
              console.log("month 1 : " +month);

              if(temp2.length==1)
              {
                            //console.log("this.finaldate n :" +this.intval)
                 temp2="0"+date;
              }
            let str= year+"-"+temp1+"-"+temp2+"T11:48:20.084Z";
            var date1=new Date(str);
            console.log("date1 n :" + str);
            this.today1 = date1.toISOString(); 
            
            this.getEvents();
    }

addEvent()
  {
    
  }

 
  getEvents()
  {
  //  alert(this.today1);
    this.finalEventList=[];
    console.log("this.today1 : " + this.today1);
    let headers=new Headers({'Content-Type':'application/x-www-form-urlencoded'});
    let body = 'email='+this.myJData.email + '&maxDate='+this.today1;
     this.http.post(this.myJData.url + 'getCalendarEvents.php',body,{headers:headers})
    .map(res => res.json())
    .subscribe(data => {
     console.log(data);

      for(let i=0;i<data.length;i++)
        {
            let startTime,endTime;

            startTime=data[i].StartDate;
            endTime=data[i].EndDate;

           // alert(startTime);
            //alert(endTime);

      let startDate=startTime.split("T");
      let tempYr=startDate[0].split("-");
      let tempDate=parseInt(tempYr[0]);
      let tempMonth=parseInt(tempYr[1]);


      let endDate=endTime.split("T");
      let tempYr1=endDate[0].split("-");

       let date1=new Date(this.today1);
       let date2=new Date(data[i].StartDate);
       let date3=new Date(data[i].EndDate);

       console.log("today1 :" + date1);
       console.log("StartDate :" + date2);
       console.log("EndDate :" + date3);
      console.log(date2.getTime() <= date1.getTime() &&  date1.getTime()<=date3.getTime());

      
        console.log("startDate[0] : " + startDate[0] + " startDate[1] : " + startDate[1] + " tempYr[0] :" + tempYr[0]);

      let startArray1=startTime.split("T");

      console.log("startdate : " + startArray1[0]);
      console.log("starttime : " + startArray1[1]);

      let startArray2=startArray1[1].split(":");

      let starthour = Number.parseInt(startArray2[0]);
      let startminutes = Number.parseInt(startArray2[1]);

      console.log("starthour : " + starthour);
      console.log("startminutes : " + startminutes);

      this.setTop(starthour, startminutes,i);


      let endArray1=endTime.split("T");

      console.log("enddate : " + endArray1[0]);
      console.log("endtime : " + endArray1[1]);

      let endArray2=endArray1[1].split(":");

      let endhour = Number.parseInt(endArray2[0]);
      let endminutes = Number.parseInt(endArray2[1]);

      console.log("endhour : " + endhour);
      console.log("endminutes : " + endminutes);

      let diffHour,diffMin;
      diffHour=endhour-starthour;
      diffMin=endminutes-startminutes;

     
      console.log("diffHour : " + diffHour);
            diffMin=Math.abs(diffMin);
             console.log("diffmin : " + diffMin);
             if(diffHour==0)
              {
                 this.height=0
             if(diffMin<31)
              {
             this.height=this.height +25;
                this.heightOfDiv[i]=this.height + "px"; 
                 
                  this.finalEventList.push(data[i]);
              }
                else
                  {
    this.height=this.height +40;
                this.heightOfDiv[i]=this.height + "px"; 
                 
                  this.finalEventList.push(data[i]);
                  }
              }
                else 
                  {
                  // console.log(diffMin);
                 //   if(endhour)
                 if(startminutes>29)
                  {
                    if(diffHour==1)

{
                        this.height=15;
}
                      else{
                        let mydiff=diffHour-1
                         this.height=45*mydiff;
                      }
                  }
                    else
                      {
                     this.height=45*diffHour;
                      }

                          if(diffMin<31)
              {
             this.height=this.height +25;
                this.heightOfDiv[i]=this.height + "px"; 
                 
                  this.finalEventList.push(data[i]);
              }
                else
                  {
    this.height=this.height +40;
                this.heightOfDiv[i]=this.height + "px"; 
                 
                  this.finalEventList.push(data[i]);
                  }
                }
        /*    for(let j=0;j<24;j++)
              {
                if(diffHour==j )
                  {
                    if(diffMin<=30 && diffMin>=0)
                      {
                        this.height=this.height +25;
                      }
                     if(diffMin>=-30 && diffMin<=0)
                      {
                        this.height=this.height -25;
                      } 
                      this.heightOfDiv[i]=this.height + "px"; 
                  }
                this.height=this.height +50;
              } 
              
        

              this.finalEventList  =  data;*/ 
          }}); 
  }

getEvents1()
{
  this.finalEventList = [];
  this.http.get('')
  .map(response => response.json())
  .subscribe(data=> {
    this.eventList = data;
    console.log(data);
    for(let i=0 ; i<data.length;i++)
    {
      let startTime,endTime;

      startTime=data[i].StartDate;
      endTime=data[i].EndDate;

      //console.log("startTime : " + startTime);
      //console.log("endTime : " + endTime);

      let startDate=startTime.split("/");
      let tempYr=startDate[2].split(" ");
      let tempDate=parseInt(startDate[0]);
      let tempMonth=parseInt(startDate[1]);


      let endDate=endTime.split("/");
      let tempYr1=startDate[2].split(" ");


      //console.log("startDate[0] : " + startDate[0] + " startDate[1] : " +  startDate[1] + " tempYr[0] :" + tempYr[0]);
      // console.log("finalMonth : " + this.finalMonth + " datas : " +  this.datas + " finalYear :" + this.finalYear);

       let date1=new Date(this.today1);
       let date2=new Date(data[i].StartDate);
       let date3=new Date(data[i].EndDate);


      if(date2.getTime() <= date1.getTime() &&  date1.getTime()<=date3.getTime())
        {
        //console.log("startDate[0] : " + startDate[0] + " startDate[1] : " + startDate[1] + " tempYr[0] :" + tempYr[0]);

      let startArray1=startTime.split(" ");

      //console.log("startdate : " + startArray1[0]);
      //console.log("starttime : " + startArray1[1]);

      let startArray2=startArray1[1].split(":");

      let starthour = Number.parseInt(startArray2[0]);
      let startminutes = Number.parseInt(startArray2[1]);

      //console.log("starthour : " + starthour);
      //console.log("startminutes : " + startminutes);

      this.setTop(starthour, startminutes,i);


      let endArray1=endTime.split(" ");

      //console.log("enddate : " + endArray1[0]);
      //console.log("endtime : " + endArray1[1]);

      let endArray2=endArray1[1].split(":");

      let endhour = Number.parseInt(endArray2[0]);
      let endminutes = Number.parseInt(endArray2[1]);

      //console.log("endhour : " + endhour);
      //console.log("endminutes : " + endminutes);

      let diffHour,diffMin;
      diffHour=endhour-starthour;
      diffMin=endminutes-startminutes;

      console.log("diffHour : " + diffHour);
      console.log("diffMin : " + diffMin);
     this.height=50;
     /*  if(diffMin>31)
                {
                  this.height=this.height +50;
                }
              if(diffMin<-31)
                {
                  this.height=this.height -25;
                } */
                this.height=this.height +100;
                this.heightOfDiv[i]=this.height + "px"; 
                 
                  this.finalEventList.push(data[i]);
       /*  if(diffHour==0)
          {
  console.log('hiiiiii');
           this.height=0;
      for(let j=0;j<24;j++)
        {
          if(diffHour==j)
            {
              if(diffMin>31)
                {
                  this.height=this.height +50;
                }
              if(diffMin<-31)
                {
                  this.height=this.height -25;
                }
                this.heightOfDiv[i]=this.height + "px"; 
            }
          this.height=this.height +50;
        }


           
          }
      else
        {
       
          this.height=0;
      for(let j=0;j<24;j++)
        {
          if(diffHour==j)
            {
              if(diffMin==30)
                {
                  this.height=this.height +25;
                }
              if(diffMin==-30)
                {
                  this.height=this.height -25;
                }
                this.heightOfDiv[i]=this.height + "px"; 
            }
          this.height=this.height +50;
        }

        }
        this.finalEventList.push(data[i]);
*/
    }
    }}); 
      
  
}

      setTop(hour,minutes,i)
      {
         
         this.top=52;
        for(let j=1; j<=24;j++)
        {
          if(hour==j)
            {
              if(minutes==30)
                {
                  this.top=this.top +25;
                }
                this.topInPx[i]=this.top + "px"; 
            }
          this.top=this.top +50;
        } 


        
      }
  
}
