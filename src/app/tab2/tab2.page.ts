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

  ionViewWillEnter(){
    this.getRegisteredHouses();
  }
  getRegisteredHouses() {
    this.household.GetHousesSaved().subscribe((_responsegetHouses: any) => {
      this.houseListArray = _responsegetHouses.housesList
    })
  }
  deleteHouse(a: any) {
    this.houseID_delete = a.houseID
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
          }
        },
        {
          text: 'yes',
          handler: () => {
            this.household.DeleteHouse(this.houseID_delete).subscribe(_responseDelete => {
              this.getRegisteredHouses();
            })
          }
        }
      ]
    });

    await alert.present();
  }
}
