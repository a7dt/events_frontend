import React, { Component } from 'react';
import axios from 'axios';
import AddEventForm from "../components/AddEventForm";
import EditEventForm from "../components/EditEventForm";
import SearchForm from "../components/SearchForm";


// Function for rendering event component
function Event(props) {

  var infoContainerStyle = {
    background:"lightblue",
    width:"45%",
    margin: "10px",
    float:"left",
    padding:"5px",
    position: "relative"
  }

  var deleteBtnStyle = {
    position: "absolute",
    right : 0,
    top: 0,
    width: "30px",
    height: "30px",
    background: "coral",
    textAlign: "center"
  }

  return (

    <div style = {infoContainerStyle}>

      <h2> {props.name} </h2>
      <p> Description: {props.desc} </p>
      <p> Price: {props.price} </p>

      <div style = {deleteBtnStyle}
        onClick = {() => {props.delete(props.id)}}
      > X </div>

      <hr />

      <button onClick = {
        () => {props.edit(props.id)}
      }> EDIT </button>

    </div>
  )
}


// Container component for events
function EventList(props) {

  var events = props.eventslist;

  const listItems = events.map( (event) =>
    <Event
      id={event._id}
      name={event.name}
      desc={event.description}
      price={event.price}
      delete={props.del}
      edit = {props.edit}
    />
  );

  return (
    <div> {listItems} </div>
  );
}

// Main container
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
    this.showAllEvents = this.showAllEvents.bind(this);
  }

  componentDidMount() {
    this.showAllEvents();
  }


  // Get all events
  showAllEvents() {

    axios.get('http://localhost:5000')
    .then( (res) => {
      var data = res.data.events;

      this.setState({
        events: data
      });
    })
    .catch((error) => {
      this.props.writeMsg("Couldn't show events: " + error.message);
    });
  }


  // Add new event
  addEvent(eventData) {

    // Data comes from AddEventForm
    var n = eventData.name;
    var desc = eventData.description;
    var price = eventData.price;

    axios.post('http://localhost:5000/create', {
      name: n,
      description: desc,
      price: price
    })
    .then( (res) => {
      this.props.writeMsg("Event added succesfully");
      return axios.get('http://localhost:5000');
    })
    .then( (res) => {

      var data = res.data.events;

      this.setState({
        events: data
      });

    })
    .catch( (error) => {
      this.props.writeMsg("Couldnt add event: " + error.message);
    });
  }


  // Deleting an event
  deleteEvent(id) {

    axios.get("http://localhost:5000/delete/" + id)

    .then( (response) => {
      this.props.writeMsg("Event deleted succesfully");
      return axios.get('http://localhost:5000');
    })
    .then((res) => {

      var data = res.data.events;

      this.setState({
        events: data
      });

    })
    .catch( (err) => {
      this.props.writeMsg("Couldnt delete event: " + err);
    });
  }


  // Rendering edit event form
  editEvent(id) {

    // For usability reasons, scroll to top
    window.scrollTo(0, 0);
    this.props.writeMsg("");

    axios.get("http://localhost:5000/edit/" + id)
    .then( (res) => {
      this.setState({
        editing: true,
        editedEvent : res.data.event
      });
    })
    .catch((err) => {
      this.props.writeMsg("Couldnt open edit: " + err);
    });
  }


  // Confirming edits
  confirmEdit(eventData) {

    var id = eventData.id;

    axios.post("http://localhost:5000/edit/" + id, {
      name: eventData.name,
      description: eventData.description,
      price: eventData.price
    })
    .then( (res) => {
      this.props.writeMsg("Event updated.");
      return axios.get('http://localhost:5000');
    })
    .then( (res) => {

      this.setState({
        editing: false,
        events: res.data.events
      });

    })
    .catch((error) => {
      this.props.writeMsg("Couldnt confirm edit: " + error);

      this.setState({
        editing: false,
        editedEvent: ''
      });

    });
  }


  // Searching an event
  searchEvent(searchData) {

    var searchterm = searchData.searchterm;
    var isFree = searchData.isFree;

    var str = (searchterm !== "") ? "http://localhost:5000/search?term=" + searchterm + "&free=" + isFree : "http://localhost:5000/search?free=" + isFree;

    axios.get(str)
    .then((res) => {
      this.props.writeMsg("");

      this.setState({
        events: res.data.events
      });
    })
    .catch((error) => {
      this.props.writeMsg("Search failed: " + error);
    });
  }


  render() {

    return (

      <div>

        {/* Return edit form or all the other content*/}

        {this.state.editing ?
          <EditEventForm
            data={this.state.editedEvent}
            confirm={this.confirmEdit}
          /> :

          <div>
            <AddEventForm addEvent = {this.addEvent} />
            <hr />
            <SearchForm searchEvent = {this.searchEvent} resetSearch = {this.showAllEvents} />
            <hr />

            {
              this.state.events ? <EventList
                                  eventslist={this.state.events}
                                  del={this.deleteEvent}
                                  edit={this.editEvent}
                                  /> : ''
            }

          </div>
        }

      </div>
    );
  }
}

export default EventsContainer;
