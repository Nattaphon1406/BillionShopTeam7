export interface PcoDetailItemList {
    itm_id:number;
    itm_code:string;
    itm_name:string;
    itm_capacity:number;
    itm_unit:string;
    itm_quantity_per_unit:number;
    itm_order_quantity:string;
    itm_order_unit:string;
    itm_sell_unit:string;
    itm_order_Pack:number;
}

export interface ItemId {
    itmid:number;
}

export interface PcoHeader{
      poId:number;
      poCode:string;
      poGenUser:string;
      poStatus:string;
      poDate:string;
}

export interface PoId {
    poId:number;
}