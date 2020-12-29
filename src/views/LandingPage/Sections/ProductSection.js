// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { ViewWeek } from "@material-ui/icons";
import FormatListBulleted from "@material-ui/icons/FormatListBulleted";
import Work from "@material-ui/icons/Work";
import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle";
// core components
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import InfoArea from "components/InfoArea/InfoArea";
import React from "react";

const useStyles = makeStyles(styles);

export default function ProductSection() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>What do we offer?</h2>
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Organisation"
              description="Organise your job applications by priority and progress"
              icon={ViewWeek}
              iconColor="info"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Track tasks"
              description="Keep track of tasks related to your job search"
              icon={FormatListBulleted}
              iconColor="success"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Job List"
              description="Access to job postings updated daily"
              icon={Work}
              iconColor="danger"
              vertical
            />
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
