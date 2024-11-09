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
  HouseUrl = "../../assets/defaultImage.jpg";
  getEmailAddress:any
  Lat!:any;
  Long!:any
  CurrentlyLoggedInUser:any
  DataOfLoggedInPerson:any
  private AddHouse!:AddHouse
  description:any
  constructor(public alertCtrl: AlertController, private router: Router,public auth:AuthProvider,
    public household: HouseholdProvider, private route: ActivatedRoute) {

      this.printCurrentPosition();
      this.getLoggedinSavedData();
      this.getAllRegisteredUsersOnTheSystem();
    }

    getLoggedinSavedData(){
      this.auth.getUser().then(data=>{
        console.log(data.queryParams.emailAddres)
        this.CurrentlyLoggedInUser = data.queryParams.emailAddres
        })
  
    }

    getAllRegisteredUsersOnTheSystem(){
      this.household.getRegisteredUser().subscribe((data:any)=>{
        console.log(data.userList,"users")
        var getAllUsers = data.userList
        console.log(getAllUsers)
        for(var i=0; i < getAllUsers.length;i++){
          if(this.CurrentlyLoggedInUser == getAllUsers[i].emailAddress ){
          console.log(getAllUsers[0])
          let obj ={
            emailAddress: getAllUsers[i].emailAddress,
            userID:getAllUsers[i].userID
            
          }
          console.log(obj)
          this.DataOfLoggedInPerson = obj.userID
        }
   
        }
        })
    }
  
    
      printCurrentPosition = async () => {
        console.log("Hi");
        const coordinates = await Geolocation.getCurrentPosition();
        console.log('Current position:', coordinates.coords.latitude);        
        this.Lat = coordinates.coords.latitude
        this.Long = coordinates.coords.longitude

      }; 
      async insertImagine(event: any) {
        if (event.target.files && event.target.files[0]) {
          let reader = new FileReader();
    
          if (event.target.files[0].size > 1500000) {
            const alert = await this.alertCtrl.create({
              header: "Oh no!",
              message: "your photo is too large, please choose a photo with 1.5MB or less.",
              buttons: ['OK'],
              cssClass: "myAlert",
            });
            await alert.present();
          }
          else {
            reader.onload = (event: any) => {
              this.HouseUrl = event.target.result;
            }
            reader.readAsDataURL(event.target.files[0]);
          }
        }
      }

      AddHouseButton() {
        this.AddHouse = new AddHouse
        this.AddHouse.description = this.description
        this.AddHouse.houseImage = this.HouseUrl
        this.AddHouse.address = 'soweto'
        this.AddHouse.userID = this.DataOfLoggedInPerson
        this.AddHouse.location = "YES"
        this.AddHouse.images= []
    
        console.log(this.AddHouse)
        this.household.SaveHouse(this.AddHouse).subscribe((_responseHouse:any) => {
          console.log(_responseHouse)
          
    
        },
          async (error: any) => {
            console.log('error')
            const alert = await this.alertCtrl.create({
              // header: "Oh no!",
              message: "Information not saved",
              buttons: ['OK'],
              cssClass: "myAlert",
            });
            await alert.present();
          });
      }


    

}
