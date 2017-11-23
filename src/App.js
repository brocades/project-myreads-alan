import React from 'react'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'

class BooksApp extends React.Component {
  state = {
    books: [],
    searchedBooks: [],
    query: ''
  }

  updateBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  updateQuery = (query) => {
    this.setState({query: query.trim()})
  }

  resetSearchResults = () => {
    this.setState({searchedBooks: [], query: ''})
  }

  searchBooks = (query) => {
    this.updateQuery(query)
    BooksAPI.search(query).then((searchedBooks) => {
      this.setState({ searchedBooks })
    })
  }

  componentDidMount() {
    this.updateBooks()
  }

  changeBookShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      this.updateBooks()
    })
  }

  render() {
    const { books, searchedBooks } = this.state
    return (
      <div className="app">
          <Route exact path="/search" render={() => (
            <div className="search-books">
              <div className="search-books-bar">
                <Link 
                  to="/"
                  className="close-search"
                  onClick={this.resetSearchResults}
                  >Close</Link>
                <div className="search-books-input-wrapper">
                  <input 
                    type="text" 
                    onChange={(event) => this.searchBooks(event.target.value)}
                    placeholder="Search by Title or Author"/>
                </div>
              </div>              
              <div className="search-books-results">
                <div>
                  <BookShelf pageType="search" onBookUpdate={this.changeBookShelf} books={searchedBooks}/>
                </div>
              </div>                  
            </div>                     
          )}/>
          <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf pageType="main" onBookUpdate={this.changeBookShelf} title="Currently Reading" books={books}/>
                <BookShelf pageType="main" onBookUpdate={this.changeBookShelf} title="Want to Read" books={books}/>
                <BookShelf pageType="main" onBookUpdate={this.changeBookShelf} title="Read" books={books}/>
              </div>
            </div>
            <div className="open-search">
              <Link 
                to="/search"
                >Add a book</Link>
            </div>
            </div>
          )}/>        
        </div>      
    )
  }
}

export default BooksApp
