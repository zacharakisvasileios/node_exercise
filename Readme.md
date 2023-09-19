# Development environment

In order to run application use:
`docker-compose up`

# API endpoints

| Method | URL                          | Description           |
| ------ | ---------------------------- | --------------------- |
| `POST` | `/feedDB`                    | Populate database.    |
| `POST` | `/message/create`            | Create a new message. |
| `POST` | `/message/update/28`         | Update message #28.   |
| `POST` | `/message/get/all`           | Get all messages      |
| `POST` | `/message/clear`             | Deletes all messages. |
| `POST` | `/user/`                     |                       |
| `POST` | `/user/get/messageExchange`  |                       |
| `POST` | `/user/get/conversationList` |                       |
