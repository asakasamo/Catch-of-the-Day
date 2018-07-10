import React from "react";
import PropTypes from "prop-types";
import { getFunName } from "../helpers";
import base from "../base";

class StorePicker extends React.Component {
   selectStoreRef = React.createRef();
   inputStoreRef = React.createRef();

   state = {
      storeIds: null
   };

   static propTypes = {
      history: PropTypes.object
   };

   /**
    * Binds to the store names in the database on mount
    */
   componentDidMount() {
      this.ref = base.syncState("/", {
         context: this,
         state: "storeIds"
      });
   }

   /**
    * Goes to the selected store based on which submit button was clicked
    */
   goToStore = (event, inputRef) => {
      //Stop the form from submitting
      event.preventDefault();

      //get the text from the input
      const storeName = inputRef.current.value;

      //change the page to /store/storeName
      if (storeName) this.props.history.push(`/store/${storeName}`);
   };

   /**
    * Generates a random store ID and puts it in the input box
    */
   insertRandomStoreId = (event) => {
      event.preventDefault();
      this.inputStoreRef.current.value = getFunName();
   };

   /**
    * Returns a list of <option>s for the existing stores select box
    */
   getStoreOptions = () => {
      if (!this.state.storeIds) {
         return (
            <option value="" disabled hidden>
               ---
            </option>
         );
      }

      let options = [];
      for (let id in this.state.storeIds) {
         options.push(
            <option value={id} key={id}>
               {id}
            </option>
         );
      }

      return options;
   };

   render() {
      return (
         <React.Fragment>
            <form
               className="store-selector"
               onSubmit={(event) => {
                  this.goToStore(event, this.inputStoreRef);
               }}
            >
               <h2>Enter a store ID</h2>
               <input
                  ref={this.inputStoreRef}
                  type="text"
                  required
                  placeholder="store id"
               />

               <div className="store-selector-buttons">
                  <button onClick={this.insertRandomStoreId}>Random ID</button>
                  <button type="submit" className="confirm">
                     Visit Store
                  </button>
               </div>
            </form>

            <form
               className="store-selector existing"
               onSubmit={(event) => {
                  this.goToStore(event, this.selectStoreRef);
               }}
            >
               <h2>Select an exiting store</h2>
               <div className="existing-stores">
                  <select
                     name="selectStore"
                     id="selectStore"
                     className="select-store"
                     ref={this.selectStoreRef}
                     defaultValue=""
                  >
                     {this.getStoreOptions()}
                  </select>
                  <button type="submit" className="confirm">
                     Visit Store
                  </button>
               </div>
            </form>
         </React.Fragment>
      );
   }
}

export default StorePicker;
