/* eslint-disable no-use-before-define */
/* eslint-disable react/prefer-stateless-function */
import { makeStyles } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import { Search, ViewWeek } from "@material-ui/icons";
import styles from "assets/jss/material-kit-react/components/customTabsStyle.js";
import CardHeader from "components/Card/CardHeader.js";
import React from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles(styles);
export default function Navbar() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, value) => {
    setValue(value);
  };
  const classes = useStyles();
  return (
    <CardHeader color="secondary">
      <Tabs
        value={value}
        onChange={handleChange}
        centered="true"
        classes={{
          root: classes.tabsRoot,
          indicator: classes.displayNone,
        }}
      >
        <Tab
          classes={{
            root: classes.tabRootButton,
            label: classes.tabLabel,
            selected: classes.tabSelected,
            wrapper: classes.tabWrapper,
          }}
          value={1}
          icon={<ViewWeek />}
          component={Link}
          to="/boards"
          centered="true"
        />
        <Tab
          classes={{
            root: classes.tabRootButton,
            label: classes.tabLabel,
            selected: classes.tabSelected,
            wrapper: classes.tabWrapper,
          }}
          value={2}
          icon={<Search />}
          component={Link}
          to="/jobs"
          centered
        />
      </Tabs>
    </CardHeader>
  );
}
