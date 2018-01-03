import React from 'react'
import Book from './Book'
import { If, Then, Else } from 'react-if'

function areEqualTitles(bookShelf, shelfTitle) {
	return bookShelf.toUpperCase().replace(/\s+/g,'') === shelfTitle.toUpperCase().replace(/\s+/g,'')
}

function BookShelf(props) {
	const { title, books, pageType } = props
	let filteredBooks = books
	if (title) {
		filteredBooks = books.filter((book) => areEqualTitles(book.shelf, title))
	}
	return (
		<If condition={pageType !== "search"}>
			<Then>
				<div className="bookshelf">
				    <h2 className="bookshelf-title">{title}</h2>
				    <div className="bookshelf-books">
				      <ol className="books-grid">
				        {filteredBooks.map((book) => (
				        	<li key={book.id}>
				        		<Book onChangeShelf={props.onBookUpdate} book={book}/>
				        	</li>
				        ))}
				      </ol>
				    </div>
			  	</div>
			</Then>
			<Else>
				<div className="bookshelf">
					<div className="bookshelf-books">
					  <ol className="books-grid">
					    {filteredBooks.map((book) => (
					    	<li key={book.id}>
					    		<Book onChangeShelf={props.onBookUpdate} book={book}/>
					    	</li>
					    ))}
					  </ol>
					</div>
				</div>
			</Else>
		</If>
	)
}

export default BookShelf