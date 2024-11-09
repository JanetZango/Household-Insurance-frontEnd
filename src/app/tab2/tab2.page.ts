import { Component } from '@angular/core';
import { HouseholdProvider } from 'src/providers/household';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {
  houseListArray:any
  constructor(public household:HouseholdProvider) {
   this.getRegisteredHouses();
  }
  getRegisteredHouses(){
    this.household.GetHousesSaved().subscribe((_responsegetHouses:any) =>{
      console.log(_responsegetHouses)
      console.log(_responsegetHouses.housesList ,"house")
      this.houseListArray = _responsegetHouses.housesList
      console.log(this.houseListArray.houseImage,"house")
    })
  }

}
