CREATE TABLE public.bss_stock_adjust_detail (
	sad_id int4 NOT NULL DEFAULT nextval('adj_detail_seq'::regclass), -- Stock Adjust Detail of ID
	sad_quantity int4 NOT NULL, -- Item quantity
	sad_create_by varchar(150) NOT NULL, -- Stock Adjust Detail Created by User
	sad_create_date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Stock Adjust Detail Created on Date
	sad_update_by varchar(150) NOT NULL, -- Stock Adjust Detail Updated by User
	sad_update_date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Stock Adjust Detail Updated on Date
	sad_itm_id int4 NOT NULL, -- Item ID
	sad_sa_id int4 NOT NULL, -- Stock Adjust Header ID
	CONSTRAINT bss_stock_adjust_detail_pkey PRIMARY KEY (sad_id)
);

-- Column comments

COMMENT ON COLUMN public.bss_stock_adjust_detail.sad_id IS 'Stock Adjust Detail of ID';
COMMENT ON COLUMN public.bss_stock_adjust_detail.sad_quantity IS 'Item quantity';
COMMENT ON COLUMN public.bss_stock_adjust_detail.sad_create_by IS 'Stock Adjust Detail Created by User';
COMMENT ON COLUMN public.bss_stock_adjust_detail.sad_create_date IS 'Stock Adjust Detail Created on Date';
COMMENT ON COLUMN public.bss_stock_adjust_detail.sad_update_by IS 'Stock Adjust Detail Updated by User';
COMMENT ON COLUMN public.bss_stock_adjust_detail.sad_update_date IS 'Stock Adjust Detail Updated on Date';
COMMENT ON COLUMN public.bss_stock_adjust_detail.sad_itm_id IS 'Item ID';
COMMENT ON COLUMN public.bss_stock_adjust_detail.sad_sa_id IS 'Stock Adjust Header ID';


-- public.bss_stock_adjust_detail foreign keys

ALTER TABLE public.bss_stock_adjust_detail ADD CONSTRAINT bss_stock_adjust_detail_fk1 FOREIGN KEY (sad_sa_id) REFERENCES public.bss_stock_adjust_header(sa_id);
ALTER TABLE public.bss_stock_adjust_detail ADD CONSTRAINT bss_stock_adjust_detail_fk2 FOREIGN KEY (sad_itm_id) REFERENCES public.bss_item(itm_id);