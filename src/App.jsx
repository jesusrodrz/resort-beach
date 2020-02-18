import React from 'react';
import { hot } from 'react-hot-loader';
import Home from 'pages/Home';
import SingleRoom from 'pages/SingleRoom';
import Rooms from 'pages/Rooms';
import Error from 'pages/Error';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Navbar from 'components/Navbar';
import 'App.css';
import { RoomContextProvider } from 'context';
import Test from 'pages/Test';

const App = () => {
  return (
    <RoomContextProvider>
      <Router>
        <>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/test" component={Test} />
            <Route exact path="/rooms/" component={Rooms} />
            <Route exact path="/rooms/:slug" component={SingleRoom} />
            <Route component={Error} />
          </Switch>
        </>
      </Router>
    </RoomContextProvider>
  );
};

export default hot(module)(App);
