import React, { Component } from 'react';
import Chat from "./components/Chat";
import Login from "./components/Login";
class App extends Component {
  render() {
    return (
      <div>
          <Login/>
          <Chat/>
      </div>
    );
  }
}
 
export default App;
