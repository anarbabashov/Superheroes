# Front-end + RESTful Exercise

Create a front-end User Interface with the backend to display a list of super hero and their favorite food. You are welcome to use any library you want (Angular, React, etc.). The UI shouldn't be hurt to look at and the UX shouldn't be horrible nor complicated. 

There's always more than one way to do something, feel free to modify the backend code if necessary. 


### Getting started
In project root directory, run `npm run dev` to get started. The server will be running on port `3001`



### Requirements
Cover the following endpoints:
1. `GET localhost:3001/users/foods` to display a list of super hero with their favorite food.
2. `POST localhost:3001/users/food` to add in a new super hero along with his/her favorite food. 

*Hint: run `npm run test` to see test example*

### Bonus (not required)
1. Implement `DELETE` RESTful endpoint.
2. Currently, there are duplicated super heros returned from `GET` endpoint. Combine them to reduce the response payload size. Be sure this new format will work with the front-end. For example:

```
  {
      "id": 16,
      "hero_name": "spider man",
      "first_name": "peter",
      "last_name": "parker",
      "favorite_food": "candy"
  },
  {
      "id": 17,
      "hero_name": "spider man",
      "first_name": "peter",
      "last_name": "parker",
      "favorite_food": "diet coke"
  }

  ----------------------------------------------------
  ------------- PERFORM REDUCE OPERATION -------------
  ----------------------------------------------------

  {
    "hero_name": "spider man",
    "first_name": "peter",
    "last_name": "parker",
    "favorite_foods": [
      { "id": 16, "food": "candy" },
      { "id": 17, "food": "diet coke" },
      ...
    ]
  }

```
