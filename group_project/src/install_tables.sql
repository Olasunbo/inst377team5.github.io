CREATE TABLE IF NOT EXISTS  'input' ( "id" INTEGER PRIMARY KEY AUTOINCREMENT, "review" VARCHAR NOT NULL, "created" DATETIME NOT NULL);
INSERT INTO 'input' (review, created) select  "This place is the best so many children books!", datetime('now');
