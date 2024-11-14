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
  private Addhouse!: AddHouse
  HouseUrl = "../../assets/defaultImage.jpg";
  getEmailAddress: any
  Lat!: any;
  Long!: any
  CurrentlyLoggedInUser: any
  DataOfLoggedInPerson: any
  private AddHouse!: AddHouse
  description: any
  constructor(public alertCtrl: AlertController, private router: Router, public auth: AuthProvider,public alertController:AlertController,
    public household: HouseholdProvider, private route: ActivatedRoute) {
    this.printCurrentPosition();
    this.getLoggedinSavedData();
  }
  getLoggedinSavedData() {
    this.auth.getLoggedInUserDetails().then(data => {
      this.CurrentlyLoggedInUser = data.queryParams.emailAddres
      this.getAllRegisteredUsersOnTheSystem();
    })
  }

  getAllRegisteredUsersOnTheSystem() {
    this.household.getRegisteredUser().subscribe((data: any) => {
      var getAllUsers = data.userList
      for (var i = 0; i < getAllUsers.length; i++) {
        if (this.CurrentlyLoggedInUser == getAllUsers[i].emailAddress) {
          let obj = {
            emailAddress: getAllUsers[i].emailAddress,
            userID: getAllUsers[i].userID
          }
          this.DataOfLoggedInPerson = obj.userID
        }
      }
    })
  }
  printCurrentPosition = async () => {
    const coordinates = await Geolocation.getCurrentPosition();
    this.Lat = coordinates.coords.latitude.toString()
    this.Long = coordinates.coords.longitude.toString()
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
    this.AddHouse.latitude = this.Lat
    this.AddHouse.longitude = this.Long
    this.AddHouse.images = []
    this.household.SaveHouse(this.AddHouse).subscribe(async (_responseHouse: any) => {
      const alert = await this.alertCtrl.create({
        message: "You have successfully added a new house",
        buttons: ['OK'],
        cssClass: "myAlert",
      });
      await alert.present();
    },
      async (error: any) => {
        const alert = await this.alertCtrl.create({
          // header: "Oh no!",
          message: "Information not saved",
          buttons: ['OK'],
          cssClass: "myAlert",
        });
        await alert.present();
      });
  }
  async logout() {
    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: 'Are you sure you want to logout?',
      buttons: [
        {
          text: 'No',
          role: 'no',
          handler: () => {
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.auth.logout().then(_responseDelete => {
              this.router.navigate(['/login'])
      
            })
          }
        }
      ]
    });
    await alert.present();
  }

}
