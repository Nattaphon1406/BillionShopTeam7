export interface ItemsPutInsertRequest {
    itm_code:String;
	itm_name:String;
	itm_capacity:number;
    itm_price:number;
    itm_cost:number;
    itm_min_quantity:number;
    itm_order_quantity:number;
    itm_purchase_frequency:number;
    itm_unit:String;
    itm_status:String;
    itm_order_unit:String;
    itm_sell_unit:String;
    itm_img_path:String;
    itm_create_by:String;
    itm_update_by:String;
    itm_sh_id:number;
}

export interface ItemsPutUpdateRequest {
    itm_id:number;
	itm_name:String;
	itm_capacity:number;
    itm_price:number;
    itm_cost:number;
    itm_min_quantity:number;
    itm_order_quantity:number;
    itm_purchase_frequency:number;
    itm_unit:String;
    itm_status:String;
    itm_order_unit:String;
    itm_sell_unit:String;
    itm_img_path:String;
    itm_update_by:String;
}

export interface itm002 {
    itmCode: string;
}

export interface itm002Model {
	itm_name: string;
	itm_capacity: string;
	itm_price: Number;
	itm_cost: string;
	itm_min_quantity: Number;
	itm_order_quantity: Number;
	itm_purchase_frequency: Number;
	itm_unit: string;
	itm_order_unit: string;
	itm_sell_unit: string;
	itm_img_path: string;
	itm_create_by: string;
	itm_update_by: string;
	itm_sh_id: Number;
}

export interface itmModeldata {
	itm_id: Number;
	itm_code: string;
	itm_name: string;
	itm_price: Number;
	itm_capacity: Number;
	itm_unit: string;
	itm_status: string;
	itm_min_quantity: Number;
	itm_cost: Number;
	itm_order_quantity: Number; z
	itm_category: string;
	itm_purchase_frequency: Number;
	itm_order_unit: string;
	itm_sell_unit: string;
	itm_img_path: string;
	itm_create_by: string;
	itm_create_date: string;
	itm_update_by: string;
	itm_update_date: string;
	itm_sh_id: Number;
}

export interface itmBarcode {
    barcodeType: String;
    dataBarcode: String;
}

export interface itmId {
    itemId: number;
}

export interface barcodeDetail {
    key: number,
    option: String,
    type: String,
    barcode: String
  }

export interface itmInfo{
  itm_id: number;
  itm_code: string;
  itm_name: string;
  itm_price: string;
  itm_capacity: string;
  itm_unit: string;
  itm_status: string;
  itm_min_quantity: string;
  itm_cost: number;
  itm_order_quantity: string;
  itm_category: string;
  itm_purchase_frequency: string;
  itm_order_unit: string;
  itm_sell_unit: string;
  itm_img_path: string;
  itm_create_by: string;
  itm_create_date: string;
  itm_update_by: string;
  itm_update_date: string;
  itm_sh_id: string;
}

export interface ItmDetail001 {
    id : number
    itemcode: string;
    itemname: string;
    barcode: string;
    statusitem: string;
    img: string;
    itemcapacity: string;
    itemunit: string;
}

export interface ItmDefaultImg {
    itemimg: string;
}
