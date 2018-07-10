import React from "react";
import PropTypes from "prop-types";

const Login = (props) => (
   <nav className="login">
      <h2>Inventory</h2>
      <p>Log in to manage this store's inventory.</p>
      <button className="github" onClick={() => props.authenticate("Github")}>
         Log in with Github
      </button>
      <button
         className="facebook"
         onClick={() => props.authenticate("Facebook")}
      >
         Log in with Facebook
      </button>
      <button className="twitter" onClick={() => props.authenticate("Twitter")}>
         Log in with Twitter
      </button>
      <button className="anonymous" onClick={props.authenticateAnon}>
         Log in Anonymously
      </button>
   </nav>
);

Login.propTypes = {
   authenticate: PropTypes.func.isRequired,
   authenticateAnon: PropTypes.func.isRequired
};

export default Login;
