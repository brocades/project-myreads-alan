import React, { Component } from 'react'
import Book from './Book'

class BookShelf extends Component {

	areEqualTitles(bookShelf, shelfTitle) {
		return bookShelf.toUpperCase().replace(/\s+/g,'') === shelfTitle.toUpperCase().replace(/\s+/g,'')
	}

	render() {
		const { title, books, pageType } = this.props
		let filteredBooks = books
		if (title) {
			filteredBooks = books.filter((book) => this.areEqualTitles(book.shelf, title))
		}
		return (
			pageType !== "search" ? (
			<div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {filteredBooks.map((book) => (
            	<li key={book.id}>
            		<Book onChangeShelf={this.props.onBookUpdate} book={book}/>
            	</li>
            ))}
          </ol>
        </div>
      </div>
      )
      :
      ( 
      	<div className="bookshelf">
	        <div className="bookshelf-books">
	          <ol className="books-grid">
	            {filteredBooks.map((book) => (
	            	<li key={book.id}>
	            		<Book onChangeShelf={this.props.onBookUpdate} book={book}/>
	            	</li>
	            ))}
	          </ol>
	        </div>
	      </div>
      	)
		)
	}
}

export default BookShelf