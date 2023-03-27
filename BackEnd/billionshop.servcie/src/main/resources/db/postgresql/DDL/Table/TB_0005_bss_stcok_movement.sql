-- public.bss_stock_movement definition

-- Drop table

-- DROP TABLE bss_stock_movement;

CREATE TABLE bss_stock_movement (
	sm_id int4 NOT NULL DEFAULT nextval('stock_movement_seq'::regclass),
	sm_balance_forward int4 NOT NULL,
	sm_balance int4 NOT NULL,
	sm_transaction_type varchar(3) NOT NULL,
	sm_date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	sm_quantity int4 NOT NULL,
	sm_effect varchar(3) NOT NULL,
	sm_create_by varchar(150) NOT NULL,
	sm_create_date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	sm_update_by varchar(150) NOT NULL,
	sm_update_date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	sm_itm_id int4 NOT NULL,
	sm_sh_id int4 NOT NULL,
	sm_transaction_id int4 NULL,
	sm_amount numeric(7, 2) NULL,
	CONSTRAINT bss_stock_movement_pkey PRIMARY KEY (sm_id)
);


-- public.bss_stock_movement foreign keys

ALTER TABLE public.bss_stock_movement ADD CONSTRAINT bss_stock_movement_fk1 FOREIGN KEY (sm_itm_id) REFERENCES bss_item(itm_id);
ALTER TABLE public.bss_stock_movement ADD CONSTRAINT bss_stock_movement_fk2 FOREIGN KEY (sm_sh_id) REFERENCES bss_shop(sh_id);