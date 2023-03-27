export interface ajs00102 {
    itm_id: number;
    itm_code: string;
    itm_name: string;
    itm_capacity: number;
    itm_sell_unit: string;
    sad_quantity: string;
    itm_unit: string;
    itm_stock:number;
}

export interface delAjsItem {
    itm_id: number;
    ajs_code: string;
}

export interface stockAdjustDetailRequest{
    saGenUser: string;
	saQuantity: number;
	itmId: number;
}

export interface stockAdjustHeaderRequest{
    saGenUser: string;
	saReason: string;
	saNote: string;
    saUserCreate: string;
    saUserUpdate: string;
}

export interface genCode{
    saCode:string;
}

export interface getSaId{
    saId:number;
}