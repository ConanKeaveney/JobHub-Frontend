/*eslint-disable*/
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import { LockOpen } from "@material-ui/icons";
import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";
import loginStyle from "assets/jss/material-kit-react/views/componentsSections/loginStyle.js";
// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import React from "react";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
import { useStitchAuth } from "../login/StitchAuth";

const useStyles = makeStyles(styles);
const useLoginStyles = makeStyles(loginStyle);

export default function HeaderLinks(props) {
  const classes = useStyles();
  const classesStyle = useLoginStyles();
  const { actions } = useStitchAuth();
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          buttonText="Login"
          buttonProps={{
            className: classes.navLink,
            color: "transparent",
          }}
          buttonIcon={LockOpen}
          dropdownList={[
            <Link
              to=""
              provider="google"
              onClick={() => actions.handleLogin("google")}
              className={classes.dropdownLinkGoogle}
            >
              Google
              <i className={classes.socialIcons + " fab fa-google-plus-g"} />
            </Link>,
            // <a
            //   to=""
            //   provider="anonymous"
            //   onClick={() => actions.handleLogin("anonymous")}
            //   className={classes.dropdownLink}
            // >
            //   Guest
            // </a>
          ]}
        />
      </ListItem>
      {/* Todo: Add Social Media Links */}

      {/* <ListItem className={classes.listItem}> */}
      {/*<Tooltip title="Delete">
          <IconButton aria-label="Delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>*/}
      {/* <Tooltip
          id="instagram-twitter"
          title="Follow us on twitter"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            href="https://twitter.com/CreativeTim?ref=creativetim"
            target="_blank"
            color="transparent"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-twitter"} />
          </Button>
        </Tooltip>
      </ListItem> */}
      {/* <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-facebook"
          title="Follow us on facebook"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="https://www.facebook.com/CreativeTim?ref=creativetim"
            target="_blank"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-facebook"} />
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-tooltip"
          title="Follow us on instagram"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="https://www.instagram.com/CreativeTimOfficial?ref=creativetim"
            target="_blank"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-instagram"} />
          </Button>
        </Tooltip>
      </ListItem> */}
    </List>
  );
}
