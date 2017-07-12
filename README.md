# Quantified Self

### Team Members: Jonathan Kidd & Lauren Oliveri

## API Endpoints

### Food CRUD

#### List of All Foods

`GET /api/foods`

Returns index of all active foods:

```
[
    {
        "id": 1,
        "name": "Orange",
        "calories": 90,
        "created_at": "2017-07-09T22:39:37.799Z",
        "status": "active"
    },
    {
        "id": 2,
        "name": "Banana",
        "calories": 105,
        "created_at": "2017-07-09T22:39:37.799Z",
        "status": "active"
    },
    {
        "id": 3,
        "name": "Garden Salsa Sunchips",
        "calories": 300,
        "created_at": "2017-07-09T22:39:37.799Z",
        "status": "active"
    }
]

```

#### Show Particular Food

`GET /api/foods/:id`

Returns details for a single food item:

```
{
    "id": 1,
    "name": "Orange",
    "calories": 90,
    "created_at": "2017-07-09T22:39:37.799Z",
    "status": "active"
}
```

#### Create a New Food

`POST /api/foods?name=[]&calories=[]`

Will create a new food and return the index with all foods:

```
[
    {
        "id": 1,
        "name": "Orange",
        "calories": 90,
        "created_at": "2017-07-09T22:39:37.799Z",
        "status": "active"
    },
    {
        "id": 2,
        "name": "Banana",
        "calories": 105,
        "created_at": "2017-07-09T22:39:37.799Z",
        "status": "active"
    },
    {
        "id": 3,
        "name": "Garden Salsa Sunchips",
        "calories": 300,
        "created_at": "2017-07-09T22:39:37.799Z",
        "status": "active"
    },
    {
        "id": 4,
        "name": "Pretzels",
        "calories": 200,
        "created_at": "2017-07-09T22:56:06.481Z",
        "status": "active"
    }
]
```

#### Update an Existing Food

`PUT /api/foods/:id?name=[]&calories=[]`

Will update an existing food and return the index with all foods:

```
[
    {
        "id": 1,
        "name": "Orange",
        "calories": 90,
        "created_at": "2017-07-09T22:39:37.799Z",
        "status": "active"
    },
    {
        "id": 2,
        "name": "Banana",
        "calories": 105,
        "created_at": "2017-07-09T22:39:37.799Z",
        "status": "active"
    },
    {
        "id": 3,
        "name": "Garden Salsa Sunchips",
        "calories": 300,
        "created_at": "2017-07-09T22:39:37.799Z",
        "status": "active"
    },
    {
        "id": 4,
        "name": "Pretzels",
        "calories": 150,
        "created_at": "2017-07-09T22:56:06.481Z",
        "status": "active"
    }
]
```

#### Delete a Food

`DELETE /api/foods/:id`

Will 'inactivate' an existing food by its id and return the current index with all foods:

```
[
    {
        "id": 1,
        "name": "Orange",
        "calories": 90,
        "created_at": "2017-07-09T22:39:37.799Z",
        "status": "active"
    },
    {
        "id": 2,
        "name": "Banana",
        "calories": 105,
        "created_at": "2017-07-09T22:39:37.799Z",
        "status": "active"
    },
    {
        "id": 3,
        "name": "Garden Salsa Sunchips",
        "calories": 300,
        "created_at": "2017-07-09T22:39:37.799Z",
        "status": "active"
    }
]

```

### Updating Diary

#### List All Foods for a Meal

`GET /api/meals/:id`

Returns an array of food items for a particular meal by the meal's id:

```
[
    {
        "id": 7,
        "name": "Pizza",
        "calories": 300,
        "created_at": "2017-07-09T22:39:37.736Z",
        "status": "active",
        "food_id": 1,
        "meal_id": 3
    },
    {
        "id": 8,
        "name": "Pretzels",
        "calories": 150,
        "created_at": "2017-07-09T22:39:37.736Z",
        "status": "active",
        "food_id": 2,
        "meal_id": 3
    }
]
```

Meal IDs:
* 1 = Breakfast
* 2 = Lunch
* 3 = Dinner
* 4 = Snacks

#### Add Food to Meal

`POST /api/food_meals?food_id=[]&meal_id=[]`

Adds a food to a meal by creating a new joins item (food_meal) and returns an array of that meal's current list of foods:

```
[
    {
        "id": 7,
        "name": "Pizza",
        "calories": 300,
        "created_at": "2017-07-09T22:39:37.736Z",
        "status": "active",
        "food_id": 1,
        "meal_id": 3
    },
    {
        "id": 8,
        "name": "Pretzels",
        "calories": 150,
        "created_at": "2017-07-09T22:39:37.736Z",
        "status": "active",
        "food_id": 2,
        "meal_id": 3
    },
    {
        "id": 9,
        "name": "Root Beer",
        "calories": 150,
        "created_at": "2017-07-09T22:39:37.736Z",
        "status": "active",
        "food_id": 3,
        "meal_id": 3
    }
]
```

#### Remove Food from Meal

`DELETE /api/food_meals/:id`

Will remove the food from that meal by the food_meal id and returns an array of that meal's current list of foods:

```
[
    {
        "id": 8,
        "name": "Pretzels",
        "calories": 150,
        "created_at": "2017-07-09T22:39:37.736Z",
        "status": "active",
        "food_id": 2,
        "meal_id": 3
    },
    {
        "id": 9,
        "name": "Root Beer",
        "calories": 150,
        "created_at": "2017-07-09T22:39:37.736Z",
        "status": "active",
        "food_id": 3,
        "meal_id": 3
    }
]
```
