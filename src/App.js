import React from "react";
import { Route, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import User from "./components/User";
import Singer from "./components/Singer";
import Album from "./components/Album";
import Upload from "./components/Upload";
import LinearProgress from '@material-ui/core/LinearProgress';

function App() {
  return (
    <Navigation>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/user" component={User} />
        <Route exact path="/singer" component={Singer} />
        <Route exact path="/album" component={Album}/>
        <Route exact path="/upload" component={Upload}/>
      </Switch>
    </Navigation>
  );
}

export default App;
