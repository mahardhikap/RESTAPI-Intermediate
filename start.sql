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
    photo VARCHAR(256),
    roles VARCHAR(64),
    img_id VARCHAR
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
INSERT INTO users (username, email, password, photo, roles, img_id) VALUES ('admin', 'admin@gmail.com', 'admin', 'photo.png', 'admin', 'isi image id');
--show all users--
SELECT * FROM users;
--show only email--
SELECT * FROM users WHERE email = 'mahardhika@gmail.com';
--update user--
UPDATE users SET username = 'jaka', email = 'jaka@gmail.com', password = 'jaka', photo = 'photo.png' WHERE id = 17;
DELETE FROM users WHERE id = 17


--recipe--
INSERT INTO recipe (title, image, ingredients, category_id, users_id, img_id) VALUES ('Resep sate ayam', 'imgdb.com', 'Bahan untuk buat sate ayam', 2, 1, 'isi image id');
--update recipe example--
UPDATE recipe SET title = 'What a title', image = 'url image', ingredients = 'what', category_id = 1, users_id = 1 WHERE id = 1;
DELETE FROM recipe WHERE id = 6;
--sort recipe--
SELECT recipe.id, recipe.users_id, recipe.title, recipe.image, recipe.ingredients, category.name AS category, users.username, recipe.created_at FROM recipe JOIN category ON recipe.category_id = category.id JOIN users ON recipe.users_id = users.id ORDER BY 'title' ASC OFFSET 1 LIMIT 5;
--search recipe--
SELECT recipe.id, recipe.title, recipe.image, recipe.ingredients, category.name AS category, users.username, recipe.created_at FROM recipe JOIN category ON recipe.category_id = category.id JOIN users ON recipe.users_id = users.id WHERE title ILIKE '%yam%';
--get recipe by id--
SELECT recipe.users_id, recipe.title, recipe.image, recipe.ingredients, recipe.img_id, recipe.created_at, category.name AS category, users.username FROM recipe JOIN category ON recipe.category_id = category.id JOIN users ON recipe.users_id = users.id WHERE recipe.id = 1
--get recipe by user-
SELECT recipe.title, recipe.image, recipe.ingredients, recipe.img_id, recipe.created_at, category.name AS category, users.username FROM recipe JOIN category ON recipe.category_id = category.id JOIN users ON recipe.users_id = users.id WHERE recipe.users_id = 3



--JOIN / RELATIONSHIP--
SELECT recipe.title, recipe.image, recipe.ingredients, category.name AS category, users.username FROM recipe JOIN category ON recipe.category_id = category.id JOIN users ON recipe.users_id = users.id;
