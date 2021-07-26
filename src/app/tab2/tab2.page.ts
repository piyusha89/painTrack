import { Component } from '@angular/core';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {

  dates: any;
  painList:any = [];
  constructor(private storageService: StorageService) { }

  ionViewWillEnter() {
    this.painList = this.storageService.getPainLevel();
    this.storageService.pains.subscribe((data)=>{
      this.painList = data
      console.log(this.painList);
    })
    
  }

}
