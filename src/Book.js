import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'

class Book extends Component {

  state = {
    options: [{value: "currentlyReading", text:"Currently Reading"},
              {value: "wantToRead", text:"Want to Read"},
              {value: "read", text:"Read"},
              {value: "none", text:"None"}]
  }

  updateShelf(elementId) {
    let selectBox = document.getElementById(elementId);
    let selectedValue = selectBox.options[selectBox.selectedIndex].value;
    BooksAPI.update(this.props.book, selectedValue).then((msg) => console.log(msg))
  }

	render() {
		const { id, title, authors, imageLinks, shelf } = this.props.book
		return (
			<div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${imageLinks.smallThumbnail}")` }}></div>
          <div className="book-shelf-changer">
            <select id={id} onchange={this.updateShelf(id)}>
              <option value="none" disabled>Move to...</option>
              {this.state.options.map((option) => (
                option.value !== shelf ? 
                (<option value={option.value}>{option.text}</option>) 
                : (<option value={option.value}>✓ {option.text}</option>)
              ))}
              
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        {authors.map((author) => (
          <div className="book-authors">{author}</div>
          ))}
      </div>
		)
	}
}

export default Book;