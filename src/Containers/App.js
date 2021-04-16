import React from "react";
import CardList from "../Components/CardList";
// import {robots} from './robots';
import SearchBox from "../Components/SearchBox";
import "./App.css";
import Scroll from "../Components/Scroll.js";
import ErrorBoundary from "../Components/ErrorBoundary";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      robots: [],
      searchField: "",
    };
  }
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        return response.json();
      })
      .then((users) => {
        this.setState({ robots: users });
      });
  }
  onSearchChange = (event) => {
    this.setState({ searchField: event.target.value });
  };
  render() {
    const filteredRobot = this.state.robots.filter((user) => {
      return user.name
        .toLowerCase()
        .includes(this.state.searchField.toLowerCase());
    });
    if (this.state.robots.length === 0) {
      return <h1> Loading...</h1>;
    } else {
      return (
        <div className="tc">
          <h1 className="f1">My Bobos</h1>
          <SearchBox searchChange={this.onSearchChange} />
          <Scroll>
            <ErrorBoundary>
              <CardList robots={filteredRobot} />
            </ErrorBoundary>
          </Scroll>
        </div>
      );
    }
  }
}

export default App;
