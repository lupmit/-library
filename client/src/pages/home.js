import React, { Component } from "react";
import { getBooks } from "../api/api";
import Jumbotron from "../components/jumbotron";
import { Form, Select, Input, Btn } from "../components/form";

const menu = [
    { value: 'def', label: 'Mặc định' },
    { value: 'title', label: 'Tên Sách' },
    { value: 'year', label: 'Năm' },
    { value: 'publisher', label: 'Nhà x/bản' }
  ];

export default class Home extends Component {
    state = {
        clickSearch: false,
        loading: false,
        bookInput: "",
        bookSearched: "",
        books: [],
        orderBy: "def",
    }

    handleChange = event => {
      // Destructure the name and value properties off of event.target
      // Update the appropriate state
      const { name, value } = event.target;
      this.setState({
        
        [name]: value
      });
    };

    handleFormSubmit = event => {
      // When the form is submitted, prevent its default behavior, get recipes update the recipes state
      event.preventDefault();
      if(this.state.bookInput ){
        this.setState({loading: true, clickSearch: true});
        this.setState({bookSearched: this.state.bookInput});
        getBooks(this.state.bookInput, this.state.orderBy)
        .then(res => {
          let book = res.data;
          this.setState({books: book,  loading: false});
        })
        .catch(err => console.log(err));
      }
    };


    render() {
      return (
        <div className="container">
          <Jumbotron>
                {this.state.books.length ?
                <div>
                <h1 className="display-4 center">Kết quả tìm kiếm cho: </h1>
                <h2>"{this.state.bookSearched}"</h2>
                </div>
                :
                <div>
                <h1 className="display-4 center">Library</h1>
                <p className="lead">Những cuốn sách hay từ nguồn:<a href="http://gen.lib.rus.ec/" className="lib-page">LibGen</a></p>
                </div>
              }
          </Jumbotron>
          <Form>
                <Select 
                    data= {menu}
                    onChange = {this.handleChange}
                    name = "orderBy"
                > </Select>
                <Input
                    onChange = {this.handleChange}
                    name = "bookInput"
                ></Input>
                <Btn
                    onClick = {this.handleFormSubmit}
                ></Btn>

          </Form>
        <div>
            {this.state.clickSearch ?
             
             this.state.loading ? 
            <h4 className="text-center">Searching...</h4>
            :this.state.books.length ? 
            <ul className="list-group">
                {this.state.books.map(book => {
                    const {title, authors, description, imageLinks, downloadLink} = book;
                    return(
                        <li className="list-group-item" key={title}>
                            <a className="btn btn-primary m-2 text-white float-right"  href={downloadLink} target="_blank"  rel="noreferrer">Tải về</a>
                            <h2 >{title}</h2>
                            {authors ?
                            <h4>Tác giả: {authors}</h4>
                            : <h4>Không có tác giả</h4>}
                            <div className="align-items-center row">
                                <div className="col-lg-2 col-md-3 col-sm-6">
                                    <img className="m-3" src={imageLinks}  alt="book-cover"  />
                                </div>
                                <div className="col-lg-10 col-md-9 col-sm-6">
                                    <p className="my-3">{description ? description : "Không có mô tả"}</p>
                                </div>
                            </div>
                        </li>)
                    }
                    
                )}
            </ul>
            : <h4 className="text-center">Không tìm thấy sách!</h4>
            : <div></div>
            }
        </div>

        </div>
      )
    }
}