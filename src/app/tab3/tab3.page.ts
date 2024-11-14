import { Component } from '@angular/core';
import { AuthProvider } from 'src/providers/Auth';
import { HouseholdProvider } from 'src/providers/household';
import { Router, NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  CurrentlyLoggedInUser!:any
  DataOfLoggedInrPerson!:any
  displayNameCurrentLoggedIn:any
  emailAdddresCurrentLoggedIn:any
  userIDCurrentLoggedIn:any
  houseListArray:any
  houseID_delete:any

  constructor(public auth:AuthProvider,public household:HouseholdProvider, private router: Router,private navController: NavController) {
    this.getLoggedinSavedData();
    this.getAllRegisteredUsersOnTheSystem();
    this.getRegisteredHouses();
  }
  ionViewWillEnter(){
    this.getLoggedinSavedData();
    this.getAllRegisteredUsersOnTheSystem();
    this.getRegisteredHouses();
  }
  getLoggedinSavedData(){
    this.auth.getLoggedInUserDetails().then(data=>{
      this.CurrentlyLoggedInUser = data.queryParams.emailAddres
      })

  }
  getAllRegisteredUsersOnTheSystem(){
    this.household.getRegisteredUser().subscribe((data:any)=>{
      var getAllUsers = data.userList
      for(var i=0; i < getAllUsers.length;i++){
        if(this.CurrentlyLoggedInUser == getAllUsers[i].emailAddress ){
        let obj ={
          emailAddress: getAllUsers[i].emailAddress,
          userID:getAllUsers[i].userID,
          displayName:getAllUsers[i].displayName
        }
        this.displayNameCurrentLoggedIn = obj.displayName
        this.emailAdddresCurrentLoggedIn = obj.emailAddress
        this.userIDCurrentLoggedIn =obj.userID
      }
      }
      })
  }
  getRegisteredHouses(){
    this.household.GetHousesSaved().subscribe((_responsegetHouses:any) =>{
      this.houseListArray = _responsegetHouses.housesList
    })
  }


  VireMoreDetails(a:any){
    this.router.navigate(['/view-house-profile'], {
      state: { a }
    });
  }
}
