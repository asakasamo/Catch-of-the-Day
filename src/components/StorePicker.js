import React from 'react';
import { getFunName } from '../helpers'

class StorePicker extends React.Component {
   myInput = React.createRef();

   goToStore = (event) => {
      //Stop the form from submitting
      event.preventDefault();
      //get the text from the input
      const storeName = this.myInput.current.value;
      //change the page to /store/storeName
      this.props.history.push(`/store/${storeName}`);
   };

   render() {
      return (
         <form className="store-selector" onSubmit={ this.goToStore }>
            <h2>Please Enter A Store</h2>
            <input 
               ref={ this.myInput }
               type="text"
               required 
               placeholder="store name" 
               defaultValue={ getFunName() }
            />
            <button type="submit">Visit Store</button>
         </form>
      );
   }
}

export default StorePicker;