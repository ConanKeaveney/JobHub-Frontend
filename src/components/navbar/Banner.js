/* eslint-disable react/destructuring-assignment */
import styled from "@emotion/styled";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { makeStyles } from "@material-ui/core/styles";
import { ExitToApp } from "@material-ui/icons";
import AccountCircle from "@material-ui/icons/AccountCircle";
import styles from "assets/jss/material-kit-react/views/componentsSections/navbarsStyle";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Header from "components/Header/Header";
import React from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles(styles);
const BannerContainer = styled.div``;

export default function Banner(props) {
  const classes = useStyles();
  return (
    <BannerContainer>
      <Header
        brand="Jobser"
        color="primary"
        rightLinks={
          <List className={classes.list}>
            <ListItem className={classes.listItem}>
              <CustomDropdown
                noLiPadding
                buttonText="Profile"
                buttonProps={{
                  className: classes.navLink,
                  color: "transparent",
                }}
                buttonIcon={AccountCircle}
                dropdownList={[
                  <Link
                    className={classes.dropdownLink}
                    onClick={props.handleLogout}
                  >
                    <ExitToApp className={classes.icons} /> Logout
                  </Link>,
                ]}
              />
            </ListItem>
          </List>
        }
      />
    </BannerContainer>
  );
}
