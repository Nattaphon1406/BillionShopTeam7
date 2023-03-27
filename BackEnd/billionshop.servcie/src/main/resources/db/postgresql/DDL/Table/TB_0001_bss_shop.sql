CREATE TABLE public.bss_shop (
	sh_id int4 NOT NULL DEFAULT nextval('shop_seq'::regclass), -- Auto increment id of shop
	sh_code varchar(8) NOT NULL, -- Shop code for identify which shop
	sh_name varchar(255) NOT NULL, -- Shop name
	sh_create_by varchar(150) NOT NULL, -- User who create this data
	sh_create_date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Date when create this data
	sh_update_by varchar(150) NOT NULL, -- User who update this data
	sh_update_date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Date when update this data
	CONSTRAINT bss_shop_pk PRIMARY KEY (sh_id)
);

-- Column comments

COMMENT ON COLUMN public.bss_shop.sh_id IS 'Auto increment id of shop';
COMMENT ON COLUMN public.bss_shop.sh_code IS 'Shop code for identify which shop';
COMMENT ON COLUMN public.bss_shop.sh_name IS 'Shop name';
COMMENT ON COLUMN public.bss_shop.sh_create_by IS 'User who create this data';
COMMENT ON COLUMN public.bss_shop.sh_create_date IS 'Date when create this data';
COMMENT ON COLUMN public.bss_shop.sh_update_by IS 'User who update this data';
COMMENT ON COLUMN public.bss_shop.sh_update_date IS 'Date when update this data';