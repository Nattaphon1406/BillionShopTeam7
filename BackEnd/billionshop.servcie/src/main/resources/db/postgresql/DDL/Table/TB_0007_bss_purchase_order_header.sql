CREATE TABLE public.bss_purchase_order_header (
	po_id int4 NOT NULL DEFAULT nextval('po_seq'::regclass), -- purchase order header primary key
	po_code varchar(9) NOT NULL, -- purchase order header code
	po_date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, -- purchase order header date 
	po_status varchar(3) NOT NULL, -- purchase order header status
	po_gen_user varchar(150) NOT NULL, -- purchase order header generate user
	po_create_by varchar(150) NOT NULL, -- purchase order header create by user
	po_create_date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, -- when create purchase order header
	po_update_by varchar(150) NOT NULL, -- purchase order update by user header
	po_update_date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Date when update purchase order header
	po_sh_id int4 NOT NULL, -- foreign key shop
	CONSTRAINT purchase_order_header_pkey PRIMARY KEY (po_id)
);

-- Column comments

COMMENT ON COLUMN public.bss_purchase_order_header.po_id IS 'purchase order header primary key';
COMMENT ON COLUMN public.bss_purchase_order_header.po_code IS 'purchase order header code';
COMMENT ON COLUMN public.bss_purchase_order_header.po_date IS 'purchase order header date ';
COMMENT ON COLUMN public.bss_purchase_order_header.po_status IS 'purchase order header status';
COMMENT ON COLUMN public.bss_purchase_order_header.po_gen_user IS 'purchase order header generate user';
COMMENT ON COLUMN public.bss_purchase_order_header.po_create_by IS 'purchase order header create by user';
COMMENT ON COLUMN public.bss_purchase_order_header.po_create_date IS 'when create purchase order header';
COMMENT ON COLUMN public.bss_purchase_order_header.po_update_by IS 'purchase order update by user header';
COMMENT ON COLUMN public.bss_purchase_order_header.po_update_date IS 'Date when update purchase order header';
COMMENT ON COLUMN public.bss_purchase_order_header.po_sh_id IS 'foreign key shop';


-- public.bss_purchase_order_header foreign keys

ALTER TABLE public.bss_purchase_order_header ADD CONSTRAINT shop_fkey FOREIGN KEY (po_sh_id) REFERENCES public.bss_shop(sh_id);