CREATE TABLE public.bss_receive_inventory_detail (
	rid_id int4 NOT NULL DEFAULT nextval('rid_seq'::regclass), -- receive id
	rid_receive_quantity int4 NOT NULL, -- receive quantity
	rid_purchase_price numeric(8, 2) NOT NULL, -- receive purchase price
	rid_quantity_per_unit int4 NOT NULL, -- receive quantity per unit
	rid_item_unit varchar(150) NOT NULL, -- receive item unit
    rid_order_unit varchar(45) NULL, -- receive order unit
	rid_create_by varchar(150) NOT NULL, -- receive username
	rid_create_date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, -- receive create date
	rid_update_by varchar(150) NOT NULL, -- receive update by user
	rid_update_date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, -- receive update date    
	rid_itm_id int4 NULL, -- receive item id
	rid_ri_id int4 NULL, -- receive id
	CONSTRAINT bss_receive_inventory_detail_pkey PRIMARY KEY (rid_id)
);

-- Column comments

COMMENT ON COLUMN public.bss_receive_inventory_detail.rid_id IS 'receive id';
COMMENT ON COLUMN public.bss_receive_inventory_detail.rid_receive_quantity IS 'receive quantity';
COMMENT ON COLUMN public.bss_receive_inventory_detail.rid_purchase_price IS 'receive purchase price';
COMMENT ON COLUMN public.bss_receive_inventory_detail.rid_quantity_per_unit IS 'receive quantity per unit';
COMMENT ON COLUMN public.bss_receive_inventory_detail.rid_item_unit IS 'receive item unit';
COMMENT ON COLUMN public.bss_receive_inventory_detail.rid_order_unit IS 'receive order unit';
COMMENT ON COLUMN public.bss_receive_inventory_detail.rid_create_by IS 'receive username';
COMMENT ON COLUMN public.bss_receive_inventory_detail.rid_create_date IS 'receive create date';
COMMENT ON COLUMN public.bss_receive_inventory_detail.rid_update_by IS 'receive update by user';
COMMENT ON COLUMN public.bss_receive_inventory_detail.rid_update_date IS 'receive update date    ';
COMMENT ON COLUMN public.bss_receive_inventory_detail.rid_itm_id IS 'receive item id';
COMMENT ON COLUMN public.bss_receive_inventory_detail.rid_ri_id IS 'receive id';


-- public.bss_receive_inventory_detail foreign keys

ALTER TABLE public.bss_receive_inventory_detail ADD CONSTRAINT bss_receive_inventory_detail_fk1 FOREIGN KEY (rid_itm_id) REFERENCES public.bss_item(itm_id);
ALTER TABLE public.bss_receive_inventory_detail ADD CONSTRAINT bss_receive_inventory_detail_fk2 FOREIGN KEY (rid_ri_id) REFERENCES public.bss_receive_inventory_header(ri_id);