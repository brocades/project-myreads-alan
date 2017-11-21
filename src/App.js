import React from 'react'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'

class BooksApp extends React.Component {
  state = {
    books: [],
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

  searchBooks = (query) => {
    this.updateQuery(query)
    BooksAPI.search(query).then((books) => {
      this.setState({ books })
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
    const { books } = this.state
    return (
      <div className="app">
        <Route exact path="/search" render={({history}) => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
              <div className="search-books">
                <div className="search-books-bar">
                  <Link 
                    to="/"
                    className="close-search"
                    >Close</Link>
                  <div className="search-books-input-wrapper">
                    {/*
                      NOTES: The search from BooksAPI is limited to a particular set of search terms.
                      You can find these search terms here:
                      https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                      However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                      you don't find a specific author or title. Every search is limited by search terms.
                    */}
                    {/*TO-DO use BookShelf search */}
                    <input 
                      type="text" 
                      onChange={(event) => this.searchBooks(event.target.value)}
                      placeholder="Search by Title or Author"/>
                    <div className="list-books-content">
                      <div>
                        <BookShelf pageType="search" onBookUpdate={() => {this.changeBookShelf; history.push('/')}} books={books}/>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="search-books-results">
                  <ol className="books-grid"></ol>
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
