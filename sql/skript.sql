CREATE TABLE menschen (
    id       NUMBER(10),
    vorname  VARCHAR2(20) CONSTRAINT menschen_vorname NOT NULL,
    nachname VARCHAR2(20) CONSTRAINT menschen_nachname NOT NULL,
    gewicht  NUMBER(20),
    CONSTRAINT ck_gewicht CHECK (gewicht>0),
    CONSTRAINT PK_menschen PRIMARY KEY(id)
);

CREATE SEQUENCE sequenz_id
  INCREMENT BY 1
  START WITH 1;

  CREATE OR REPLACE TRIGGER trigger1_id
  BEFORE INSERT ON menschen
  FOR EACH ROW
    DECLARE
      my_sequenz menschen.id%type;
    BEGIN
      SELECT sequenz_id.nextval INTO my_sequenz FROM dual;
      :new.id := my_sequenz;
    END;
/

CREATE TABLE mitglied (
    mid                  NUMBER(10) ,
    anemdledatum         DATE,
    punkte               NUMBER(20),
    passwort             NUMBER(20),
    empfohlen            NUMBER(10) CONSTRAINT con_empfohlen REFERENCES mitglied,
    CONSTRAINT PK_mitglied PRIMARY KEY (mid),
    CONSTRAINT FK_mitglied FOREIGN KEY(mid) REFERENCES menschen ON DELETE CASCADE
);

CREATE TABLE mitarbeiter (
    mid NUMBER(10),
    rang    NUMBER(2),
    personalnummer  NUMBER(4),
    CONSTRAINT PK_mitarbeiter PRIMARY KEY (mid),
    CONSTRAINT FK_mitarbeiter FOREIGN KEY (mid) REFERENCES menschen ON DELETE CASCADE
);


CREATE TABLE gericht (
    name         VARCHAR2(20),
    fett          integer,
    protein       integer,
    kohlenhydrate integer,
    PRIMARY KEY (name)
);

CREATE TABLE training (
    id                 NUMBER(10) REFERENCES menschen ON DELETE CASCADE,
    datum              DATE,
    name               VARCHAR2(20),
    gewicht            NUMBER(10),
    wiederholung       NUMBER(10) DEFAULT 1,
    kategorie          VARCHAR2(20),
    PRIMARY KEY(id, datum, name)
);

CREATE TABLE produkt (
    name    VARCHAR2(20),
    Preis   DECIMAL,
    Lagerstand integer,
    PRIMARY KEY (name)
);


CREATE TABLE isst (
    id      NUMBER(10),
    name    VARCHAR2(20),
    datum   DATE,
    menge   int,
    FOREIGN KEY (id) REFERENCES menschen,
    FOREIGN KEY (name) REFERENCES gericht,
    PRIMARY KEY (id, name, datum)
);

INSERT INTO isst VALUES(5, 'Pommes','01-Jan-2017', 23 );

CREATE TABLE verkauft (
    mitglieds_id NUMBER(10),
    angestellten_id NUMBER(10),
    produktname VARCHAR2(20),
    anzahl integer,
    FOREIGN KEY (mitglieds_id) REFERENCES mitglied,
    FOREIGN KEY (angestellten_id) REFERENCES mitarbeiter,
    FOREIGN KEY (produktname) REFERENCES produkt ,
    PRIMARY KEY (mitglieds_id, angestellten_id, produktname)
);



--view table
CREATE VIEW view_name AS
SELECT COUNT(personalnummer) as count, rang as rang
FROM mitarbeiter
GROUP BY rang
HAVING COUNT(personalnummer)>0;


CREATE VIEW view_join AS
SELECT mitglied.mid, menschen.vorname, menschen.nachname 
FROM mitglied
INNER JOIN menschen ON mitglied.mid=menschen.id;

CREATE VIEW view_member_node AS
SELECT * 
FROM mitglied
FULL OUTER JOIN menschen ON mitglied.mid=menschen.id
WHERE mitglied.mid=menschen.id;

CREATE VIEW view_employe_node AS
SELECT * 
FROM mitarbeiter
FULL OUTER JOIN menschen ON mitarbeiter.mid=menschen.id
WHERE mitarbeiter.mid=menschen.id;


/*
SELECT * 
from view_member_node 
WHERE vorname='David' or nachname='';


INSERT INTO menschen VALUES(1, 'David', 'Coemert', 93);
INSERT INTO menschen VALUES(null, 'Dasssvid', 'Codddemert', 93);
INSERT INTO mitarbeiter VALUES (1, 1, 6626);
INSERT INTO training VALUES(1, '01-Jan-2017', 'Dips', 300, 10, 'Push' );
INSERT INTO training VALUES(1, '01-Jan-2017', 'Bank', 300, 10, 'Push' );
INSERT INTO gericht VALUES('Nudeln', 0, 5, 50, 500);
INSERT INTO gericht VALUES('Mais', 1, 6, 51, 501);
INSERT INTO mitglied VALUES (1,'01-Jan-2017', 0, 1234, 1);
INSERT INTO produkt VALUES ('Handschuhe', 23.40, 20);
INSERT INTO isst VALUES(1, 'Nudeln','01-Jan-2017' );
INSERT INTO verkauft VALUES (1,1, 'Handschuhe', 5);

    SELECT * FROM gericht;
    SELECT * FROM mitglied;
    SELECT * FROM mitarbeiter;
    SELECT * FROM menschen;
    SELECT * FROM produkt;
    Select * FROM isst;
    SELECT * FROM verkauft;

DROP TABLE menschen CASCADE CONSTRAINT;
DROP TABLE training CASCADE CONSTRAINT;
DROP TABLE gericht CASCADE CONSTRAINT;
DROP TABLE mitglied CASCADE CONSTRAINT;
DROP TABLE mitarbeiter CASCADE CONSTRAINT;
DROP TABLE produkt CASCADE CONSTRAINT;
DROP TABLE isst CASCADE CONSTRAINT; 
DROP TABLE verkauft CASCADE CONSTRAINT;
DROP SEQUENCE sequenz_id; 
--export LD_LIBRARY_PATH=instantclient_12_2:$LD_LIBRARY_PATH
*/