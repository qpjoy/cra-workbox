import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import "./index.scss";

const LayoutBox = (props: any) => {
  const { history } = props;

  useEffect(() => {}, []);

  return <div className="LayoutBox">{props.children}</div>;
};

export default withRouter(LayoutBox);
