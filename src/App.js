import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        rooms: 1, //min. 1 to 5
        adults: 1, // >=1 (atleast 1 adult)
        children: 0, // >=0
        persons: 1, // min 1 to 4(adults+children) in each room
    }
  }

  componentDidUpdate(prevProps, prevState, snapShot) {
    if(prevState.adults !== this.state.adults || prevState.children !== this.state.children) {
      this.updatePersonsCount();
    }
  }

  roomsDecrement = () => {
    const rooms = this.state.rooms;
    if(rooms > 1) {
      const maxAllotment = (rooms-1)*4;
      if(this.state.persons > maxAllotment) {
        const children = this.state.children;
        const adults = this.state.adults;
        if(adults>1 && children>0) {
          let adults = maxAllotment;
          let children = maxAllotment-adults;
          if((adults+children) <= maxAllotment) {
            this.setState({adults: adults, children: children});
          }
        }
        else if(children > 0 && adults===1) {
          this.setState({children: (maxAllotment-adults)});
        }
        else if(adults > 1 && children===0) {
          this.setState({adults: (maxAllotment-children)});
        }
      }
      this.setState({rooms: rooms - 1});
    }
  }

  roomsIncrement = () => {
    if(this.state.rooms < 5) {
      const rooms = this.state.rooms;
      const adults = this.state.adults;
      this.setState({rooms: rooms + 1, adults: adults + 1});
    }
  }

  adultsDecrement = () => {
    if(this.state.adults > 1) {
      const adults = this.state.adults;
      this.decrChildAdult("adults", adults);
    }
  }

  adultsIncrement = () => {
    const adultsCount = this.state.adults;
    this.incrChildAdult("adults", adultsCount);
  }

  childrenDecrement = () => {
    if(this.state.children > 0) {
      const children = this.state.children;
      this.decrChildAdult("children", children);
    }
  }

  childrenIncrement = () => {
    const childrenCount = this.state.children;
    this.incrChildAdult("children", childrenCount);
  }

  updatePersonsCount = () => {
    const persons = this.state.adults + this.state.children;
    this.setState({persons: persons});
  }

  incrRoomsCount = () => {
    if(this.state.rooms<5) {
      const persons = this.state.persons;
      const latestRoomsCount = Math.ceil((persons+1)/4);
      this.setState({rooms: latestRoomsCount});
    }
  }

  incrChildAdult = (name, count) => {
    const persons = this.state.persons;
    if(this.state.rooms < 5 || persons < 20) {
      this.setState({[name]: count + 1}, () => {
        if(persons%4 === 0) {
          this.incrRoomsCount();
        }
      });
    }
  }

  decrRoomsCount = () => {
    if(this.state.rooms>1) {
      const persons = this.state.persons;
      const latestRoomsCount = Math.ceil((persons-1)/4);
      this.setState({rooms: latestRoomsCount});
    }
  }

  decrChildAdult = (name, count) => {
    const persons = this.state.persons;
    if(this.state.rooms > 1 || persons > 1) {
      this.setState({[name]: count - 1}, () => {
        if((persons-1)%4 === 0) {
          this.decrRoomsCount();
        }
      });
    }
  }

  render() {
    return (
      <div className="App">
        <i className="fa fa-users" aria-hidden="true"></i>
        <label className="choose-txt">Choose number of <b>people</b></label>
        <div className="operation-block">
            <div className="sub-operation-block">
                <i className="fa fa-bed" aria-hidden="true"></i>
                <label className="operation-labels">ROOMS</label>
                <div className="rfloat">
                    <i className={`fa fa-minus-circle ${this.state.rooms > 1 ? 'pointer': ''}`}
                    aria-hidden="true" 
                    onClick={this.roomsDecrement}></i>
                    {this.state.rooms}
                    <i className={`fa fa-plus-circle red ${this.state.rooms < 5 ? 'pointer': ''}`}
                    aria-hidden="true" 
                    onClick={this.roomsIncrement}></i>
                </div>
            </div>
            <div className="sub-operation-block">
                <i className="fa fa-user" aria-hidden="true"></i>
                <label className="adults-label operation-labels">ADULTS</label>
                <div className="rfloat">
                    <i className={`fa fa-minus-circle ${this.state.adults !== 1 ? 'pointer': ''}`} 
                      aria-hidden="true" 
                      onClick={this.adultsDecrement}></i>
                    {this.state.adults}
                    <i className={`fa fa-plus-circle red 
                    ${this.state.rooms < 5 || this.state.persons < 20 ? 'pointer': ''}`}
                    aria-hidden="true" 
                    onClick={this.adultsIncrement}></i>
                </div>
            </div>
            <div className="lastsub-operation-block">
                <i className="fa fa-child" aria-hidden="true"></i>
                <label className="children-label operation-labels">CHILDREN</label>
                <div className="rfloat">
                    <i className= {`fa fa-minus-circle ${this.state.children !== 0 ? 'pointer': ''}`} 
                    aria-hidden="true" 
                    onClick={this.childrenDecrement}></i>
                    {this.state.children}
                    <i className={`fa fa-plus-circle red 
                    ${this.state.rooms < 5 || this.state.persons < 20 ? 'pointer': ''}`}
                    aria-hidden="true"
                     onClick={this.childrenIncrement}></i>
                </div>
            </div>
        </div>
      </div>
    );
  }
}

export default App;
