CREATE TABLE public.bss_receipt (
	rc_id int4 NOT NULL DEFAULT nextval('rec_seq'::regclass), -- Receipt ID
	rc_code varchar(15) NOT NULL, -- Receipt code
	rc_gen_date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Receipt Generate Date
	rc_total_price numeric(7, 2) NOT NULL, -- Total price
	rc_change numeric(7, 2) NOT NULL, -- Change
	rc_cash numeric(7, 2) NOT NULL, -- Receipt Cash
	rc_create_by varchar(150) NOT NULL, -- Create by?
	rc_create_date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Create date
	rc_update_by varchar(150) NOT NULL, -- Update by
	rc_update_date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Update date
	rc_sh_id int4 NOT NULL, -- Shop_id
	CONSTRAINT bss_receipt_pkey PRIMARY KEY (rc_id)
);

-- Column comments

COMMENT ON COLUMN public.bss_receipt.rc_id IS 'Receipt ID';
COMMENT ON COLUMN public.bss_receipt.rc_code IS 'Receipt code';
COMMENT ON COLUMN public.bss_receipt.rc_gen_date IS 'Receipt Generate Date';
COMMENT ON COLUMN public.bss_receipt.rc_total_price IS 'Total price';
COMMENT ON COLUMN public.bss_receipt.rc_change IS 'Change';
COMMENT ON COLUMN public.bss_receipt.rc_cash IS 'Receipt Cash';
COMMENT ON COLUMN public.bss_receipt.rc_create_by IS 'Create by?';
COMMENT ON COLUMN public.bss_receipt.rc_create_date IS 'Create date';
COMMENT ON COLUMN public.bss_receipt.rc_update_by IS 'Update by';
COMMENT ON COLUMN public.bss_receipt.rc_update_date IS 'Update date';
COMMENT ON COLUMN public.bss_receipt.rc_sh_id IS 'Shop_id';


-- public.bss_receipt foreign keys

ALTER TABLE public.bss_receipt ADD CONSTRAINT bss_receipt_fk1 FOREIGN KEY (rc_sh_id) REFERENCES public.bss_shop(sh_id);