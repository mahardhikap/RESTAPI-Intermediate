-- Active: 1689922089200@@147.139.210.135@5432@mahar01
CREATE DATABASE intermediate;
ALTER DATABASE intermediate SET timezone TO 'Asia/Jakarta';

CREATE TABLE category (
    id SERIAL PRIMARY KEY,
    name VARCHAR(64) NOT NULL
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(64) NOT NULL,
    email VARCHAR(64) NOT NULL,
    password VARCHAR(64) NOT NULL,
    photo VARCHAR(64),
    roles VARCHAR(64)
);

CREATE TABLE recipe (
    id SERIAL PRIMARY KEY,
    title VARCHAR(64) NOT NULL,
    image VARCHAR(256),
    ingredients TEXT NOT NULL,
    category_id INT NOT NULL,
    users_id INT NOT NULL,
    img_id VARCHAR,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY (category_id) REFERENCES category(id),
    FOREIGN KEY (users_id) REFERENCES users(id) ON DELETE CASCADE
);
--untuk agar hapus otomatis (baris recipe dihapus users juga dihapus)--
-- ALTER TABLE recipe
-- ADD CONSTRAINT fk_users_id
-- FOREIGN KEY (users_id)
-- REFERENCES users(id)
-- ON DELETE CASCADE;

--category--
INSERT INTO category (name) VALUES ('Appetizer'), ('Main Course'), ('Dessert'), ('Lainnya');
--show all category only--
SELECT * FROM category;



--users--
INSERT INTO users (username, email, password, photo, roles) VALUES ('admin', 'admin@gmail.com', 'admin', 'photo.png', 'admin');
--show all users--
SELECT * FROM users;
--show only email--
SELECT * FROM users WHERE email = 'mahardhika@gmail.com';


--recipe--
INSERT INTO recipe (title, image, ingredients, category_id, users_id) VALUES ('Resep sate ayam', 'imgdb.com', 'Bahan untuk buat sate ayam', 2, 1);
INSERT INTO recipe (title, image, ingredients, category_id, users_id) VALUES ('Resep tongseng', 'imgdb.com', 'Bahan untuk buat tongseng', 2, 2);
--update recipe example--
UPDATE recipe SET title = 'What a title', image = 'url image', ingredients = 'what', category_id = 1, users_id = 1 WHERE id = 1;
DELETE FROM recipe WHERE id = 6;
--sort recipe--
SELECT recipe.id, recipe.title, recipe.image, recipe.ingredients, category.name AS category, users.username, recipe.created_at FROM recipe JOIN category ON recipe.category_id = category.id JOIN users ON recipe.users_id = users.id ORDER BY created_at DESC OFFSET 0 LIMIT 2;
--search recipe--
SELECT recipe.id, recipe.title, recipe.image, recipe.ingredients, category.name AS category, users.username, recipe.created_at FROM recipe JOIN category ON recipe.category_id = category.id JOIN users ON recipe.users_id = users.id WHERE title ILIKE '%yam%';



--JOIN / RELATIONSHIP--
SELECT recipe.title, recipe.image, recipe.ingredients, category.name AS category, users.username FROM recipe JOIN category ON recipe.category_id = category.id JOIN users ON recipe.users_id = users.id;
