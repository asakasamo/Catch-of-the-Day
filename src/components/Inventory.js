import React from "react";
import PropTypes from "prop-types";
import firebase from "firebase";
import base, { firebaseApp } from "../base";

import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";
import Login from "./Login";

class Inventory extends React.Component {
   static propTypes = {
      storeId: PropTypes.string,
      fishes: PropTypes.object,
      updateFish: PropTypes.func,
      deleteFish: PropTypes.func,
      loadSampleFishes: PropTypes.func,
      isDemo: PropTypes.bool
   };

   state = {
      uid: null,
      owner: null
   };

   componentDidMount() {
      if (this.props.isDemo) {
         this.authenticateAnon();
      } else {
         //when the page is loaded, firebase checks if the user is logged in
         firebase.auth().onAuthStateChanged((user) => {
            if (user) {
               this.authHandler({ user });
            }
         });
      }
   }

   componentWillUnmount() {
      if (this.state.isDemo) {
         this.logout();
      }
   }

   authenticate = (provider) => {
      const authProvider = new firebase.auth[`${provider}AuthProvider`]();
      firebaseApp
         .auth()
         .signInWithPopup(authProvider)
         .then(this.authHandler)
         .catch((error) => console.log(error));
   };

   authenticateAnon = () => {
      //check if it's the demo store
      firebaseApp
         .auth()
         .signInAnonymously()
         .catch(function(error) {
            console.log(error.message);
         });
   };

   authHandler = async (authData) => {
      //1. look up the current store in the firebase database
      const store = await base.fetch(this.props.storeId, { context: this });
      //2. claim it if there is no owner
      if (!store.owner) {
         //save it as our own
         await base.post(`${this.props.storeId}/owner`, {
            data: authData.user.uid
         });
      }
      //3. set the state of the inventory component to reflect the current user
      this.setState({
         uid: authData.user.uid,
         owner: store.owner || authData.user.uid
      });
   };

   logout = async () => {
      console.log("Logging out");
      await firebase.auth().signOut();
      this.setState({ uid: null });
   };

   render() {
      //Don't show the logout button for the demo
      const logout = (
         <button className="logout warning" onClick={this.logout}>
            Log out
         </button>
      );

      //1. check if the user is logged in
      if (!this.state.uid) {
         return <Login authenticate={this.authenticate} />;
      }

      //2. check if they are not the owner of the store
      if (this.state.uid !== this.state.owner) {
         return (
            <div>
               <p>Sorry, you are not the owner of this store.</p>
               {logout}
            </div>
         );
      }

      //3. They are the owner, so render the inventory
      return (
         <div className="inventory">
            <div className="inventory-header">
               <h2>Inventory</h2>
               {logout}
            </div>

            <AddFishForm addFish={this.props.addFish} />
            {Object.keys(this.props.fishes).map((key) => (
               <EditFishForm
                  key={key}
                  index={key}
                  fish={this.props.fishes[key]}
                  updateFish={this.props.updateFish}
                  deleteFish={this.props.deleteFish}
               />
            ))}
            <button className="centered" onClick={this.props.loadSampleFishes}>
               Load Sample Fishes
            </button>
         </div>
      );
   }
}

export default Inventory;
