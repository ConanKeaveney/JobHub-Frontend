import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import Slide from "@material-ui/core/Slide";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Close from "@material-ui/icons/Close";
import styles from "assets/jss/material-kit-react/views/componentsSections/javascriptStyles";
import Button from "components/CustomButtons/Button";
import React from "react";
import Dropdown from "react-dropdown";

// react plugin for creating date-time-picker

const useStyles = makeStyles(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";

export default function JobModal(props) {
  const classes = useStyles();
  const { modalData } = props;
  let salary;
  if (modalData.salary) {
    salary = "€" + modalData.salary;
  } else {
    salary = "Unknown";
  }

  let datePosted;
  if (modalData.post_date) {
    datePosted = modalData.post_date;
  } else {
    datePosted = "Unknown";
  }

  return (
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
        <h3 className={classes.modalTitle}>{modalData.company}</h3>
        <h6>{modalData.title}</h6>
        <Button
          onClick={props.seeJob.bind(this, modalData.url)}
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
        <p>{modalData.description}</p>
      </DialogContent>
      <DialogContent
        dividers
        id="classic-modal-slide-description"
        className={classes.modalBody}
      >
        <h5>Salary</h5>
        <p>{salary}</p>
        <h5>Category</h5>
        <p>{modalData.category}</p>
        <h5>Date Posted</h5>
        <p>{datePosted}</p>
      </DialogContent>
      <DialogActions className={classes.modalFooter}>
        <Dropdown
          options={props.options}
          onChange={props._onSelect}
          value="Pick a Board"
          placeholder="Select an option"
          className={props.toggleClassName ? "my-custom-class" : ""}
          placeholderClassName={
            props.togglePlaholderClassName ? "my-custom-class" : ""
          }
          menuClassName={props.toggleMenuClassName ? "my-custom-class" : ""}
        />
        <Button
          onClick={props.addJob.bind(this, modalData)}
          color="primary"
          simple
        >
          Apply
        </Button>
        <Button onClick={props.closeModal} color="danger" simple>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
