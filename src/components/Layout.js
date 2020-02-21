import React from "react";

const Layout = ({ children }) => (
  <div>
    <div className="py2 border-bottom border-color--navy h1 text-white">
      <div className="content-container"><img src={'/logo.svg'} alt="Logo"/></div>
    </div>
    <div className="content-container">{children}</div>

    <div className="py4 bg-dark-blue text-white">
      <div className="content-container">Swift Inc. 2020</div>
    </div>
  </div>
);

export default Layout;
