export interface Sso001 {
    itm_code: String;
    itm_name: String;
    itm_capacity: number;
    itm_unit: String;
    itm_sell_quantity: number;
    itm_sell_unit: String;
    itm_sales: number;
    itm_sales_all: number;
}

export interface searchReport{
    dateFrom: string;
    dateTo: string;
    shopId: number;
    data: string;
}