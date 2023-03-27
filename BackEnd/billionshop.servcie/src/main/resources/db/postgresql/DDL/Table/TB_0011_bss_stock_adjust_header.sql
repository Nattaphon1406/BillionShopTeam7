CREATE TABLE public.bss_stock_adjust_header (
	sa_id int4 NOT NULL DEFAULT nextval('adj_seq'::regclass), -- Stock Adjust Header of ID
	sa_code varchar(9) NOT NULL, -- Stock Adjust Header Code
	sa_date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Document Date Stock Adjust Header Code
	sa_gen_user varchar(150) NOT NULL, -- User Generate Stock Adjust Header
	sa_reason varchar(150) NOT NULL, -- Reason Stock Adjust Header
	sa_note varchar(255) NULL, -- Note Stock Adjust Header
	sa_create_by varchar(150) NOT NULL, -- Stock Adjust Header Created by User
	sa_create_date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Stock Adjust Header Created on Date
	sa_update_by varchar(150) NOT NULL, -- Stock Adjust Header Updated by User
	sa_update_date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Stock Adjust Header Updated on Date
	sa_sh_id int4 NOT NULL, -- Shop ID
	CONSTRAINT bss_stock_adjust_header_pkey PRIMARY KEY (sa_id)
);

-- Column comments

COMMENT ON COLUMN public.bss_stock_adjust_header.sa_id IS 'Stock Adjust Header of ID';
COMMENT ON COLUMN public.bss_stock_adjust_header.sa_code IS 'Stock Adjust Header Code';
COMMENT ON COLUMN public.bss_stock_adjust_header.sa_date IS 'Document Date Stock Adjust Header Code';
COMMENT ON COLUMN public.bss_stock_adjust_header.sa_gen_user IS 'User Generate Stock Adjust Header';
COMMENT ON COLUMN public.bss_stock_adjust_header.sa_reason IS 'Reason Stock Adjust Header';
COMMENT ON COLUMN public.bss_stock_adjust_header.sa_note IS 'Note Stock Adjust Header';
COMMENT ON COLUMN public.bss_stock_adjust_header.sa_create_by IS 'Stock Adjust Header Created by User';
COMMENT ON COLUMN public.bss_stock_adjust_header.sa_create_date IS 'Stock Adjust Header Created on Date';
COMMENT ON COLUMN public.bss_stock_adjust_header.sa_update_by IS 'Stock Adjust Header Updated by User';
COMMENT ON COLUMN public.bss_stock_adjust_header.sa_update_date IS 'Stock Adjust Header Updated on Date';
COMMENT ON COLUMN public.bss_stock_adjust_header.sa_sh_id IS 'Shop ID';


-- public.bss_stock_adjust_header foreign keys

ALTER TABLE public.bss_stock_adjust_header ADD CONSTRAINT bss_stock_adjust_header_fk1 FOREIGN KEY (sa_sh_id) REFERENCES public.bss_shop(sh_id);
