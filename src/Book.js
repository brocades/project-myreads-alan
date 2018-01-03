import React, { Component } from 'react'
import { If, Then, Else } from 'react-if'

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
		return (
			<div className="book">
        <div className="book-top">
          <div className="book-cover" style={{backgroundImage: `url("${imageLinks.smallThumbnail}")` }}></div>
          <div className="book-shelf-changer">
            <select
              id={id}
              defaultValue={shelf ? shelf : "none"}
              onChange={() => this.changeShelf(id)}>
              <option value="none" disabled>Move to...</option>
              {this.state.options.map((option, index) => (
                <If condition={option.value !== shelf}>
                <Then>
                  <option
                  key={index}
                  value={option.value}
                  >{option.text}</option>
                </Then>
                <Else>
                  <option
                  key={index}
                  value={option.value}
                  >✓ {option.text}</option>
                </Else>
                </If>
              ))}
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        <If condition={authors instanceof Array}>
          <Then>
            <div>
              {() => authors.map((author, index) => <div key={index} className="book-authors">{author}</div>)}
            </div>
          </Then>
          <Else>
            <div key={authors} className="book-authors">{authors}</div>
          </Else>
        </If>
      </div>
		)
	}
}

export default Book;