import React from "react";
//import { Rect } from "react-konva";
//import { SEAT_SIZE } from "./layout";

function getColor(isBooked, isSelected) {
  if (isSelected) {
    return "#2ed658"; //selected seat
  } else if (isBooked) {
    return "#929c99"; //booked seat
  } else {
    return "#43d8a6"; //available seat
  }
}

const Seat = props => {
  const isBooked = props.data.status === "booked";

  return (
    <Rect
      x={props.x}
      y={props.y}
      cornerRadius={SEAT_SIZE / 2}
      fill={getColor(isBooked, props.isSelected)}
      strokeWidth={1}
      onMouseEnter={e => {
        e.target._clearCache();
        props.onHover(props.data.name, e.target.getAbsolutePosition());
        const container = e.target.getStage().container();
        if (isBooked) {
          container.style.cursor = "not-allowed";
        } else {
          container.style.cursor = "pointer";
        }
      }}
      onMouseLeave={e => {
        props.onHover(null);
        const container = e.target.getStage().container();
        container.style.cursor = "";
      }}
      onClick={e => {
        if (isBooked) {
          return;
        }
        if (props.isSelected) {
          props.onDeselect(props.data.name);
        } else {
          props.onSelect(props.data.name);
        }
      }}
      onTap={e => {
        if (isBooked) {
          return;
        }
        if (props.isSelected) {
          props.onDeselect(props.data.name);
        } else {
          props.onSelect(props.data.name);
        }
      }}
    />
  );
};

export default Seat;
