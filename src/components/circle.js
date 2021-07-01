import React from "react";
import "../index.css";

export default function Circle(props) {
  return (
    <button
      className={"circle"}
      onClick={props.onClick}
      style={props.style}
      key={props.keyVal}
    ></button>
  );
}
