import React, { Component } from 'react'

class Book extends Component {

  state = {
    options: [{value: "currentlyReading", text:"Currently Reading"},
              {value: "wantToRead", text:"Want to Read"},
              {value: "read", text:"Read"},
              {value: "none", text:"None"}]
  }

  changeShelf = (elementId) => {
    let selectBox = document.getElementById(elementId)
    let selectedValue = selectBox[selectBox.selectedIndex].value
    this.props.onChangeShelf(this.props.book, selectedValue)
  }
	render() {
		const { id, title, authors, imageLinks, shelf } = this.props.book
    //if (this.props.onChangeShelf) console.log("the function exists")
		return (
			<div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${imageLinks.smallThumbnail}")` }}></div>
          <div className="book-shelf-changer">
            <select 
              id={id} 
              defaultValue={shelf}
              onChange={() => this.changeShelf(id)}>
              <option value="none" disabled>Move to...</option>
              {this.state.options.map((option, index) => (
                option.value !== shelf ? 
                (<option 
                  key={index} 
                  value={option.value}
                  >{option.text}</option>) 
                : 
                (<option
                  key={index} 
                  value={option.value}
                  >✓ {option.text}</option>)
              ))}
              
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        { authors instanceof Array ? 
            authors.map((author, index) => (<div key={index} className="book-authors">{author}</div>))
            :
            <div key={authors} className="book-authors">{authors}</div>
        }             
      </div>
		)
	}
}

export default Book;