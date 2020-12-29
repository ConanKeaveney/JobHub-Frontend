import Background from "assets/img/dots.png";
import { primaryColor } from "assets/jss/material-kit-react";

const boardsPageStyle = {
  backgroundColor: primaryColor,
  backgroundImage: `url(${Background})`,
  backgroundSize: "contain",
  color: "white",
  fill: "white",
  colHeader: {
    color: "white",
  },
};

export default boardsPageStyle;
