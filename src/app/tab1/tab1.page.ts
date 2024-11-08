import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
// import { CoordinatesServices } from 'src/providers/Geoloation';
import { RegisterNewUser } from 'src/models/RegisterNewUser.model';
import { HouseholdProvider } from 'src/providers/household';
import { AddHouse } from 'src/models/AddHouse.model';
import { ActivatedRoute } from '@angular/router';
import { Router, NavigationExtras } from '@angular/router';
import { Geolocation } from '@capacitor/geolocation';

import { AuthProvider } from 'src/providers/Auth';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  private Addhouse!:AddHouse
  HouseUrl = "../../assets/Images/defaultImage.jpg";
  getEmailAddress:any
  Lat!:any;
  Long!:any
  constructor(public alertCtrl: AlertController, private router: Router,public auth:AuthProvider,
    public household: HouseholdProvider, private route: ActivatedRoute) {

      this.printCurrentPosition();


      this.auth.getUser().then(data=>{
      console.log(data)
      })

      this.route.queryParams.subscribe(params => {
        console.log(params)
        this.getEmailAddress = params["emailAddres"];
        console.log(this.getEmailAddress)
  
        // this.household.getUserApis().subscribe((data: any) => {
        //   console.log(data.userList[0].emailAddress)
  
        //   for(var i=0; i<data.length;i++){
        //     console.log(data.userList[i])
        //     if(this.getEmailAddress == data.userList[i].emailAddress
        //     ){
        //       let obj ={
        //         userID: data.userList[i].userID
  
        //       }
        //       console.log(obj)
        //     }
        //   }
        
  
        // })
      })
    }
  
    
      printCurrentPosition = async () => {
        console.log("Hi");
        const coordinates = await Geolocation.getCurrentPosition();
        console.log('Current position:', coordinates.coords.latitude);        
        this.Lat = coordinates.coords.latitude
        this.Long = coordinates.coords.longitude

      }; 
    

}
