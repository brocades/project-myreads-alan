# MyReads Project

For my application 3 components were developed after quick observation of the initial model distributed by Udacity:

* [`BooksApp`](#BookApp)
* [`BookShelf`](#BookShelf)
* [`Book`](#Book)

It respects the _Source of Truth_ concept by keeping the necessary state inside the main BooksApp component and only altering it inside itself.

## Running the application


In order to run the application you will need to install all its dependencies first by running the command `npm install` while in the root folder of the application
and then, after all dependencies are installed, just type `npm start`.

### `BooksApp`

State:

```js
  state = {
    books: [],
    searchedBooks: [],
    query: ''
  }
```

* `books`: `<Array>` maintains the state for books that already have a defined shelf
* `searchedBooks`: `<Array>` maintains the state for books that do not have a defined shelf, used in the search page.
* `query`: `<String>` containing the query string

Main functions:

* `searchBooks`: makes use of the provided `search` method from BooksAPI
* `changeBookshelf`: makes use of the provided `update` method from BooksAPI
* `updateBooks`: makes use of the provided `getAll` method from BooksAPI

### `BookShelf`

Props:

```js
pageType, onBookUpdate, title, books
```

* `pageType`: `<String>` containing the page which the shelf belongs to for filtering
* `onBookUpdate`: `<Function>` containing the function responsible for updating a book's shelf
* `title`: `<String>` containing the shelf title
* `books`: `<Array>` containing the books fetched by the BooksAPI `getAll()` method


### `Book`

Props:

```js
onChangeShelf, book
```

* `onChangeShelf`: `<Function>` containing the function responsible for changing a book's shelf
* `book`: `<Object>` containing a specific book

## Note to reviewer

The application is in its canonical state presenting only the suggested functionalities. No extra libraries or frameworks were used as well as no tests were developed.

