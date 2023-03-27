import { Component, OnInit } from '@angular/core';
import { ItmChooseListService } from './service/itm-choose-list.service';
import { itemList } from './item-list-model/itemList';
import { Location } from '@angular/common';
import { CommonService } from '../../services/common/common.service';

@Component({
  selector: 'app-itm-choose-list',
  templateUrl: './itm-choose-list.component.html',
  styleUrls: ['./itm-choose-list.component.scss'],
})
export class ItmChooseListComponent implements OnInit {
  public item:itemList;
  public srchItem: itemList;
  public showListItem = true;

  constructor(
    private ItmChooseListService: ItmChooseListService,
    private location: Location,
    private common: CommonService
  ) { }

  ngOnInit() {
    this.getItemList();
  }

  ionViewWillEnter(){
    this.ItmChooseListService.listItem = null;
    this.getItemList();
  }

  checkDataItem() {
    if (Object.keys(this.item).length == 0) {
      this.showListItem = false;
    } else {
      this.showListItem = true;
    }
  }

  getItemList(){
    this.ItmChooseListService.findItemList().subscribe(res => {
      this.item = res;
      this.srchItem = this.item;
      this.checkDataItem();
    });
  }

  getItemListByData(data:string){
    this.ItmChooseListService.findItemListByData(data).subscribe(res => {
      this.item = res;
      this.srchItem = this.item;
      this.checkDataItem();
    });
  }



  search(event) {

    let val = event.target.value;
    if (val && val.trim() !== '') {
        this.getItemListByData(event.target.value.toString());
    }
    else if(val.trim() === ''){
      this.common.dataSearch = '';
      this.showListItem = true;
      this.common.getBarcode = "";
      this.getItemList();
    }
  }

  chooseItem(itemCd){
    let checker = -1;
    for(let i=0;i<Object.keys(this.srchItem).length;i++){
      if(this.srchItem[i].itm_id == itemCd){
        checker = i;
        break;
      }
    }
    this.ItmChooseListService.listItem = this.srchItem[checker];
    this.location.back();
  }

}
