import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./App";
import StorePicker from "./StorePicker";
import NotFound from "./NotFound";

const Router = () => (
   <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
         <Route exact path="/" component={StorePicker} />
         <Route path="/store/:storeId" component={App} />
         <Route component={NotFound} />
      </Switch>
   </BrowserRouter>
);

export default Router;
