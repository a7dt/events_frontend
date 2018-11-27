import React, { Component } from 'react';

class AddEventForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      price: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {

     const target = e.target;
     const value = target.value;
     const name = target.name;

     this.setState({
       [name]: value
     });
  }

  handleSubmit(e) {

    e.preventDefault();

    var eventData = { ...this.state }

    this.setState({
      name: '',
      description: '',
      price: ''
    });

    this.props.addEvent(eventData);
  }

  render() {

    return (
      <div>
        <p> Add event </p>

        <form onSubmit = {this.handleSubmit}>

          <label>
            Events name:
            <br />
            <input name="name" type="text" value={this.state.name} onChange={this.handleChange} />
          </label>
          <br />
          <label>
            Description:
            <br />
            <input name="description" type="textarea" value={this.state.description} onChange={this.handleChange} />
          </label>
          <br />
          <label>
            Price:
            <br />
            <input name="price" type="text" value={this.state.price} onChange={this.handleChange} />
          </label>
          <br />
          <input type="submit" value="add event" />

        </form>
      </div>
    );
  }
}

export default AddEventForm;
