CREATE TABLE public.bss_item (
	itm_id int4 NOT NULL DEFAULT nextval('item_seq'::regclass), -- Auto increment id of item
	itm_code varchar(10) NOT NULL, -- Item code for identify which item
	itm_name varchar(255) NOT NULL, -- Item name
	itm_price numeric(7, 2) NOT NULL, -- Price of item
	itm_capacity numeric(6, 2) NOT NULL, -- Capacity of each item
	itm_unit varchar(45) NOT NULL, -- Unit of each item
	"itm_status" varchar(45) NOT NULL, -- Status of each item is "active" or "inactive" 1.active is on sell and 2.inactive is suspend
	itm_min_quantity int4 NOT NULL, -- Minimum quantity of each item in stock
	itm_cost numeric(7, 2) NOT NULL, -- Cost of each item
	itm_order_quantity int4 NOT NULL, -- Quantity when want to order this item
	itm_category varchar(3) NOT NULL, -- Category of each item
	itm_purchase_frequency int4 NOT NULL, -- Order frequency
	itm_order_unit varchar(45) NOT NULL, -- Unit of item when order item
	itm_sell_unit varchar(45) NOT NULL, -- Unit of item when sell item
	itm_img_path text NOT NULL, -- Path for locate image
	itm_create_by varchar(150) NOT NULL, -- User who create this data
	itm_create_date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Date when create this data
	itm_update_by varchar(150) NOT NULL, -- User who update this data
	itm_update_date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Date when update this data
	itm_sh_id int4 NOT NULL, -- Foreign of shop for reference to which shop
	CONSTRAINT bss_item_pkey PRIMARY KEY (itm_id)
);

-- Column comments

COMMENT ON COLUMN public.bss_item.itm_id IS 'Auto increment id of item';
COMMENT ON COLUMN public.bss_item.itm_code IS 'Item code for identify which item';
COMMENT ON COLUMN public.bss_item.itm_name IS 'Item name';
COMMENT ON COLUMN public.bss_item.itm_price IS 'Price of item';
COMMENT ON COLUMN public.bss_item.itm_capacity IS 'Capacity of each item';
COMMENT ON COLUMN public.bss_item.itm_unit IS 'Unit of each item';
COMMENT ON COLUMN public.bss_item."itm_status" IS 'Status of each item is "active" or "inactive" 1.active is on sell and 2.inactive is suspend';
COMMENT ON COLUMN public.bss_item.itm_min_quantity IS 'Minimum quantity of each item in stock';
COMMENT ON COLUMN public.bss_item.itm_cost IS 'Cost of each item';
COMMENT ON COLUMN public.bss_item.itm_order_quantity IS 'Quantity when want to order this item';
COMMENT ON COLUMN public.bss_item.itm_category IS 'Category of each item';
COMMENT ON COLUMN public.bss_item.itm_purchase_frequency IS 'Order frequency';
COMMENT ON COLUMN public.bss_item.itm_order_unit IS 'Unit of item when order item';
COMMENT ON COLUMN public.bss_item.itm_sell_unit IS 'Unit of item when sell item';
COMMENT ON COLUMN public.bss_item.itm_img_path IS 'Path for locate image';
COMMENT ON COLUMN public.bss_item.itm_create_by IS 'User who create this data';
COMMENT ON COLUMN public.bss_item.itm_create_date IS 'Date when create this data';
COMMENT ON COLUMN public.bss_item.itm_update_by IS 'User who update this data';
COMMENT ON COLUMN public.bss_item.itm_update_date IS 'Date when update this data';
COMMENT ON COLUMN public.bss_item.itm_sh_id IS 'Foreign of shop for reference to which shop';


-- public.bss_item foreign keys

ALTER TABLE public.bss_item ADD CONSTRAINT bss_item_fk1 FOREIGN KEY (itm_sh_id) REFERENCES public.bss_shop(sh_id);