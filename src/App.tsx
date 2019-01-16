import { initializeIcons } from '@uifabric/icons';
import * as React from 'react';
import { Route, Switch } from "react-router";
import { GroceryMain } from "src/components/Product/GroceryMain";
import { Flights } from "src/components/Travel/Flights";

initializeIcons();

class App extends React.Component<any, any> {
  public render() {
    return (
      <Switch>
        <Route path="/Flights" component={Flights} />
        <Route path="/" component={GroceryMain} /> />
    </Switch>
    );
  }
}

export default App;