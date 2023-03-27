CREATE TABLE public.prmtblhdr (
	pmhtbhtbno numeric(4) NOT NULL,
	pmhtbhacces numeric(1) NOT NULL,
	pmhtbhedesc varchar(200) NOT NULL,
	pmhtbhldesc varchar(200) NULL,
	pmhcmnt varchar(4000) NULL,
	pmhcredat timestamp NOT NULL,
	pmhcreusr varchar(160) NOT NULL,
	pmhupddat timestamp NOT NULL,
	pmhupdusr varchar(160) NOT NULL,
	pmheopdat timestamp NOT NULL,
	pmhtbhsys numeric(1) NOT NULL,
	pmhcreprg varchar(160) NULL,
	pmhupdprg varchar(160) NULL,
	CONSTRAINT prmtblhdr_pkey PRIMARY KEY (pmhtbhtbno)
);