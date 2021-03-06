import React from "react";
import PropTypes from "prop-types";

class AddFishForm extends React.Component {
   nameRef = React.createRef();
   priceRef = React.createRef();
   statusRef = React.createRef();
   descRef = React.createRef();
   imageRef = React.createRef();

   static propTypes = {
      addFish: PropTypes.func
   };

   validatePriceInput = (event) => {
      const inputValue = event.currentTarget.value;
      event.currentTarget.value = parseFloat(event.currentTarget.value);

      if (!inputValue || isNaN(inputValue) || !isFinite(inputValue)) {
         event.currentTarget.value = 0;
      }
   };

   createFish = (event) => {
      //stop the form from submitting
      event.preventDefault();

      //create the fish object
      const fish = {
         name: this.nameRef.current.value,
         price: parseFloat(this.priceRef.current.value),
         status: this.statusRef.current.value,
         desc: this.descRef.current.value,
         image: this.imageRef.current.value
      };

      //add the fish object to App state
      this.props.addFish(fish);

      //refresh the form
      event.currentTarget.reset();
   };

   render() {
      return (
         <form className="fish-edit new-fish" onSubmit={this.createFish}>
            <input
               name="name"
               ref={this.nameRef}
               type="text"
               placeholder="Name"
               required
            />
            <input
               name="price"
               ref={this.priceRef}
               type="text"
               placeholder="Price"
               required
               onChange={this.validatePriceInput}
            />

            <select name="status" ref={this.statusRef}>
               <option value="available">Available!</option>
               <option value="unavailable">Sold Out!</option>
            </select>

            <textarea
               name="desc"
               ref={this.descRef}
               placeholder="Description"
               required
            />
            <input
               name="image"
               ref={this.imageRef}
               type="text"
               placeholder="Image URL"
               required
            />
            <button className="confirm" type="submit">
               + Add Fish
            </button>
         </form>
      );
   }
}

export default AddFishForm;
