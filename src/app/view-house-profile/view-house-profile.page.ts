import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-view-house-profile',
  templateUrl: './view-house-profile.page.html',
  styleUrls: ['./view-house-profile.page.scss'],
})
export class ViewHouseProfilePage implements OnInit {
  houseImage!:any
  selectedSegment!:any
  houseData!:any
  constructor(private navController: NavController) { }

  ngOnInit() {
    const data = history.state.a; // Accessing the passed data
    console.log(data);
    this.houseData = data
    this.houseImage= data.houseImage
    console.log(this.houseImage)
  }
  GoToUpload(){
    console.log(this.houseData)
    var House_data = this.houseData
    this.navController.navigateForward(['/add-house-mulitple-images'], {
      state: { House_data }
    });
  }
}
