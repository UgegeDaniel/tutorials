import React from "react";
import "./App.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    //you can initialize the following state object outside the constructor without the this keyword
    //you only need to pass in props if you want to use this.props
    this.state = {
      goOut: false,
      data: "",
      number: 1,
    };
    //if you have an event handler function that uses this.setState you either use an arrow function or bind the function like in below
    this.toggleGoOut = this.toggleGoOut.bind(this);
  }
  fetchCharacter = (id) => {
    const url = `https://swapi.dev/api/people/${id}`;
    console.log(url);
    fetch(url)
      .then((response) => response.json())
      .then((data) =>
        this.setState((prevState) => {
          return {
            data,
          };
        })
      );
  };
  componentDidMount() {
    //this method will run only when the component first mounts
    // setInterval(this.toggleGoOut, 2000);
    this.fetchCharacter(this.state.number);
  }

  componentDidUpdate(prevProps, prevState) {
    //this method will run only when the state is updated
    //A little caveats with using this method is to ensure that we check whether the state has changed to avoid unnecessary rerendering
    if (prevState.number !== this.state.number) {
      // setInterval(this.toggleGoOut, 2000);
      this.fetchCharacter(this.state.number);
    }
  }

  componentWillUnmount() {
    clearInterval(this.toggleGoOut);
  }

  toggleGoOut = () => {
    //if you are using setState, you have to use an arrow function
    //if you state is an object, you don't have to worry about spreading the old object
    this.setState((prevState) => {
      return {
        goOut: !prevState.goOut,
      };
    });
  };
  nextCharacter = () => {
    //if you are using setState, you have to use an arrow function
    //if you state is an object, you don't have to worry about spreading the old object
    this.setState((prevState) => {
      return {
        number: prevState.number + 1,
      };
    });
  };
  prevCharacter = () => {
    //if you are using setState, you have to use an arrow function
    //if you state is an object, you don't have to worry about spreading the old object
    this.setState((prevState) => {
      return {
        number: prevState.number > 1 ? prevState.number - 1 : 1,
      };
    });
  };
  render() {
    //this method will be called everytime the state or props of this component changes
    //this can happen in component did mount
    return (
      <div className="App">
        <header className="App-header">
          {this.props.type} Class Components
          {this.state.goOut ? " goOut" : " goIn"}
          {this.state.number}
          <button onClick={this.toggleGoOut}>Toggle Go Out</button>
          <button onClick={this.nextCharacter}>Next Character</button>
          <button onClick={this.prevCharacter}>Previous Character</button>
          <p>{this.state.data.name ? this.state.data.name : "Loading ..."}</p>
        </header>
      </div>
    );
  }
}
