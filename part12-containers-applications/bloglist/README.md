# Bloglist -app

```
Before building, remember to add .env file to ./backend/, containing:
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster.xxxxxxx.mongodb.net>/blogList?retryWrites=true&w=majority
TEST_MONGODB_URI=mongodb+srv://<user>:<password>@<cluster.xxxxxxx.mongodb.net>/testBlogList?retryWrites=true&w=majority
SECRET=<RANDOM_STRING_FOR_JWT_TOKEN>
```

## Build & run in development mode

```
docker compose -f docker-compose.dev.yml up
```

Server running in dev mode at http://localhost:8000

## Build & run in production mode

```
docker compose -f docker-compose.yml up
```

Server running in production mode at http://localhost:8000

## Api access

```
http://localhost:8000/api/blogs/
http://localhost:8000/api/users/
```
