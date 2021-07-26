import { Component } from '@angular/core';
import { ToastserviceService } from '../services/toastservice.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  pains = [];
  level: any = 0;
  constructor(private toastService: ToastserviceService,
    private storageService: StorageService) {

  }

  ionViewWillEnter() {
    this.storageService.getPainLevel();
    this.storageService.pains.subscribe((data) => {
      let prev = data
      if (prev.length > 0) {
        this.pains = prev
      } else {
        this.pains = this.pains;
      }
    })

  }

  toggleTheme(event) {
    if (event.detail.checked) {
      document.body.setAttribute('color-theme', 'dark')
    }
    else {
      document.body.setAttribute('color-theme', 'light')
    }
  }

  rangeSelect(event) {
    console.log(event)
    this.level = event.detail.value;
    this.storageService.getPainLevel();
  }

  onClick() {
    if (this.level) {
      let date = new Date();
      const pain = {
        level: this.level,
        time: date
      }
      console.log(pain);
      this.pains.unshift(pain);
      this.storageService.setPainLevel(this.pains);
      this.level=0;
      this.toastService.show("Pain Level Updated Successfully");
    }
    else {
      this.toastService.show("Please Select Pain Level");
    }
  }
}
