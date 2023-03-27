CREATE TABLE public.bss_receipt_detail (
	rd_id int4 NOT NULL DEFAULT nextval('rec_detail_seq'::regclass), -- Receipt detail ID
	rd_itm_name varchar(255) NOT NULL, -- Item name
	rd_capacity numeric(6, 2) NOT NULL, -- Capacity of Item
	rd_itm_quatity int4 NOT NULL, -- Quatity of item
	rd_capacity_unit varchar(45) NOT NULL, -- Unit of Capacity
	rd_itm_unit varchar(45) NOT NULL, -- Unit of item
	rd_create_by varchar(150) NOT NULL, -- Create by?
	rd_create_date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Create date
	rd_update_by varchar(150) NOT NULL, -- Update by
	rd_update_date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Update date
	rd_itm_id int4 NOT NULL, -- Item ID
	rd_rc_id int4 NOT NULL, -- Receipt header ID
	CONSTRAINT bss_receipt_detail_pkey PRIMARY KEY (rd_id)
);

-- Column comments

COMMENT ON COLUMN public.bss_receipt_detail.rd_id IS 'Receipt detail ID';
COMMENT ON COLUMN public.bss_receipt_detail.rd_itm_name IS 'Item name';
COMMENT ON COLUMN public.bss_receipt_detail.rd_capacity IS 'Capacity of Item';
COMMENT ON COLUMN public.bss_receipt_detail.rd_itm_quatity IS 'Quatity of item';
COMMENT ON COLUMN public.bss_receipt_detail.rd_capacity_unit IS 'Unit of Capacity';
COMMENT ON COLUMN public.bss_receipt_detail.rd_itm_unit IS 'Unit of item';
COMMENT ON COLUMN public.bss_receipt_detail.rd_create_by IS 'Create by?';
COMMENT ON COLUMN public.bss_receipt_detail.rd_create_date IS 'Create date';
COMMENT ON COLUMN public.bss_receipt_detail.rd_update_by IS 'Update by';
COMMENT ON COLUMN public.bss_receipt_detail.rd_update_date IS 'Update date';
COMMENT ON COLUMN public.bss_receipt_detail.rd_itm_id IS 'Item ID';
COMMENT ON COLUMN public.bss_receipt_detail.rd_rc_id IS 'Receipt header ID';


-- public.bss_receipt_detail foreign keys

ALTER TABLE public.bss_receipt_detail ADD CONSTRAINT bss_receipt_detail_fk1 FOREIGN KEY (rd_itm_id) REFERENCES public.bss_item(itm_id);
ALTER TABLE public.bss_receipt_detail ADD CONSTRAINT bss_receipt_detail_fk2 FOREIGN KEY (rd_rc_id) REFERENCES public.bss_receipt(rc_id);