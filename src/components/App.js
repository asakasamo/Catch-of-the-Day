import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Inventory from "./Inventory";
import Order from "./Order";
import Fish from "./Fish";
import sampleFishes from "../sample-fishes";
import base from "../base";

class App extends React.Component {
   state = {
      fishes: {},
      order: {}
   };

   static propTypes = {
      match: PropTypes.object
   };

   componentDidMount() {
      //get props from the router
      const { params } = this.props.match;

      //first reinstate our localStorage
      const localStorageRef = localStorage.getItem(params.storeId);
      if (localStorageRef) {
         this.setState({ order: JSON.parse(localStorageRef) });
      }

      //store the reference to the database
      this.ref = base.syncState(`${params.storeId}/fishes`, {
         context: this,
         state: "fishes"
      });
   }

   componentDidUpdate() {
      localStorage.setItem(
         this.props.match.params.storeId,
         JSON.stringify(this.state.order)
      );
   }

   componentWillUnmount() {
      base.removeBinding(this.ref);
   }

   addFish = (fish) => {
      //Make a copy of the state
      const fishes = { ...this.state.fishes };
      //Add our own new fish to that fishes variable
      fishes[`fish${Date.now()}`] = fish;
      //set the new fishes object to state
      this.setState({ fishes });
   };

   updateFish = (key, updatedFish) => {
      //copy the state
      const fishes = { ...this.state.fishes };
      //update the copy
      fishes[key] = updatedFish;
      //set that to state
      this.setState({ fishes });
   };

   deleteFish = (key) => {
      //copy the state
      const fishes = { ...this.state.fishes };
      //update the state
      fishes[key] = null;
      //update state
      this.setState({ fishes });
   };

   loadSampleFishes = () => {
      this.setState({ fishes: sampleFishes });
   };

   addToOrder = (key) => {
      //take a copy of state
      const order = { ...this.state.order };
      //update the copy
      order[key] = order[key] + 1 || 1;
      //use setState to update the state
      this.setState({ order });
   };

   removeFromOrder = (key) => {
      //take a copy of state
      const order = { ...this.state.order };
      //remove that item from the order
      delete order[key];
      //use setState to update the state
      this.setState({ order });
   };

   render() {
      return (
         <div className="catch-of-the-day">
            <div className="menu">
               <Header tagline="Fresh Seafood Market" />
               <ul className="fishes">
                  {Object.keys(this.state.fishes).map((key) => (
                     <Fish
                        key={key}
                        index={key}
                        details={this.state.fishes[key]}
                        addToOrder={this.addToOrder}
                     />
                  ))}
               </ul>
            </div>
            <Order
               fishes={this.state.fishes}
               order={this.state.order}
               removeFromOrder={this.removeFromOrder}
            />
            <Inventory
               storeId={this.props.match.params.storeId}
               fishes={this.state.fishes}
               addFish={this.addFish}
               deleteFish={this.deleteFish}
               updateFish={this.updateFish}
               loadSampleFishes={this.loadSampleFishes}
            />
         </div>
      );
   }
}

export default App;
