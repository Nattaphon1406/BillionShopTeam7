CREATE TABLE public.bss_user (
	us_id int4 NOT NULL DEFAULT nextval('user_seq'::regclass), -- id (run) user
	us_user_name varchar(150) NOT NULL, -- name user for login
	us_pass_word varchar(30) NOT NULL, -- password user for login
	us_first_name varchar(150) NOT NULL, -- user s firstname
	us_last_name varchar(150) NOT NULL, -- user s lastname
	us_email varchar(150) NOT NULL, -- user s email
	us_tel varchar(10) NOT NULL, -- user s tel
	us_permission varchar(3) NOT NULL, -- user s permission
	us_create_by varchar(150) NOT NULL, -- creater of this account
	us_create_date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, -- account creation date
	us_update_by varchar(150) NOT NULL, -- who updeted account
	us_update_date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, -- when is it updeted
	us_sh_id int4 NOT NULL, -- Shop ID
	CONSTRAINT bss_user_pkey PRIMARY KEY (us_id)
);

-- Column comments

COMMENT ON COLUMN public.bss_user.us_id IS 'id (run) user';
COMMENT ON COLUMN public.bss_user.us_user_name IS 'name user for login';
COMMENT ON COLUMN public.bss_user.us_pass_word IS 'password user for login';
COMMENT ON COLUMN public.bss_user.us_first_name IS 'user s firstname';
COMMENT ON COLUMN public.bss_user.us_last_name IS 'user s lastname';
COMMENT ON COLUMN public.bss_user.us_email IS 'user s email';
COMMENT ON COLUMN public.bss_user.us_tel IS 'user s tel';
COMMENT ON COLUMN public.bss_user.us_permission IS 'user s permission';
COMMENT ON COLUMN public.bss_user.us_create_by IS 'creater of this account';
COMMENT ON COLUMN public.bss_user.us_create_date IS 'account creation date';
COMMENT ON COLUMN public.bss_user.us_update_by IS 'who updeted account';
COMMENT ON COLUMN public.bss_user.us_update_date IS 'when is it updeted';
COMMENT ON COLUMN public.bss_user.us_sh_id IS 'Shop ID';


-- public.bss_user foreign keys

ALTER TABLE public.bss_user ADD CONSTRAINT bss_user_fk1 FOREIGN KEY (us_sh_id) REFERENCES public.bss_shop(sh_id);