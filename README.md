# Project-2-

### At Home Mixology guide
I hope to create an app that has a database of drink recipes available to display. The app would allow a user to create an account, choose available liquor in order to generate a list of available drink options.

### MVP
  - Allow a user to create a Login (Username and Password).
  - Allow a user to login and logout.
  - Allow a user to select available recipe from list.
  - Allow a user to modify available liquor to update list.
  - Allow a user to see Recipes that are parial and completely available (Allows for improvisation)

### Stretch Goals
  - A user will not be able to create duplicates
  - A user will be able to favorite recipes
  - A user will be able to duplicate and modify recipes
  - A user will be able to rate recipes attempted (0 - 10)
  - A user will be able to remove recipes

### Front-end
> Are you planning to use Handlebars, EJS, or DOM-manipulation for your HTML?

I plan to use EJS primarily, but will lookingto the possible usage of Handlebars and DOM-manipulation.

### List of Mongoose models and their properties
```js
//  Primary Model
User = {
  username: String,
  password: String,
  favorites: [Recipe],
  available_recipe: [Recipe],
  available_booze: [Booze]
}

//  Secondary Model
Recipe = {
  name: String,
  recipe: String,
  description: String,
  favorite: Boolean,
  required: [Booze]
}

// Tertiary Model
Booze = {
  name: String,
  image: String,
  available: Boolean
}
```

### List of Routes

| Action | Method | Path                    | Action                                                               |
| ------ | ------ | ----------------------- | -------------------------------------------------------------------- |
| INDEX  | GET    | `/drinks`               | Read information about all recipes                                   |
| NEW    | GET    | `/drinks/new`           | Show form to make new or copied recipe                               |
| CREATE | POST   | `/drinks`               | Create a new recipe                                                  |
| SHOW   | GET    | `/drinks/:drinkId`      | Read information about the recipe                                    |
| EDIT   | GET    | `/drinks/:drinkId/edit` | Show existing form for existing recipe                               |
| UPDATE | PUT    | `/drinks/:drinkId`      | Update the existing recipe with new content                          |
| DESTROY| DELETE | `/drinks/:drinkId`      | Delete the existing recipe, then redirect                            |

### User stories
  - User will be able to create a login
  - User will be able to logout and login
  - User will be able to easily select available liquor
  - User will be able to scroll through recipes 
  - User will be able to copy or add recipes 
  - User will be able to delete recipes
  - User will be able to favorite and unfavorite recipes
  - User will be able to edit recipes

### Wireframes
![image](https://user-images.githubusercontent.com/102195632/171984869-ee844613-0142-4c3f-93a8-1fb49fed264b.png)
![image](https://user-images.githubusercontent.com/102195632/171985323-0449fefc-5d47-44c5-8b5e-9431b5688440.png)
![image](https://user-images.githubusercontent.com/102195632/171985590-0de6aa8c-e5f3-4392-b77a-96b62d6716b1.png)
![image](https://user-images.githubusercontent.com/102195632/171985800-b722548a-d938-4a31-9f21-e3f840e9f75f.png)



