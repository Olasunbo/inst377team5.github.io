CREATE TABLE IF NOT EXISTS  'input' ( "id" INTEGER PRIMARY KEY AUTOINCREMENT, "review" VARCHAR NOT NULL, "created" DATETIME DEFAULT(CURRENT_DATE));
INSERT INTO 'input' (review) select  "This place is the best so many children books!" WHERE NOT EXISTS (SELECT * FROM 'input' WHERE id = 1);
