CREATE TABLE bshusr (
	bshuser        VARCHAR(144) NULL,
	bshpass        VARCHAR(144) NULL,
	bshemail       VARCHAR(255) NULL,
	bshphoneno     VARCHAR(144) NULL,
	bshusrrole     VARCHAR(144) NULL,
	bshusrcredat   TIMESTAMP NOT NULL,
	bshusrcreusr   VARCHAR(144) NOT NULL,
	bshusrupddat   TIMESTAMP NOT NULL,
	bshusrupdusr   VARCHAR(144) NOT NULL
);

-- Column comments

COMMENT ON COLUMN billionshop.bshusr.bshuser IS 'User Name';
COMMENT ON COLUMN billionshop.bshusr.bshpass IS 'User Password';
COMMENT ON COLUMN billionshop.bshusr.bshemail IS 'User Email';
COMMENT ON COLUMN billionshop.bshusr.bshphoneno IS 'User Phone Number';
COMMENT ON COLUMN billionshop.bshusr.bshusrrole IS 'User Role';
COMMENT ON COLUMN billionshop.bshusr.bshusrcredat IS 'Creation Date';
COMMENT ON COLUMN billionshop.bshusr.bshusrcreusr IS 'Creation User';
COMMENT ON COLUMN billionshop.bshusr.bshusrupddat IS 'Last Update Date';
COMMENT ON COLUMN billionshop.bshusr.bshusrupdusr IS 'Last Update User';