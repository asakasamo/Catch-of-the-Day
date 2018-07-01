import React from "react";

class EditFishForm extends React.Component {
   handleChange = (event) => {
      //take a copy of the crrent fish
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
            />
            <input
               type="text"
               name="price"
               value={this.props.fish.price}
               onChange={this.handleChange}
            />

            <select
               name="status"
               value={this.props.fish.status}
               onChange={this.handleChange}
            >
               <option value="available">Fresh!</option>
               <option value="unavailable">Sold Out!</option>
            </select>

            <textarea
               name="desc"
               value={this.props.fish.desc}
               onChange={this.handleChange}
            />
            <input
               type="text"
               name="image"
               value={this.props.fish.image}
               onChange={this.handleChange}
            />
            <button onClick={() => this.props.deleteFish(this.props.index)}>
               Delete Fish
            </button>
         </div>
      );
   }
}

export default EditFishForm;
