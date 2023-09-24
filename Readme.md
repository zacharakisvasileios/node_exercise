# Development environment

In order to run application use:
`docker-compose up`

# Backend

Backend is running on port 8080.

# API endpoints

The endpoints implemented are the following.

| Method | URL                               | Description                                                                                       |
| ------ | --------------------------------- | ------------------------------------------------------------------------------------------------- |
| `POST` | `/feedDB`                         | Populates tables. Throws validation error if already called with another file containing same ids |
| `POST` | `/message/create`                 | Create a new message.                                                                             |
| `PUT`  | `/message/update/28`              | Update message #28 based on body params(see message model)                                        |
| `GET`  | `/message/get`                    | Gets message(s) based on query params (see message model)                                         |
| `POST` | `/message/clear`                  | Deletes all messages, not in the scope of the project, for development only                       |
| `GET`  | `/user/`                          | Get user(s) based on query params (see message model)                                             |
| `GET`  | `/user/get/message/:userA/:userB` | Gets messages between user A and B, ordered by the most recent one                                |
| `GET`  | `/user/get/conversationList`      |                                                                                                   |

- It is assumed that /message/create works only if called after /feedDB or without calling /feedDB at all. If /feedDB is called after a single message is
  created, a validation error occurs since there would be duplicate ids.
- In /message/create the request body should have content, sender, receiver and seen.
- In /message/get any of the properties specified in the model can be used as query params. If none, all messages are returned.
- In /message/update/:id, all properties can be updated except for the id
- In /user/get any of the properties specified in the model can be used as query params. If none, all users are returned. First name,
  surname, sex and username can be searched for case insensitive.
- In /user/get/message/:userA/:userB, userA and userB ids must be provided in the request path parameters

# Models

## Messages

- id : integer, unique id, cannot be updated
- content: string, message content
- sender: string, message sender
- receiver: string, message receiver
- seen: boolean, boolean flag for reading a message
- timestampSent: string, message timestamp

## Users

- id : integer, unique id, cannot be updated
- firstName: string, user's first name
- surname: string, user's surname
- dateOfBirth: string, user's date of birth (MM-DD-YYYY)
- sex: string, user's sex
- username: string, user's username

# Frontend

Frontend is a React application created with create-react-app running on port 3000. ShowMessages is the main component, where all messages are shown, while ShowConversation utilizes the /user/get/message endpoint and shows messages between user A and B, ordered by the most recent one.
