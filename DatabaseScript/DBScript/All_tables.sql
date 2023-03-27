CREATE TABLE bss_shop(
	sh_id					INT										NOT null,
	sh_code					VARCHAR(8)								NOT NULL,
	sh_name					VARCHAR(255)							NOT NULL,
	sh_create_by			VARCHAR(150)							NOT NULL,
	sh_create_date			TIMESTAMP	DEFAULT CURRENT_TIMESTAMP 	not NULL,
	sh_update_by			VARCHAR(150)							NOT NULL,
	sh_update_date			TIMESTAMP	DEFAULT CURRENT_TIMESTAMP 	NOT NULL,
	constraint bss_shop_pk PRIMARY KEY (sh_id)
);

--Comment bss_shop
COMMENT ON COLUMN bss_shop.sh_id IS 'Auto increment id of shop';	
COMMENT ON COLUMN bss_shop.sh_code IS 'Shop code for identify which shop';
COMMENT ON COLUMN bss_shop.sh_name IS 'Shop name';
COMMENT ON COLUMN bss_shop.sh_create_by IS 'User who create this data';
COMMENT ON COLUMN bss_shop.sh_create_date IS 'Date when create this data';
COMMENT ON COLUMN bss_shop.sh_update_by IS 'User who update this data';
COMMENT ON COLUMN bss_shop.sh_update_date IS 'Date when update this data';

CREATE TABLE bss_stock(
	st_id 				INT 			NOT null,
	st_code 			INT 			NOT NULL,
	st_balance_forward 	INT 			NULL,
	st_balance 			INT 			NOT NULL,
	st_date 			TIMESTAMP 		NOT NULL,
	st_sale 			DECIMAL(6,2) 	NOT NULL,
	st_create_by 		VARCHAR(150) 	NOT NULL,
	st_create_date 		TIMESTAMP 		NOT NULL,
	st_update_by 		VARCHAR(150) 	NOT NULL,
	st_update_date 		TIMESTAMP 		NOT NULL,
	st_sh_id 			INT 			NOT NULL,
--	st_itm_id 			INT 			NOT NULL,
	CONSTRAINT stock_pkey PRIMARY KEY (st_id),
	CONSTRAINT shop_fk1 FOREIGN KEY (st_sh_id) REFERENCES bss_shop(sh_id)
--	CONSTRAINT item_fk2 FOREIGN KEY (st_itm_id) REFERENCES bss_items(itm_id)
);

-- comment bss_stock
COMMENT ON COLUMN bss_stock.st_id IS 'primary key stock';
COMMENT ON COLUMN bss_stock.st_code IS 'code stock';
COMMENT ON COLUMN bss_stock.st_balance_forward IS 'quantity earlier stock';
COMMENT ON COLUMN bss_stock.st_balance IS 'quantity stock';
COMMENT ON COLUMN bss_stock.st_date IS 'latest update date';
COMMENT ON COLUMN bss_stock.st_sale IS 'price item';
COMMENT ON COLUMN bss_stock.st_create_by IS 'stock creator';
COMMENT ON COLUMN bss_stock.st_create_date IS 'stock create date';
COMMENT ON COLUMN bss_stock.st_update_by IS 'stock updater';
COMMENT ON COLUMN bss_stock.st_update_date IS 'stock update date';
COMMENT ON COLUMN bss_stock.st_sh_id IS 'foreign key shop';
--COMMENT ON COLUMN bss_stock.st_itm_id IS 'foreign key item';

CREATE TABLE bss_items(
	itm_id						INT										NOT null,
	itm_code					VARCHAR(10)								NOT NULL,
	itm_name					VARCHAR(255)							NOT NULL,
	itm_price					DECIMAL(6,2) 							NOT NULL,
	itm_capacity				DECIMAL(4,2)							NOT NULL,
	itm_unit					VARCHAR(45)								NOT NULL,
	itm_status					VARCHAR(3)								NOT NULL,
	itm_min_quantity			INT										NOT NULL,
	itm_cost					DECIMAL(6,2)							NOT NULL,
	itm_order_quantity			INT										NOT NULL,
	itm_purchase_frequency		INT										NOT NULL,
	itm_order_unit				VARCHAR(45)								NOT NULL,
	itm_sell_unit				VARCHAR(45)								NOT NULL,
	itm_img_path				VARCHAR(255)							NOT NULL,
	itm_create_by				VARCHAR(150)							NOT NULL,
	itm_create_date				TIMESTAMP	DEFAULT CURRENT_TIMESTAMP 	NOT NULL,
	itm_update_by				VARCHAR(150)							NOT NULL,
	itm_update_date				TIMESTAMP	DEFAULT CURRENT_TIMESTAMP 	NOT NULL,
	itm_sh_id					INT										NOT NULL,
	itm_st_id					INT										not null,
	constraint bss_items_pkey PRIMARY key (itm_id),
	CONSTRAINT bss_items_fk1 FOREIGN KEY (itm_sh_id) REFERENCES bss_shop(sh_id),
	CONSTRAINT bss_items_fk2 FOREIGN KEY (itm_st_id) REFERENCES bss_stock(st_id)
);

--Comment bss_items
COMMENT ON COLUMN bss_items.itm_id IS 'Auto increment id of item';
COMMENT ON COLUMN bss_items.itm_code IS 'Item code for identify which item';
COMMENT ON COLUMN bss_items.itm_name IS 'Item name';
COMMENT ON COLUMN bss_items.itm_price IS 'Price of item';
COMMENT ON COLUMN bss_items.itm_capacity IS 'Capacity of each item';
COMMENT ON COLUMN bss_items.itm_unit IS 'Unit of each item';
COMMENT ON COLUMN bss_items.itm_status IS 'Status of each item is "active" or "inactive" 1.active is on sell and 2.inactive is suspend';
COMMENT ON COLUMN bss_items.itm_min_quantity IS 'Minimun quantity of each item in stock';
COMMENT ON COLUMN bss_items.itm_cost IS 'Cost of each item';
COMMENT ON COLUMN bss_items.itm_order_quantity IS 'Quantity when want to order this item';
COMMENT ON COLUMN bss_items.itm_purchase_frequency IS 'Order frequency';
COMMENT ON COLUMN bss_items.itm_order_unit IS 'Unit of item when order item';
COMMENT ON COLUMN bss_items.itm_sell_unit IS 'Unit of item when sell item';
COMMENT ON COLUMN bss_items.itm_img_path IS 'Path for locate image';
COMMENT ON COLUMN bss_items.itm_create_by IS 'User who create this data';
COMMENT ON COLUMN bss_items.itm_create_date IS 'Date when create this data';
COMMENT ON COLUMN bss_items.itm_update_by IS 'User who update this data';
COMMENT ON COLUMN bss_items.itm_update_date IS 'Date when update this data';
COMMENT ON COLUMN bss_items.itm_sh_id IS 'Foreign of shop for reference to which shop';
COMMENT ON COLUMN bss_items.itm_st_id IS 'Foreign of stock for reference to which stock';





CREATE TABLE bss_barcode(
	bc_id				int										not null,
	bc_code				VARCHAR(13)								NOT NULL,
	bc_type 			VARCHAR(3)								NOT NULL,
	bc_creat_by			VARCHAR(150)							NOT NULL,
	bc_create_date		TIMESTAMP	DEFAULT CURRENT_TIMESTAMP 	NOT NULL,
	bc_update_by		VARCHAR(150)							NOT NULL,
	bc_update_date		TIMESTAMP	DEFAULT CURRENT_TIMESTAMP 	NOT NULL,
	bc_itm_id 			INT 									NOT NULL,
 
	constraint bss_barcode_pkey PRIMARY key (bc_id),
	CONSTRAINT bss_barcode_fk1 FOREIGN KEY (bc_itm_id) REFERENCES bss_items(itm_id)
);

-- comment bss_barcode
COMMENT ON COLUMN bss_barcode.bc_id IS 'ID of Barcode is primary key ';
COMMENT ON COLUMN bss_barcode.bc_code IS 'The code consists of 13 characters';
COMMENT ON COLUMN bss_barcode.bc_type IS 'type of barcode. There are 2 types. ';
COMMENT ON COLUMN bss_barcode.bc_creat_by	 IS ' Who was this barcode created by? ';
COMMENT ON COLUMN bss_barcode.bc_create_date IS ' What date was this barcode created? ';
COMMENT ON COLUMN bss_barcode.bc_update_by is ' Who was this barcode updated by? ';
COMMENT ON COLUMN bss_barcode.bc_update_date IS ' What date was this barcode updated? ';
COMMENT ON COLUMN bss_barcode.bc_itm_id  IS 'The barcode that was created on whose item? ';


CREATE TABLE bss_stock_movement(
    sm_id 				INT 									NOT null,
    sm_tranasation_type VARCHAR(3) 								NOT NULL,
    sm_date 			TIMESTAMP 	DEFAULT CURRENT_TIMESTAMP 	NOT NULL,
    sm_quantity 		INT 									NOT NULL,
    sm_effect 			VARCHAR(3) 								NOT NULL,
    sm_create_by	   	VARCHAR(150)					        NOT NULL,
	sm_create_date	   	TIMESTAMP	DEFAULT CURRENT_TIMESTAMP 	NOT NULL,
	sm_update_by	   	VARCHAR(150)					        NOT NULL,
	sm_update_date	   	TIMESTAMP	DEFAULT CURRENT_TIMESTAMP 	NOT NULL,
 	sm_itm_id 			int 									not null,
 	sm_st_id  			int 									not null,
    CONSTRAINT bss_stock_movement_pkey PRIMARY KEY (sm_id),
	CONSTRAINT bss_stock_movement_fk1 FOREIGN KEY (sm_itm_id) REFERENCES bss_items(itm_id),
	CONSTRAINT bss_stock_movement_fk2 FOREIGN KEY (sm_st_id) REFERENCES bss_stock(st_id)
);
-- comment bss_stock_movement
COMMENT ON COLUMN bss_stock_movement.sm_id IS 'stock movement id';
COMMENT ON COLUMN bss_stock_movement.sm_tranasation_type IS 'stock movement tranasation_type';
COMMENT ON COLUMN bss_stock_movement.sm_date IS 'stock movement date ';
COMMENT ON COLUMN bss_stock_movement.sm_quantity IS 'stock movement quantity ';
COMMENT ON COLUMN bss_stock_movement.sm_effect IS 'stock movement effect ';
COMMENT ON COLUMN bss_stock_movement.sm_create_by IS 'stock movement create_by user';
COMMENT ON COLUMN bss_stock_movement.sm_create_date IS 'stock movement create_date';
COMMENT ON COLUMN bss_stock_movement.sm_update_by IS 'stock movement update_by user';
COMMENT ON COLUMN bss_stock_movement.sm_update_date IS 'stock movementupdate_date';
COMMENT ON COLUMN bss_stock_movement.sm_itm_id IS 'Item ID';
COMMENT ON COLUMN bss_stock_movement.sm_st_id IS 'Shop ID';

CREATE TABLE bss_user(
	us_id              INT                                    NOT null,
	us_user_name       VARCHAR(150)                           NOT NULL,
	us_pass_word       VARCHAR(30)                            NOT NULL,
	us_first_name      VARCHAR(150)                           NOT NULL,
	us_last_name       VARCHAR(150)                           NOT NULL,
	us_email           VARCHAR(150)                           NOT NULL,
	us_tel             VARCHAR(10)                            NOT NULL,
	us_permission      VARCHAR(3)                  			  NOT NULL,
	us_create_by	   VARCHAR(150)					          NOT NULL,
	us_create_date	   TIMESTAMP	DEFAULT CURRENT_TIMESTAMP NOT NULL,
	us_update_by	   VARCHAR(150)					          NOT NULL,
	us_update_date	   TIMESTAMP	DEFAULT CURRENT_TIMESTAMP NOT NULL,
	us_sh_id		   INT									  not null,
	CONSTRAINT bss_user_pkey PRIMARY KEY (us_id),
	CONSTRAINT bss_user_fk1 FOREIGN KEY (us_sh_id) REFERENCES bss_shop(sh_id)
);
-- comment bss_user
COMMENT ON COLUMN bss_user.us_id              IS 'id (run) user';
COMMENT ON COLUMN bss_user.us_user_name       IS 'name user for login';
COMMENT ON COLUMN bss_user.us_pass_word       IS 'password user for login';
COMMENT ON COLUMN bss_user.us_first_name      IS 'user s firstname';
COMMENT ON COLUMN bss_user.us_last_name       IS 'user s lastname';
COMMENT ON COLUMN bss_user.us_email           IS 'user s email';
COMMENT ON COLUMN bss_user.us_tel             IS 'user s tel';
COMMENT ON COLUMN bss_user.us_permission      IS 'user s permission';
COMMENT ON COLUMN bss_user.us_create_by	      IS 'creater of this account';
COMMENT ON COLUMN bss_user.us_create_date	  IS 'account creation date';
COMMENT ON COLUMN bss_user.us_update_by	      IS 'who updeted account';
COMMENT ON COLUMN bss_user.us_update_date     IS 'when is it updeted';
COMMENT ON COLUMN bss_user.us_sh_id     	  IS 'Shop ID';


CREATE TABLE bss_purchase_order_header(
	po_id 			INT 								NOT NUll,
	po_code 		VARCHAR(9) 							NOT NULL,
	po_date 		TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
	po_status 		VARCHAR(3)							NOT NULL,
	po_gen_user 	VARCHAR(150) 						NOT NULL,
	po_create_by 	VARCHAR(150) 						NOT NULL,
	po_create_date 	TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
	po_update_by	VARCHAR(150) 						NOT NULL,
	po_update_date 	TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
	po_sh_id		INT 								NOT NULL,
CONSTRAINT purchase_order_header_pkey PRIMARY KEY(po_id),
CONSTRAINT shop_fkey FOREIGN KEY (po_sh_id) REFERENCES bss_shop(sh_id)
);

-- comment bss_purchase_order_header
COMMENT ON COLUMN bss_purchase_order_header.po_id IS 'purchase order header primary key';
COMMENT ON COLUMN bss_purchase_order_header.po_code IS 'purchase order header code';
COMMENT ON COLUMN bss_purchase_order_header.po_date IS 'purchase order header date ';
COMMENT ON COLUMN bss_purchase_order_header.po_status IS 'purchase order header status';
COMMENT ON COLUMN bss_purchase_order_header.po_gen_user IS 'purchase order header generate user';
COMMENT ON COLUMN bss_purchase_order_header.po_create_by IS 'purchase order header create by user';
COMMENT ON COLUMN bss_purchase_order_header.po_create_date IS 'when create purchase order header';
COMMENT ON COLUMN bss_purchase_order_header.po_update_by IS 'purchase order update by user header';
COMMENT ON COLUMN bss_purchase_order_header.po_update_date IS 'Date when update purchase order header';
COMMENT ON COLUMN bss_purchase_order_header.po_sh_id IS 'foreign key shop'; 

CREATE TABLE bss_purchase_order_detail(
    pod_id 					INT 				NOT NUll,
    pod_quantity_per_unit 	INT 				NOT NUll,
    pod_order_quantity 		INT 				NOT NUll,
    pod_item_unit 			VARCHAR(45) 		NOT NUll,
    pod_order_unit 			VARCHAR(45) 		NOT NUll,
    pod_create_by 			VARCHAR(150) 		NOT NUll,
    pod_create_date 		TIMESTAMP 			NOT NUll,
    pod_update_by 			VARCHAR(150)		NOT NUll,
    pod_update_date 		TIMESTAMP 			NOT NUll,
    pod_itm_id 				INT 				NOT NUll,
    pod_po_id 				INT 				NOT NUll,
    CONSTRAINT bss_purchase_order_detail_pkey PRIMARY KEY(pod_id),
    CONSTRAINT item_fkey FOREIGN KEY (pod_itm_id) REFERENCES bss_items(itm_id),
    CONSTRAINT purchase_order_header_fkey FOREIGN KEY (pod_po_id) REFERENCES bss_purchase_order_header(po_id)
);

-- comment bss_purchase_order_detail
COMMENT ON COLUMN bss_purchase_order_detail.pod_id IS 'purchase order detail primary key';
COMMENT ON COLUMN bss_purchase_order_detail.pod_quantity_per_unit IS 'quantity/unit this item in purchase order detail';
COMMENT ON COLUMN bss_purchase_order_detail.pod_order_quantity IS 'quantity order this item in purchase order detail';
COMMENT ON COLUMN bss_purchase_order_detail.pod_item_unit IS 'item unit this item in purchase order detail';
COMMENT ON COLUMN bss_purchase_order_detail.pod_order_unit IS 'order unit this item in purchase order detail';
COMMENT ON COLUMN bss_purchase_order_detail.pod_create_by IS 'purchase order detail create by user';
COMMENT ON COLUMN bss_purchase_order_detail.pod_create_date IS 'when create purchase order detail';
COMMENT ON COLUMN bss_purchase_order_detail.pod_update_by IS 'purchase order detail update by user';
COMMENT ON COLUMN bss_purchase_order_detail.pod_update_date IS 'when create purchase order detail';
COMMENT ON COLUMN bss_purchase_order_detail.pod_itm_id IS 'foreign key item';
COMMENT ON COLUMN bss_purchase_order_detail.pod_po_id IS 'foreign key purchase order header';

CREATE TABLE bss_receive_inventory_header(
    ri_id						INT										NOT null,
    ri_code						VARCHAR(9)								NOT NULL,
    ri_gen_user					VARCHAR(150)							NOT NULL,
    ri_date 					TIMESTAMP	DEFAULT CURRENT_TIMESTAMP	NOT NULL,
    ri_status 					VARCHAR(3)								NOT NULL,
    ri_create_by				VARCHAR(150)							NOT NULL,
	ri_create_date				TIMESTAMP	DEFAULT CURRENT_TIMESTAMP 	NOT NULL,
	ri_update_by				VARCHAR(150)							NOT NULL,
	ri_update_date				TIMESTAMP	DEFAULT CURRENT_TIMESTAMP 	NOT NULL,
	ri_po_id	INT not null,
    ri_sh_id	INT not null,
    constraint bss_receive_inventory_header_pkey PRIMARY key (ri_id),
    CONSTRAINT bss_receive_inventory_header_fk1 FOREIGN KEY (ri_po_id) REFERENCES bss_purchase_order_header(po_id),
    CONSTRAINT bss_receive_inventory_header_fk2 FOREIGN KEY (ri_sh_id) REFERENCES bss_shop(sh_id)
    
);

-- comment bss_receive_inventory_header
COMMENT ON COLUMN bss_receive_inventory_header.ri_id IS 'receive id';
COMMENT ON COLUMN bss_receive_inventory_header.ri_code IS 'receive code'; 
COMMENT ON COLUMN bss_receive_inventory_header.ri_gen_user IS 'receive generate user';
COMMENT ON COLUMN bss_receive_inventory_header.ri_date IS 'receive date'; 
COMMENT ON COLUMN bss_receive_inventory_header.ri_status IS 'receive status'; 
COMMENT ON COLUMN bss_receive_inventory_header.ri_create_by IS 'receive create by user';
COMMENT ON COLUMN bss_receive_inventory_header.ri_create_date IS 'receive create date'; 
COMMENT ON COLUMN bss_receive_inventory_header.ri_update_by IS 'receive update by user';
COMMENT ON COLUMN bss_receive_inventory_header.ri_update_date IS 'receive update date';
COMMENT ON COLUMN bss_receive_inventory_header.ri_po_id IS 'receive purchase orer id';
COMMENT ON COLUMN bss_receive_inventory_header.ri_sh_id IS 'receive shop id';


CREATE TABLE bss_receive_inventory_detail(
    rid_id						INT										NOT null,
    rid_receive_quantity		INT										NOT NULL,
    rid_purchase_price			DECIMAL(6,2)							NOT NULL,
    rid_quantity_per_unit 		INT 									NOT NULL,
    rid_item_unit				VARCHAR(150)							NOT NULL,
    rid_create_by				VARCHAR(150)							NOT NULL,
	rid_create_date				TIMESTAMP	DEFAULT CURRENT_TIMESTAMP 	NOT NULL,
	rid_update_by				VARCHAR(150)							NOT NULL,
	rid_update_date				TIMESTAMP	DEFAULT CURRENT_TIMESTAMP 	NOT NULL,
	rid_itm_id	INT,
    rid_ri_id	INT,

    constraint bss_receive_inventory_detail_pkey PRIMARY key (rid_id),
    CONSTRAINT bss_receive_inventory_detail_fk1 FOREIGN KEY (rid_itm_id) REFERENCES bss_items(itm_id),
    CONSTRAINT bss_receive_inventory_detail_fk2 FOREIGN KEY (rid_ri_id) REFERENCES bss_receive_inventory_header(ri_id)
    
    
);

COMMENT ON COLUMN bss_receive_inventory_detail.rid_id IS 'receive id';
COMMENT ON COLUMN bss_receive_inventory_detail.rid_receive_quantity IS 'receive quantity'; 
COMMENT ON COLUMN bss_receive_inventory_detail.rid_purchase_price IS 'receive purchase price'; 
COMMENT ON COLUMN bss_receive_inventory_detail.rid_quantity_per_unit IS 'receive quantity per unit'; 
COMMENT ON COLUMN bss_receive_inventory_detail.rid_item_unit IS 'receive item unit'; 
COMMENT ON COLUMN bss_receive_inventory_detail.rid_create_by IS 'receive username'; 
COMMENT ON COLUMN bss_receive_inventory_detail.rid_create_date IS 'receive create date'; 
COMMENT ON COLUMN bss_receive_inventory_detail.rid_update_by IS 'receive update by user'; 
COMMENT ON COLUMN bss_receive_inventory_detail.rid_update_date IS 'receive update date	'; 
COMMENT ON COLUMN bss_receive_inventory_detail.rid_itm_id IS 'receive item id'; 
COMMENT ON COLUMN bss_receive_inventory_detail.rid_ri_id IS 'receive id'; 

CREATE TABLE bss_stock_adjust_header(
	sa_id 			int 									NOT null,
	sa_code 		VARCHAR(6) 								NOT NULL,
	sa_date 		TIMESTAMP 								NOT NULL,
	sa_gen_user 	VARCHAR(150) 							NOT NULL,
	sa_reason		VARCHAR(150) 							NOT NULL,
	sa_note 		VARCHAR(255),
	sa_create_by 	VARCHAR(150) 							NOT NULL,
	sa_create_date 	TIMESTAMP 	DEFAULT CURRENT_TIMESTAMP 	NOT NULL,
	sa_update_by 	VARCHAR(150) 							NOT NULL,
	sa_update_date 	TIMESTAMP 	DEFAULT CURRENT_TIMESTAMP 	NOT NULL,
	sa_sh_id 		INT 									NOT NULL,
	CONSTRAINT bss_stock_adjust_header_pkey PRIMARY KEY (sa_id),
	CONSTRAINT bss_stock_adjust_header_fk1 FOREIGN KEY (sa_sh_id) REFERENCES bss_shop(sh_id)
);

-- comment bss_stock_adjust_header
comment on column bss_stock_adjust_header.sa_id is 'Stock Adjust Header of ID';
comment on column bss_stock_adjust_header.sa_code is 'Stock Adjust Header Code';
comment on column bss_stock_adjust_header.sa_date is 'Document Date Stock Adjust Header Code';
comment on column bss_stock_adjust_header.sa_gen_user is 'User Generate Stock Adjust Header';
comment on column bss_stock_adjust_header.sa_reason is 'Reason Stock Adjust Header';
comment on column bss_stock_adjust_header.sa_note is 'Note Stock Adjust Header';
comment on column bss_stock_adjust_header.sa_create_by is 'Stock Adjust Header Created by User';
comment on column bss_stock_adjust_header.sa_create_date is 'Stock Adjust Header Created on Date';
comment on column bss_stock_adjust_header.sa_update_by is 'Stock Adjust Header Updated by User';
comment on column bss_stock_adjust_header.sa_update_date is 'Stock Adjust Header Updated on Date';
comment on column bss_stock_adjust_header.sa_sh_id is 'Shop ID';

CREATE TABLE bss_stock_adjust_detail(
	sad_id 			int 								NOT null,
	sad_quantity 	INT 								NOT NULL,
	sad_create_by 	VARCHAR(150) 						NOT NULL,
	sad_create_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
	sad_update_by 	VARCHAR(150) 						NOT NULL,
	sad_update_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
	sad_st_code 	INT 								NOT NULL,
	sad_sa_id 		INT 								NOT NULL,
	CONSTRAINT bss_stock_adjust_detail_pkey PRIMARY KEY (sad_id),
	CONSTRAINT bss_stock_adjust_detail_fk1 FOREIGN KEY (sad_sa_id) REFERENCES bss_stock_adjust_header(sa_id)
--	CONSTRAINT bss_stock_adjust_detail_fk2 FOREIGN KEY (sad_st_code) REFERENCES bss_stock(st_code)
);
-- comment bss_stock_adjust_detail
comment on column bss_stock_adjust_detail.sad_id is 'Stock Adjust Detail of ID';
comment on column bss_stock_adjust_detail.sad_quantity is 'Item quantity';
comment on column bss_stock_adjust_detail.sad_create_by is 'Stock Adjust Detail Created by User';
comment on column bss_stock_adjust_detail.sad_create_date is 'Stock Adjust Detail Created on Date';
comment on column bss_stock_adjust_detail.sad_update_by is 'Stock Adjust Detail Updated by User';
comment on column bss_stock_adjust_detail.sad_update_date is 'Stock Adjust Detail Updated on Date';
--comment on column bss_stock_adjust_detail.sad_st_code is 'Stock ID';
comment on column bss_stock_adjust_detail.sad_sa_id is 'Stock Adjust Header ID';