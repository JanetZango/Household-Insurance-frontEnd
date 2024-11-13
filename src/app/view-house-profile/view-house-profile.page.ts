import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HouseholdProvider } from 'src/providers/household';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-view-house-profile',
  templateUrl: './view-house-profile.page.html',
  styleUrls: ['./view-house-profile.page.scss'],
})
export class ViewHouseProfilePage implements OnInit {
  houseImage!: any
  selectedSegment!: any
  houseData!: any
  houseID!: any
  DisplayImages!:any
  houseID_delete:any
  constructor(private navController: NavController, public household: HouseholdProvider,public alertController:AlertController) { }

  ngOnInit() {
    const data = history.state.a; // Accessing the passed data
    console.log(data);
    this.houseData = data
    this.houseImage = data.houseImage
    this.houseID = data.houseID
    this.get_HouseDeatilsWithImages();
  }
  GoToUpload() {
    console.log(this.houseData)
    var House_data = this.houseData
    this.navController.navigateForward(['/add-house-mulitple-images'], {
      state: { House_data }
    });
  }
  get_HouseDeatilsWithImages() {
    this.household.getHouseDetailsWithImages(this.houseID).subscribe((data: any) => {
      console.log(data.images)
      this.DisplayImages = data.images
      console.log(this.DisplayImages)

    })
  }
  deleteHouse(a: any) {
    console.log(a)
    this.houseID_delete = a.houseImageID
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
            this.household.DeleteHouseImages(this.houseID_delete).subscribe(_responseDelete => {
              console.log(_responseDelete)
              this.get_HouseDeatilsWithImages();
            })
          }
        }
      ]
    });

    await alert.present();
  }
}
