CREATE TABLE public.bss_purchase_order_detail (
	pod_id int4 NOT NULL DEFAULT nextval('pod_seq'::regclass), -- purchase order detail primary key
	pod_quantity_per_unit int4 NOT NULL, -- quantity/unit this item in purchase order detail
	pod_order_quantity int4 NOT NULL, -- quantity order this item in purchase order detail
	pod_item_unit varchar(45) NOT NULL, -- item unit this item in purchase order detail
	pod_order_unit varchar(45) NOT NULL, -- order unit this item in purchase order detail
	pod_create_by varchar(150) NOT NULL, -- purchase order detail create by user
	pod_create_date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, -- when create purchase order detail
	pod_update_by varchar(150) NOT NULL, -- purchase order detail update by user
	pod_update_date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, -- when create purchase order detail
	pod_itm_id int4 NOT NULL, -- foreign key item
	pod_po_id int4 NOT NULL, -- foreign key purchase order header
	CONSTRAINT bss_purchase_order_detail_pkey PRIMARY KEY (pod_id)
);

-- Column comments

COMMENT ON COLUMN public.bss_purchase_order_detail.pod_id IS 'purchase order detail primary key';
COMMENT ON COLUMN public.bss_purchase_order_detail.pod_quantity_per_unit IS 'quantity/unit this item in purchase order detail';
COMMENT ON COLUMN public.bss_purchase_order_detail.pod_order_quantity IS 'quantity order this item in purchase order detail';
COMMENT ON COLUMN public.bss_purchase_order_detail.pod_item_unit IS 'item unit this item in purchase order detail';
COMMENT ON COLUMN public.bss_purchase_order_detail.pod_order_unit IS 'order unit this item in purchase order detail';
COMMENT ON COLUMN public.bss_purchase_order_detail.pod_create_by IS 'purchase order detail create by user';
COMMENT ON COLUMN public.bss_purchase_order_detail.pod_create_date IS 'when create purchase order detail';
COMMENT ON COLUMN public.bss_purchase_order_detail.pod_update_by IS 'purchase order detail update by user';
COMMENT ON COLUMN public.bss_purchase_order_detail.pod_update_date IS 'when create purchase order detail';
COMMENT ON COLUMN public.bss_purchase_order_detail.pod_itm_id IS 'foreign key item';
COMMENT ON COLUMN public.bss_purchase_order_detail.pod_po_id IS 'foreign key purchase order header';


-- public.bss_purchase_order_detail foreign keys

ALTER TABLE public.bss_purchase_order_detail ADD CONSTRAINT item_fkey FOREIGN KEY (pod_itm_id) REFERENCES public.bss_item(itm_id);
ALTER TABLE public.bss_purchase_order_detail ADD CONSTRAINT purchase_order_header_fkey FOREIGN KEY (pod_po_id) REFERENCES public.bss_purchase_order_header(po_id);