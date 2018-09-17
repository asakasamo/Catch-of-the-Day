import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import App from "./App";
import StorePicker from "./StorePicker";
import NotFound from "./NotFound";

const Router = () => (
   <HashRouter>
      <Switch>
         <Route exact path="/" component={StorePicker} />
         <Route path="/store/:storeId" component={App} />
         <Route component={NotFound} />
      </Switch>
   </HashRouter>
);

export default Router;
