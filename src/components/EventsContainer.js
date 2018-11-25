import React, { Component } from 'react';
import axios from 'axios';
import AddEventForm from "../components/AddEventForm";
import EditEventForm from "../components/EditEventForm";
import SearchForm from "../components/SearchForm";


function Event(props) {

  return(
    <div>
      <p onClick = {() => {props.delete(props.id)}} > delete </p>
      <p onClick = {() => {props.edit(props.id)}}> EDIT </p>
      <p> {props.name} </p>
      <p> {props.desc} </p>
      <p> {props.price} </p>
      <hr />
    </div>
  )
}


// Listing events
function EventList(props) {

  var eventss = props.eventslist;

  const listItems = eventss.map((event) =>
    <Event id={event._id}
          name={event.name}
          desc={event.description}
          price={event.price}
          delete={props.del}
          edit = {props.edit}
          />
  );

  return ( <div> {listItems} </div> );
}



class EventsContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      events: '',
      editing: false,
      editedEvent: ''
    };

    this.addEvent = this.addEvent.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
    this.editEvent = this.editEvent.bind(this);
    this.confirmEdit = this.confirmEdit.bind(this);
    this.searchEvent = this.searchEvent.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:5000')
    .then((response) => {

      var data = response.data.events;

      //var d = Object.keys(data).map(i => data[i])

      this.setState({
        events: data
      })

    })
    .catch((error) => {
      this.props.writeMsg("Couldn't load events: " + error.message);
    })
  }

  fuck = () => {

    var obj = this.state.events;

    /*obj.map( (one) => {
      alert(one.name)
    })*/

    alert(obj)

  }

  addEvent(eventData) {

    // user.username, user.password

    var n = eventData.name;
    var desc = eventData.description;
    var price = eventData.price;

    axios.post('http://localhost:5000/create', {
      name: n,
      description: desc,
      price: price
    })
    .then( (response) => {
      return axios.get('http://localhost:5000');
    })
    .then( (response) => {

      var data = response.data.events;

      //var d = Object.keys(data).map(i => data[i])

      this.setState({
        events: data
      })
    })
    .catch( (error) => {
      this.setState({
        message: "Couldnt add event: " + error.message
      });
    });
  }


  deleteEvent(id) {

    axios.get("http://localhost:5000/delete/" + id)

      .then( (response) => {
        return axios.get('http://localhost:5000');
      })

      .then((res) => {

        var data = res.data.events;

        this.setState({
          events: data
        })

      })
      .catch((err) => alert(err))

  }

  editEvent(id) {

    axios.get("http://localhost:5000/edit/" + id)
    .then((response) => {
      this.setState({
        editing: true,
        editedEvent : response.data.event
      })
    })

    .catch((err) => {
      alert(err);
    });

  }

  confirmEdit(eventData) {

    var id = eventData.id;

    alert(eventData.price)


    axios.post("http://localhost:5000/edit/" + id, {
      name: eventData.name,
      description: eventData.description,
      price: eventData.price
    })
    .then( (response) => {
      return axios.get('http://localhost:5000');
    })
    .then( (res) => {

      this.setState({
        editing: false,
        events: res.data.events
      })
    })
    .catch((error) => {
      alert(error);
    });

  }

  searchEvent(searchData) {

    var searchterm = searchData.searchterm;
    var isFree = searchData.isFree;

    var str = "http://localhost:5000/search?term=" + searchterm + "&isFree:" + isFree;

    alert(str)

    axios.get(str)
    .then((res) => {
      this.setState({
        events: res.data.events
      })
    })
    .catch((error) => {
      alert(error);
    });

  }

  render() {

    return (
      <div>

        {this.state.editing ?
          <EditEventForm
            data={this.state.editedEvent}
            confirm={this.confirmEdit}
          /> :
          <AddEventForm addEvent = {this.addEvent} />}


        <SearchForm searchEvent = {this.searchEvent} />

        <hr />

        <button onClick={this.fuck} />

        { this.state.events ? <EventList
                                eventslist={this.state.events}
                                del={this.deleteEvent}
                                edit={this.editEvent}

                                /> : ''
                              }

      </div>
    );
  }
}

export default EventsContainer;
