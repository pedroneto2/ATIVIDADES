import React from "react";

export default (props) => {
  return props.hide ? null : props.children;
};
