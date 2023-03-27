/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { EMPTY } from 'rxjs';
import { AppModule } from '../../../app/app.module';
import { Demo001Service } from '../service/demo001.service';
import { itemDetailModel } from './model/demo0010.model';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';


@Component({
  selector: 'app-demo001',
  templateUrl: './demo001.component.html',
  styleUrls: ['./demo001.component.scss'],
})
export class Demo001Component implements OnInit {

  public item: Array<itemDetailModel> = [] as Array<itemDetailModel>;
  public srchItem: any;
  public testShow = true;
  public checkVal: any;

  public base64Image: any;

  constructor(
    private demo001Service: Demo001Service,
    private camera: Camera
    ) {
     }


  ngOnInit() {
    this.demo001Service.getTabldata().subscribe(res => {
      this.item = res as itemDetailModel[];
      this.srchItem = this.item;
    });

  }

  search(event) {
    const val = event.target.value;
    if (val && val.trim() !== '') {
      this.checkVal = this.srchItem = this.item.filter(e =>
        e.itemCode === val ||
        e.itemDesc === val);
    }
    else {
      this.srchItem = this.item;
    }
  }

  openCamera() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      cameraDirection: this.camera.PictureSourceType.CAMERA
    };
    this.camera.getPicture(options).then((imageData) => {

      this.base64Image = 'data:image/jpeg;base64,' + imageData;
     }, (err) => {
     });
}

  edit(itemCd){
    console.log(itemCd);
  }

  btnAdd(){
    console.log('====================================');
    console.log('base64',this.base64Image);
    console.log('====================================');
  }
}
