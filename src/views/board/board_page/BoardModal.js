import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import Slide from "@material-ui/core/Slide";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Close from "@material-ui/icons/Close";
import React from "react";
import styles from "../../../assets/jss/material-kit-react/views/componentsSections/javascriptStyles";
import Button from "../../../components/CustomButtons/Button";
// core components
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import AddTask from "./tasks/AddTask";
import Tasks from "./tasks/Tasks";
// react plugin for creating date-time-picker

const useStyles = makeStyles(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";

export default function BoardModal(props) {
  const classes = useStyles();
  const { modalCard } = props;

  let salary;
  if (modalCard.salary) {
    salary = modalCard.salary;
  } else {
    salary = "Unknown";
  }

  let datePosted;
  if (modalCard.post_date) {
    datePosted = modalCard.post_date;
  } else {
    datePosted = "Unknown";
  }

  let category;
  if (modalCard.category) {
    category = modalCard.category;
  } else {
    category = "Unknown";
  }

  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6} lg={4}>
                <Dialog
                  classes={{
                    root: classes.center,
                    paper: classes.modal,
                  }}
                  open={props.modalIsOpen}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={props.closeModal}
                  aria-labelledby="classic-modal-slide-title"
                  aria-describedby="classic-modal-slide-description"
                  maxWidth="false"
                >
                  <DialogTitle
                    id="classic-modal-slide-title"
                    disableTypography
                    className={props.closeModal}
                  >
                    <IconButton
                      className={classes.modalCloseButton}
                      key="close"
                      aria-label="Close"
                      color="inherit"
                      onClick={props.closeModal}
                    >
                      <Close className={classes.modalClose} />
                    </IconButton>
                    <h2 className={classes.modalTitle}>{modalCard.title}</h2>
                    <h5>{modalCard.label}</h5>
                    <Button
                      onClick={props.seeJob.bind(this, modalCard.url)}
                      color="primary"
                    >
                      Job Post
                    </Button>
                  </DialogTitle>
                  <DialogContent
                    dividers
                    id="classic-modal-slide-description"
                    className={classes.modalBody}
                  >
                    <h5>Description</h5>
                    <p>{modalCard.description}</p>

                    <h5>Salary</h5>
                    <p>{salary}</p>
                    <h5>Category</h5>
                    <p>{category}</p>
                    <h5>Date Posted</h5>
                    <p>{datePosted}</p>
                    <h5>Tasks:</h5>

                    <AddTask
                      cardId={modalCard.id}
                      laneId={modalCard.laneId}
                      addTask={props.addTask}
                    />
                    <Tasks
                      tasks={modalCard.Tasks}
                      markComplete={props.markComplete}
                      modalCard={modalCard}
                      delTask={props.delTask}
                    />
                  </DialogContent>
                  <DialogActions className={classes.modalFooter}>
                    <Button onClick={props.closeModal} color="danger" simple>
                      Close
                    </Button>
                  </DialogActions>
                </Dialog>
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
