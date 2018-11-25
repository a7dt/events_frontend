import React, { Component } from 'react';

class EditEventForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      description: '',
      price: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({
      id: this.props.data._id,
      name: this.props.data.name,
      description: this.props.data.description,
      price: this.props.data.price,
    })
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

    this.props.confirm(eventData);
  }

  render() {

    return (
      <div>
        <p> EDIT EVENT </p>

        <form onSubmit = {this.handleSubmit}>

          <label>
            events name:
            <input name="name" type="text" value={this.state.name} onChange={this.handleChange} />
          </label>
          <br />
          <label>
            description:
            <input name="description" type="textarea" value={this.state.description} onChange={this.handleChange} />
          </label>
          <br />
          <label>
            price:
            <input name="price" type="text" value={this.state.price} onChange={this.handleChange} />
          </label>

          <input type="submit" value="submit" />

        </form>
      </div>
    );
  }
}

export default EditEventForm;
