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

    this.setState({
      id: '',
      name: '',
      description: '',
      price: ''
    });

    this.props.confirm(eventData);
  }

  render() {

    return (
      <div>

        <form onSubmit = {this.handleSubmit} style = {{background:"lightgreen", padding:"0 10px 10px 10px"}}>

          <p> Edit event </p>

          <label>
            events name:
            <br />
            <input name="name" type="text" value={this.state.name} onChange={this.handleChange} />
          </label>
          <br />
          <label>
            description:
            <br />
            <input name="description" type="textarea" value={this.state.description} onChange={this.handleChange} />
          </label>
          <br />
          <label>
            price:
            <br />
            <input name="price" type="text" value={this.state.price} onChange={this.handleChange} />
          </label>
          <br />
          <input type="submit" value="submit" />

        </form>
      </div>
    );
  }
}

export default EditEventForm;
