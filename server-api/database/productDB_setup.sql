-- create tables
CREATE TABLE "category" (
	"_id"	INTEGER NOT NULL,
	"category_name"	TEXT NOT NULL,
	"category_description"	TEXT,
	PRIMARY KEY("_id" AUTOINCREMENT)
)

CREATE TABLE "product" (
	"_id"	INTEGER NOT NULL,
	"category_id"	INTEGER,
	"product_name"	TEXT NOT NULL,
	"product_description"	TEXT,
	"product_stock"	INTEGER NOT NULL DEFAULT 0,
	"product_price"	REAL NOT NULL DEFAULT 0.00,
	PRIMARY KEY("_id" AUTOINCREMENT),
	FOREIGN KEY("category_id") REFERENCES "category"("_id")
)

-- category inserts
INSERT INTO category (_id,category_name,category_description) VALUES (1,'Books','Paper and hard cover, fiction and non-fiction');
INSERT INTO category (_id,category_name,category_description) VALUES (2,'Computer','Desktop, laptops, and accessories');
INSERT INTO category (_id,category_name,category_description) VALUES (3,'Entertainment','Home electronicsa, TV, HiFi, etc.');
INSERT INTO category (_id,category_name,category_description) VALUES (4,'Kitchen','Kitchen + cooking appliances');
INSERT INTO category (_id,category_name,category_description) VALUES (5,'Laundry','Clothes washers, dryers, and accesories');
INSERT INTO category (_id,category_name,category_description) VALUES (6,'Mobile Devices','Mobile phones, tablets, and accessories');
INSERT INTO category (_id,category_name,category_description) VALUES (7,'Furniture','Home and home office furniture');

-- product inserts
INSERT INTO product(_id, category_id, product_name, product_description, product_stock, product_price) VALUES (1, 4, 'Kettle', 'Steel Electric Kettle', 100, 55.00);
INSERT INTO product(_id, category_id, product_name, product_description, product_stock, product_price) VALUES (2, 4, 'Fridge freezer', 'Fridge + freezer large', 45, 799.00);
INSERT INTO product(_id, category_id, product_name, product_description, product_stock, product_price) VALUES (3, 2, 'Microsoft Surface Laptop 2', '8GB ram, 512GB ssd', 5, 1299.00);
INSERT INTO product(_id, category_id, product_name, product_description, product_stock, product_price) VALUES (4, 2, '13inch Laptop', 'HP laptop,8GB RAM,250GB SSD', 45, 799.00);
INSERT INTO product(_id, category_id, product_name, product_description, product_stock, product_price) VALUES (5, 6, 'Samsung 10inch Tablet', 'Android6GB ram, 128GB storage, 10inch scree', 5, 99.00);
INSERT INTO product(_id, category_id, product_name, product_description, product_stock, product_price) VALUES (6, 3, '60inch TV', 'Sony 4K,OLED,Smart TV', 12, 2799.00);
INSERT INTO product(_id, category_id, product_name, product_description, product_stock, product_price) VALUES (7, 5, 'Clothes Washing Machine', '1600rpm spin,A+++ rated,10KG', 50, 699.00);
INSERT INTO product(_id, category_id, product_name, product_description, product_stock, product_price) VALUES (8, 6, 'iPhone XS', '128GB', 5, 850.00);
INSERT INTO product(_id, category_id, product_name, product_description, product_stock, product_price) VALUES (9, 1, 'Azure Web Apps', 'Paperback, January 2019, Cloud publishing', 50, 19.00);
INSERT INTO product(_id, category_id, product_name, product_description, product_stock, product_price) VALUES (10, 1, 'SQL and No SQL for beginners', 'Paperback, Oct 2018, Cloud publishing', 10, 399.00);
INSERT INTO product(_id, category_id, product_name, product_description, product_stock, product_price) VALUES (11, 7, 'Bed', 'Super King size,super comfort mattress', 5, 899.00);
INSERT INTO product(_id, category_id, product_name, product_description, product_stock, product_price) VALUES (12, 2, 'Learning JavaScript', 'Become a JavaScript expert in 2 hours!', 10, 12.00);
INSERT INTO product(_id, category_id, product_name, product_description, product_stock, product_price) VALUES (13, 7, 'Desk', 'Small computer desk', 5, 99.00);