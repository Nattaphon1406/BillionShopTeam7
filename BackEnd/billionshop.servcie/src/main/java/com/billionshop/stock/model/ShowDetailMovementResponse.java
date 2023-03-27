package com.billionshop.stock.model;
import lombok.Data;

@Data
public class ShowDetailMovementResponse {
    String sm_tranasation_type;
    String sm_effect;
    Integer sm_quantity;
    String itm_unit;
    String itmsellunit;
}
