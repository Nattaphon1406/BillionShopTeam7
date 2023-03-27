export interface rcv002 {
    itm_id: number;
    itm_code: String;
    itm_name: String;
    itm_capacity: number;
    itm_unit: String;
    itm_quantity_per_unit: number;
    itm_sell_unit: String;
    itm_order_unit: String
    order_quantity: string;
    ordAmount: string;
}

export interface RcvDeleteDetailRequest {
    rid_itm_id: number,
    ri_code: String
}

export interface RcvPutHeadRequest {
    ri_code: String;
    ri_gen_user: String;
    ri_create_by: String;
    ri_update_by: String;
    ri_status: String
    shopId: number;
    poId: number;
}

export interface RcvPutDetailRequest {
    rid_itm_id: number;
    rid_receive_quantity_per_unit: number;
    rid_itm_order_unit: String;
    rid_itm_sell_unit: String;
    rid_order_unit: String;
    rid_receive_quantity: number;
    rid_purchase_price: number;
    rid_create_by: String;
    rid_update_by: String;
    ri_code: String;
    shop_id: number;
}