
# Web Recipe REST API

This project about REST API schema Website Recipe, build with NodeJS, ExpressJS, and PostgreSQL

## API Reference

#### Login

```http
  POST /login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**. email to get token access |
| `password`      | `string` | **Required**. password to get token access |

#### Post recipe

```http
  POST /recipe
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `token`      | `token` | **Required**. Login to get token access |

#### Update recipe

```http
  PUT /recipe/{id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `integer` | **Required**. You need id to edit recipe |
| `token`      | `token` | **Required**. You need token access to do that |

#### Delete recipe

```http
  Delete /recipe/{id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `integer` | **Required**. You need id to delete recipe |

#### Get all items

```http
  GET /recipe
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get item by id

```http
  GET /recipe/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `integer` | **Required**. Id of item to fetch |


#### Get item by Search

```http
  GET /recipe/searched?search=${what?}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title`      | `string` | **Required**. title of item to fetch |


#### Get item by Search

```http
  GET /recipe/sorted?sortby={what}&sort={what}&page=1&limit=10
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `sortby`      | `string` | **Required**. title of item to fetch |
| `sort`      | `string` | **Required**. ASC or DESC |



And many more features
## Demo

email: guest@gmail.com

password: guest


## Installation

To install this you need to configure database, for this I'm using PostgreSQL, you can copy the `start.sql` at my repository, and setting that on ENV, i put the example there. And also you need cloudinary account to use upload image feature, you need data your personal cloudinary, see at my `.env.example`.
    
## FAQ

#### If you have question

Chat personal on my telegram [Mahardhika Pratama](https://t.me/mahardhika_yk)

## Authors

- [@mahardhikap](https://www.github.com/mahardhikap)

## 🔗 Links
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/mahardhikapratama)