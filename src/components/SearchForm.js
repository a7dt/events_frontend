import React, { Component } from 'react';

class SearchForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchterm: '',
      isFree: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {

     const target = e.target;
     const value = target.type==="text" ? target.value : target.checked;
     const name = target.name;

     this.setState({
       [name]: value
     });
  }

  handleSubmit(e) {
    e.preventDefault();

    var searchData = { ...this.state };

    this.props.searchEvent(searchData);
  }

  render() {

    return (
      <div>
        <p> search event </p>

        <form onSubmit = {this.handleSubmit}>

          <label>
            search term:
            <input name="searchterm" type="text" value={this.state.searchterm} onChange={this.handleChange} />
          </label>
          <br />
          <label>
            show free events:
            <input type="checkbox" name="isFree" value={this.state.isFree} onChange={this.handleChange} />
          </label>
          <br />
          <input type="submit" value="submit" />

        </form>
      </div>
    );
  }
}

export default SearchForm;
