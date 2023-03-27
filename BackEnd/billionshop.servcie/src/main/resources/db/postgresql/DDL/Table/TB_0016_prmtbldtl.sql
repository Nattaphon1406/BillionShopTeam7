CREATE TABLE public.prmtbldtl (
	pmdtbdtbno numeric(4) NOT NULL,
	pmdtbdentcd varchar(24) NOT NULL,
	pmdtbdedesc varchar(160) NOT NULL,
	pmdtbdldesc varchar(160) NULL,
	pmdtbdacces numeric(1) NOT NULL,
	pmdcmnt varchar(4000) NULL,
	pmdcredat timestamp NOT NULL,
	pmdcreusr varchar(160) NOT NULL,
	pmdupddat timestamp NOT NULL,
	pmdupdusr varchar(160) NOT NULL,
	pmdeopdat timestamp NOT NULL,
	pmdtbdtxtv1 varchar(400) NULL,
	pmdtbdtxtv2 varchar(400) NULL,
	pmdtbdtxtv3 varchar(400) NULL,
	pmdtbdtxtv4 varchar(400) NULL,
	pmdtbdtxtv5 varchar(400) NULL,
	pmdtbdv1 numeric NULL,
	pmdtbdv2 numeric NULL,
	pmdtbdv3 varchar(400) NULL,
	pmdtbdv4 varchar(400) NULL,
	pmdtbdv5 varchar(400) NULL,
	pmdcreprg varchar(160) NULL,
	pmdupdprg varchar(160) NULL,
	CONSTRAINT prmtbldtl_pkey PRIMARY KEY (pmdtbdtbno, pmdtbdentcd)
);

-- public.prmtbldtl foreign keys

ALTER TABLE public.prmtbldtl ADD CONSTRAINT prmtbldtl_fk1 FOREIGN KEY (pmdtbdtbno) REFERENCES public.prmtblhdr(pmhtbhtbno);