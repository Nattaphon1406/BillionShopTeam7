CREATE TABLE public.bss_stock (
	st_id int4 NOT NULL DEFAULT nextval('stock_seq'::regclass), -- primary key stock
	st_balance_forward int4 NULL, -- quantity earlier stock
	st_balance int4 NOT NULL, -- quantity stock
	st_date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, -- latest update date
	st_sale numeric(7, 2) NOT NULL, -- price item
	st_create_by varchar(150) NOT NULL, -- stock creator
	st_create_date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, -- stock create date
	st_update_by varchar(150) NOT NULL, -- stock updater
	st_update_date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, -- stock update date
	st_sh_id int4 NOT NULL, -- foreign key shop
	st_itm_id int4 NOT NULL, -- foreign key item
	CONSTRAINT stock_pkey PRIMARY KEY (st_id)
);

-- Column comments

COMMENT ON COLUMN public.bss_stock.st_id IS 'primary key stock';
COMMENT ON COLUMN public.bss_stock.st_balance_forward IS 'quantity earlier stock';
COMMENT ON COLUMN public.bss_stock.st_balance IS 'quantity stock';
COMMENT ON COLUMN public.bss_stock.st_date IS 'latest update date';
COMMENT ON COLUMN public.bss_stock.st_sale IS 'price item';
COMMENT ON COLUMN public.bss_stock.st_create_by IS 'stock creator';
COMMENT ON COLUMN public.bss_stock.st_create_date IS 'stock create date';
COMMENT ON COLUMN public.bss_stock.st_update_by IS 'stock updater';
COMMENT ON COLUMN public.bss_stock.st_update_date IS 'stock update date';
COMMENT ON COLUMN public.bss_stock.st_sh_id IS 'foreign key shop';
COMMENT ON COLUMN public.bss_stock.st_itm_id IS 'foreign key item';


-- public.bss_stock foreign keys

ALTER TABLE public.bss_stock ADD CONSTRAINT items_fk2 FOREIGN KEY (st_itm_id) REFERENCES public.bss_item(itm_id);
ALTER TABLE public.bss_stock ADD CONSTRAINT shop_fk1 FOREIGN KEY (st_sh_id) REFERENCES public.bss_shop(sh_id);