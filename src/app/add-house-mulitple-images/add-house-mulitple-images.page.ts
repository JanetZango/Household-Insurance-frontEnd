import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddHouse } from 'src/models/AddHouse.model';
import { HouseholdProvider } from 'src/providers/household';
import { AlertController } from '@ionic/angular';
import { AuthProvider } from 'src/providers/Auth';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-add-house-mulitple-images',
  templateUrl: './add-house-mulitple-images.page.html',
  styleUrls: ['./add-house-mulitple-images.page.scss'],
})
export class AddHouseMulitpleImagesPage implements OnInit {
  selectedImages: File[] = [];
  imagePreviews: string[] = [];
  address!: any
  description!: any
  houseID!:any
  longitude!:any
  latitude!:any
  houseImage!:any
  location!:any
  CurrentlyLoggedInUser!:any
  DataOfLoggedInPerson!:any
  HouseUrl="../../assets/defaultImage.jpg";
  Imagerr:any[]=[]
private AddHouse!:AddHouse
  constructor(private route: ActivatedRoute,public household:HouseholdProvider,public alertCtrl: AlertController,public auth:AuthProvider) { }

  ngOnInit() {
    const data = history.state.House_data; // Accessing the passed data
    console.log(data);
    this.address = data.address
    this.description = data.description
    this.houseID= data.HouseID
    this.latitude = data.latitude
    this.longitude = data.longitude
    this.houseImage = data.houseImage

  }
  getLoggedinSavedData(){
    this.auth.getLoggedInUserDetails().then(data=>{
      console.log(data)
      this.CurrentlyLoggedInUser = data.queryParams.emailAddres
      console.log(this.CurrentlyLoggedInUser)
      this.getAllRegisteredUsersOnTheSystem();
      })
  }

  getAllRegisteredUsersOnTheSystem(){
    this.household.getRegisteredUser().subscribe((data:any)=>{
      console.log(data.userList,"users")
      var getAllUsers = data.userList
      for(var i=0; i < getAllUsers.length;i++){
        if(this.CurrentlyLoggedInUser == getAllUsers[i].emailAddress ){
          console.log(getAllUsers[i],"yes")
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
  // Handle file input change
  // onFileChange(event: any) {
  //   const files = event.target.files;
  //   if (files.length > 0) {
  //     this.selectedImages = Array.from(files);
  //     console.log(this.selectedImages)

  //     // Show image previews
  //     this.imagePreviews = [];
  //     console.log(this.imagePreviews)
  //     for (let i = 0; i < this.selectedImages.length; i++) {
  //       const reader = new FileReader();
  //       reader.onload = (e: any) => {
  //         this.imagePreviews.push(e.target.result);
  //       };
  //       reader.readAsDataURL(this.selectedImages[i]);
  //     }
  //   }
  // }
  uploadImages() {
    // if (this.selectedImages.length > 0) {
    //   const formData = new FormData();
    //   console.log(formData)
    //   for (let image of this.selectedImages) {
    //     console.log(this.selectedImages)
    //     formData.append('images', image);
    //   }

      let obj={
        houseImage:this.HouseUrl
      }
      console.log(obj)

      var uploadImage = obj
      console.log(uploadImage)
      this.Imagerr.push(uploadImage)
      console.log(this.Imagerr)

      this.AddHouse = new AddHouse
      this.AddHouse.description = this.description
      this.AddHouse.houseImage = this.houseImage
      this.AddHouse.address = this.address
      this.AddHouse.userID = this.DataOfLoggedInPerson
      this.AddHouse.location = this.location
      this.AddHouse.latitude = this.latitude
      this.AddHouse.longitude = this.longitude
      this.AddHouse.images= this.Imagerr
  
      console.log(this.AddHouse)
       this.household.SaveHouse(this.AddHouse).subscribe(async (_responseHouse:any) => {
        console.log(_responseHouse)
         const alert = await this.alertCtrl.create({
          // header: "Oh no!",
          message: "Image successfully saved",
          buttons: ['OK'],
          cssClass: "myAlert",
        });
        await alert.present();
  
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

      console.log('Uploading images...', this.selectedImages);
    } 
    
    
  

  


}
