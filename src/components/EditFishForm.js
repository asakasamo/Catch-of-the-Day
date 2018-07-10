import React from "react";
import PropTypes from "prop-types";

class EditFishForm extends React.Component {
   static propTypes = {
      fish: PropTypes.object,
      index: PropTypes.string,
      updateFish: PropTypes.func
   };

   handleChange = (event) => {
      //take a copy of the current fish
      const updatedFish = {
         ...this.props.fish,
         [event.currentTarget.name]: event.currentTarget.value
      };

      this.props.updateFish(this.props.index, updatedFish);
   };

   render() {
      return (
         <div className="fish-edit">
            <input
               type="text"
               name="name"
               value={this.props.fish.name}
               onChange={this.handleChange}
               placeholder="Name"
            />
            <input
               type="text"
               name="price"
               value={this.props.fish.price}
               onChange={this.handleChange}
               placeholder="Price"
            />

            <select
               name="status"
               value={this.props.fish.status}
               onChange={this.handleChange}
            >
               <option value="available">Available!</option>
               <option value="unavailable">Sold Out!</option>
            </select>

            <textarea
               name="desc"
               value={this.props.fish.desc}
               onChange={this.handleChange}
               placeholder="Description"
            />
            <input
               type="text"
               name="image"
               value={this.props.fish.image}
               onChange={this.handleChange}
               placeholder="Image URL"
            />
            <button
               className="warning"
               onClick={() => this.props.deleteFish(this.props.index)}
            >
               Delete Fish
            </button>
         </div>
      );
   }
}

export default EditFishForm;
