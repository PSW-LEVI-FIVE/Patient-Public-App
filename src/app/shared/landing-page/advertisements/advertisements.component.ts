
import { IAdvertisement } from './../model/advertisement.model';
import { Component, OnInit } from '@angular/core';
import { AdvertisementService } from '../service/advertisement.service';

@Component({
  selector: 'app-advertisements',
  templateUrl: './advertisements.component.html',
  styleUrls: ['./advertisements.component.css']
})
export class AdvertisementsComponent implements OnInit {

    public advertisements: IAdvertisement[] = [];
    constructor(private advertisementService: AdvertisementService) { }

    ngOnInit(): void { 
        this.advertisementService.getAll().subscribe(res => {
          this.advertisements = res;
          console.log(this.advertisements)
        })
      }

}
