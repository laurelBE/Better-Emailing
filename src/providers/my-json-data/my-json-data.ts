import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


/*
  Generated class for the MyJsonDataProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class MyJsonDataProvider {

//  public url : string = "http://be3.cloudapp.net/BE_PHP_1_LT/";
 public url : string = "http://be3.cloudapp.net/bephp/";
  public email : String ="";

  public ConversationHandle : number = 0;

  public subject : String ="";

  public quietTimeWeekDays : String ='';

  public quietTimeStatus=false;

  //public quietMode : boolean=false;
        
  //public email : String ="bill@eproductivite.com";

    public retreiveMails : boolean = true;

  constructor(public http: Http)   
  {

    
  }



   getJsonData()
  {
        return this.http.get('http://teachieparentine.com/Testing/Test.php').map(res => res.json());
  }


  getMessageDetails()
  {
     return this.http.get('http://teachieparentine.com/Testing/GetConvo.php').map(res => res.json());
  }


  getReadRequested()
  {
     return this.http.get('assets/data/ReadRequested.json').map(response => response.json());
  }
 
  getStatusData()
  {
    return this.http.get('assets/data/ParticipationStatus.json').map(response => response.json());
  }

    getMailName(){
    return this.http.get("assets/data/MailData.json").map(response => response.json());
  }

  getSearchDetails()
  {
    return this.http.get("assets/data/Search.json").map(response => response.json());
  }

}
