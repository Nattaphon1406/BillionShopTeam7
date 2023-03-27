CREATE TABLE public.bss_barcode (
	bc_id int4 NOT NULL DEFAULT nextval('barcode_seq'::regclass), -- ID of Barcode is primary key 
	bc_code varchar(13) NOT NULL, -- The code consists of 13 characters
	bc_type varchar(3) NOT NULL, -- type of barcode. There are 2 types. 
	bc_create_by varchar(150) NOT NULL, --  Who was this barcode created by? 
	bc_create_date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, --  What date was this barcode created? 
	bc_update_by varchar(150) NOT NULL, --  Who was this barcode updated by? 
	bc_update_date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, --  What date was this barcode updated? 
	bc_itm_id int4 NOT NULL, -- The barcode that was created on whose item? 
	CONSTRAINT bss_barcode_pkey PRIMARY KEY (bc_id)
);

-- Column comments

COMMENT ON COLUMN public.bss_barcode.bc_id IS 'ID of Barcode is primary key ';
COMMENT ON COLUMN public.bss_barcode.bc_code IS 'The code consists of 13 characters';
COMMENT ON COLUMN public.bss_barcode.bc_type IS 'type of barcode. There are 2 types. ';
COMMENT ON COLUMN public.bss_barcode.bc_create_by IS ' Who was this barcode created by? ';
COMMENT ON COLUMN public.bss_barcode.bc_create_date IS ' What date was this barcode created? ';
COMMENT ON COLUMN public.bss_barcode.bc_update_by IS ' Who was this barcode updated by? ';
COMMENT ON COLUMN public.bss_barcode.bc_update_date IS ' What date was this barcode updated? ';
COMMENT ON COLUMN public.bss_barcode.bc_itm_id IS 'The barcode that was created on whose item? ';


-- public.bss_barcode foreign keys

ALTER TABLE public.bss_barcode ADD CONSTRAINT bss_barcode_fk1 FOREIGN KEY (bc_itm_id) REFERENCES public.bss_item(itm_id);