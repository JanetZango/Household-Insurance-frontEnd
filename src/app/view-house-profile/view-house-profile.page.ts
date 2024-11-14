import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HouseholdProvider } from 'src/providers/household';
import { AlertController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-view-house-profile',
  templateUrl: './view-house-profile.page.html',
  styleUrls: ['./view-house-profile.page.scss'],
})
export class ViewHouseProfilePage implements OnInit {
  houseImage!: any
  selectedSegment="home"
  houseData!: any
  houseID!: any
  DisplayImages!:any
  houseID_delete:any
  constructor(private navController: NavController, public household: HouseholdProvider,public alertController:AlertController, private router: Router) { }

  ngOnInit() {
    const data = history.state.a; // Accessing the passed data
    this.houseData = data
    this.houseImage = data.houseImage
    this.houseID = data.houseID
    this.get_HouseDeatilsWithImages();
  }
  ionViewWillEnter(){
    // const data = history.state.a; // Accessing the passed data
    // this.houseData = data
    // this.houseImage = data.houseImage
    // this.houseID = data.houseID
    this.get_HouseDeatilsWithImages();
  }
  GoToUpload() {
    var House_data = this.houseData
    this.navController.navigateForward(['/add-house-mulitple-images'], {
      state: { House_data }
    });
  }
  get_HouseDeatilsWithImages() {
    this.household.getHouseDetailsWithImages(this.houseID).subscribe((data: any) => {
      this.DisplayImages = data.images
    })
  }
  deleteHouse(a: any) {
    this.houseID_delete = a.houseImageID
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
            this.household.DeleteHouseImages(this.houseID_delete).subscribe(_responseDelete => {
              this.get_HouseDeatilsWithImages();
            })
          }
        }
      ]
    });
    await alert.present();
  }
  GobACK(){
    this.router.navigate(['/tabs/tab3'])
  }
}
