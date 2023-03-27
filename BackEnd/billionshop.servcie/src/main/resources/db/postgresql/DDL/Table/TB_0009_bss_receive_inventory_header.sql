CREATE TABLE public.bss_receive_inventory_header (
	ri_id int4 NOT NULL DEFAULT nextval('ri_seq'::regclass), -- receive id
	ri_code varchar(9) NOT NULL, -- receive code
	ri_gen_user varchar(150) NOT NULL, -- receive generate user
	ri_date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, -- receive date
	ri_status varchar(3) NOT NULL, -- receive status
	ri_create_by varchar(150) NOT NULL, -- receive create by user
	ri_create_date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, -- receive create date
	ri_update_by varchar(150) NOT NULL, -- receive update by user
	ri_update_date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, -- receive update date
	ri_po_id int4 NOT NULL, -- receive purchase order id
	ri_sh_id int4 NOT NULL, -- receive shop id
	CONSTRAINT bss_receive_inventory_header_pkey PRIMARY KEY (ri_id)
);

-- Column comments

COMMENT ON COLUMN public.bss_receive_inventory_header.ri_id IS 'receive id';
COMMENT ON COLUMN public.bss_receive_inventory_header.ri_code IS 'receive code';
COMMENT ON COLUMN public.bss_receive_inventory_header.ri_gen_user IS 'receive generate user';
COMMENT ON COLUMN public.bss_receive_inventory_header.ri_date IS 'receive date';
COMMENT ON COLUMN public.bss_receive_inventory_header.ri_status IS 'receive status';
COMMENT ON COLUMN public.bss_receive_inventory_header.ri_create_by IS 'receive create by user';
COMMENT ON COLUMN public.bss_receive_inventory_header.ri_create_date IS 'receive create date';
COMMENT ON COLUMN public.bss_receive_inventory_header.ri_update_by IS 'receive update by user';
COMMENT ON COLUMN public.bss_receive_inventory_header.ri_update_date IS 'receive update date';
COMMENT ON COLUMN public.bss_receive_inventory_header.ri_po_id IS 'receive purchase order id';
COMMENT ON COLUMN public.bss_receive_inventory_header.ri_sh_id IS 'receive shop id';


-- public.bss_receive_inventory_header foreign keys

ALTER TABLE public.bss_receive_inventory_header ADD CONSTRAINT bss_receive_inventory_header_fk1 FOREIGN KEY (ri_po_id) REFERENCES public.bss_purchase_order_header(po_id);
ALTER TABLE public.bss_receive_inventory_header ADD CONSTRAINT bss_receive_inventory_header_fk2 FOREIGN KEY (ri_sh_id) REFERENCES public.bss_shop(sh_id);