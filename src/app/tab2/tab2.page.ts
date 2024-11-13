import { Component } from '@angular/core';
import { HouseholdProvider } from 'src/providers/household';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {
  houseListArray: any
  houseID_delete: any
  constructor(public household: HouseholdProvider, private alertController: AlertController) {
    this.getRegisteredHouses();
  }
  getRegisteredHouses() {
    this.household.GetHousesSaved().subscribe((_responsegetHouses: any) => {
      console.log(_responsegetHouses)
      console.log(_responsegetHouses.housesList, "house")
      this.houseListArray = _responsegetHouses.housesList
      console.log(this.houseListArray.houseImage, "house")
    })
  }
  deleteHouse(a: any) {
    console.log(a)
    this.houseID_delete = a.houseID
    console.log(this.houseID_delete)
    this.presentAlert();
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: 'Are you sure you want to delete the house?',
      buttons: [
        {
          text: 'No',
          role: 'no',
          handler: () => {
            console.log('User canceled');
          }
        },
        {
          text: 'yes',
          handler: () => {
            console.log('User confirmed');
            this.household.DeleteHouse(this.houseID_delete).subscribe(_responseDelete => {
              console.log(_responseDelete)
              this.getRegisteredHouses();
            })
          }
        }
      ]
    });

    await alert.present();
  }
}
