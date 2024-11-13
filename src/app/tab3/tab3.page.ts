import { Component } from '@angular/core';
import { AuthProvider } from 'src/providers/Auth';
import { HouseholdProvider } from 'src/providers/household';

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

  constructor(public auth:AuthProvider,public household:HouseholdProvider) {
    this.getLoggedinSavedData();
    this.getAllRegisteredUsersOnTheSystem();
    this.getRegisteredHouses();
  }
  getLoggedinSavedData(){
    this.auth.isLoggedInStatus().then(data=>{
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
          userID:getAllUsers[i].userID,
          displayName:getAllUsers[i].displayName
        }
        console.log(obj)
        this.displayNameCurrentLoggedIn = obj.displayName
        this.emailAdddresCurrentLoggedIn = obj.emailAddress
        this.userIDCurrentLoggedIn =obj.userID
      }
      }
      })
  }
  getRegisteredHouses(){
    this.household.GetHousesSaved().subscribe((_responsegetHouses:any) =>{
      console.log(_responsegetHouses)
      console.log(_responsegetHouses.housesList ,"house")
      this.houseListArray = _responsegetHouses.housesList
      console.log(this.houseListArray.houseImage,"house")
    })
  }
  getindex(a:any){
   console.log(a)
   this.houseID_delete = a.houseID
   console.log(this.houseID_delete)
   this.household.DeleteHouse(this.houseID_delete).subscribe(_responseDelete=>{
    console.log(_responseDelete)
   })
  }
}
