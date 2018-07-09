import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Fish from "./Fish";

class Menu extends React.Component {
   static propTypes = {
      fishes: PropTypes.object,
      addToOrder: PropTypes.func
   };

   render() {
      return (
         <div className="menu">
            <button
               className="fold"
               onClick={() =>
                  this.props.wrapperRef.current.classList.toggle("folded")
               }
            >
               <span>d</span>
               <span>l</span>
               <span>o</span>
               <span>F</span>
            </button>

            <Header tagline="Fresh Seafood Market" />
            <ul className="fishes">
               {Object.keys(this.props.fishes).map((key) => (
                  <Fish
                     key={key}
                     index={key}
                     details={this.props.fishes[key]}
                     addToOrder={this.props.addToOrder}
                  />
               ))}
            </ul>
         </div>
      );
   }
}

export default Menu;
