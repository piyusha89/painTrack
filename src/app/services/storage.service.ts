import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject } from 'rxjs';
import { ToastController, Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class StorageService {
  
  private _storage: Storage | null = null;
  pains: BehaviorSubject<Array<any>> = new BehaviorSubject([]);
  
  constructor(private platform: Platform,private storage: Storage) {
    this.platform.ready().then(() => {
      this.init();
    });
  }
  
  
  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async setPainLevel(painArray){
    console.log(painArray);
    this._storage.set('pains', JSON.stringify(painArray));
    this.getPainLevel();
    // let data:any = await this._storage.get('pains')
    // console.log(JSON.parse(data));
    // console.log(data);
  }

  async getPainLevel(){
    let pains = await this._storage.get('pains');
    if(pains == null){
       this.pains.next([]);
    }
    else{
      pains = JSON.parse(pains);
      this.pains.next(pains);
      console.log(this.pains)
    }
    
  }


  public get painListValue() {
    return this.pains.value;
  }

}
