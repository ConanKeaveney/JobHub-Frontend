/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names */
/* eslint-disable no-plusplus */
/* eslint-disable prefer-const */
/* eslint-disable eqeqeq */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-named-as-default */
import AddBox from "@material-ui/icons/AddBox";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import axios from "axios";
import React, { Component, forwardRef } from "react";
import { selectFilter, textFilter } from "react-bootstrap-table2-filter";
import { connect } from "react-redux";
import { fetchBoards } from "../../../redux/actions/boardsActions";
import { CardsToJobs, JobsToCards } from "../../board/board_page/API";
import Jobs from "./Jobs";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const companySelectOptions = {};
const categorySelectOptions = {};

const data = require("../../../components/data/data.json");

function headerFormatter(column, colIndex, { sortElement, filterElement }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {filterElement}
      {column.text}
      {sortElement}
    </div>
  );
}

class JobsPage extends Component {
  constructor() {
    super();

    this.state = {
      selected: { value: "none", label: "None" },
      modalData: {},
      boards: [],
      modalIsOpen: false,
      jobs: [],
      columns: [
        {
          dataField: "title",
          text: "Title",
          filter: textFilter(),
          sort: true,
          headerFormatter: headerFormatter,
          headerStyle: (column, colIndex) => {
            return {
              backgroundColor: "#1c0a29",
              color: "white",
            };
          },
        },
        {
          dataField: "category",
          text: "Category",
          filter: selectFilter({
            options: categorySelectOptions,
          }),
          sort: true,
          headerFormatter: headerFormatter,
          headerStyle: (column, colIndex) => {
            return {
              backgroundColor: "#1c0a29",
              color: "white",
            };
          },
        },
        {
          dataField: "company",
          text: "Company",
          filter: selectFilter({
            options: companySelectOptions,
          }),
          headerFormatter: headerFormatter,
          headerStyle: (column, colIndex) => {
            return {
              backgroundColor: "#1c0a29",
              color: "white",
            };
          },
        },
      ],
    };

    this._onSelect = this._onSelect.bind(this);
  }

  componentDidMount() {
    this.getBoards(); // firstly, get data
  }

  async getJobs() {
    const response = await axios.get(
      process.env.REACT_APP_SCRAPERS_DOMAIN + "/api/scrapers/postings"
    );
    // todo: format data for table
    if (response.status == 200) {
      const newData = this.reformatData(response.data.data);
      this.setState({ jobs: newData });
    }
  }

  async getBoardData(bId, jobToPush) {
    const ownerId = this.props.currentUser.id;
    const boardId = bId;
    const response1 = await axios.get(
      process.env.REACT_APP_BOARDS_DOMAIN +
        `/api/boards/${boardId}/auth/${ownerId}`
    );
    // eslint-disable-next-line no-new
    // console.log(bId);
    new JobsToCards(response1, data);
    const parsedData = await this.resolveData();
    this.pushJobToData(parsedData, jobToPush, boardId);
  }

  // todo: move out to jobs, otherwise will run whenever modal opens
  async getBoards() {
    const ownerId = this.props.currentUser.id;
    const response = await axios.get(
      process.env.REACT_APP_BOARDS_DOMAIN + `/api/boards/auth/${ownerId}`
    );
    this.setState({ boards: response.data }); // update component state
    // todo: if application state already populated, don't pull data with api
    this.foo(response.data).then();
  }

  resolveData() {
    return new Promise((resolve) => {
      resolve(data);
    });
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  handleOnClickSee = (rd) => {
    // console.log(rd);
    this.openModal(rd.original);
  };

  addJob = (data) => {
    // console.log(data);
    const { selected } = this.state;
    // eslint-disable-next-line eqeqeq
    if (selected.label == "None") {
      alert("Please pick a board");
    } else {
      this.addJobFromJobPage(data, selected);
      this.openInNewTab(data.url);
    }
  };

  seeJob = (url) => {
    this.openInNewTab(url);
  };

  openModal = (data) => {
    this.setState({ modalIsOpen: true });
    this.setState({ modalData: data });
  };

  async foo(data) {
    this.props.fetchBoards(data); // update application state
  }

  // eslint-disable-next-line class-methods-use-this
  pushJobToData(dataToBeUpdated, job, boardId) {
    let dtbU = dataToBeUpdated;

    new CardsToJobs(dtbU.lanes);
    job.id = makeId(15);
    const jobToPush = {
      id: job.id,
      JobDetails: {
        company: job.company,
        title: job.title,
        description: job.description,
        date_added: "todo",
        location: job.location,
        category: job.category,
        experience: job.experience,
        url: job.url,
        salary: 0,
        Tasks: [],
      },
    };

    dtbU.lanes[0].Jobs.push(jobToPush);
    this.updateBoard(dtbU, boardId);
    function makeId(length) {
      let result = "";
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    }
  }

  openInNewTab(url) {
    let win = window.open(url, "_blank");
    win.focus();
  }

  addJobFromJobPage(modaljob, selected) {
    // console.log(selected);
    this.getBoardData(selected, modaljob);
  }

  reformatData(data) {
    let myArray = [];
    let unsortedCategorySelectOptions = {};
    let unsortedCompanySelectOptions = {};
    Object.keys(data).forEach(function(company) {
      let jobs = data[company];
      for (let i = 0; i < jobs.length; i++) {
        if (!(company in unsortedCompanySelectOptions)) {
          unsortedCompanySelectOptions[company] = company;
        }
        if (!(jobs[i].category in unsortedCategorySelectOptions)) {
          unsortedCategorySelectOptions[jobs[i].category] = jobs[i].category;
        }
        jobs[i].company = company;
        myArray.push(jobs[i]);
      }
    });
    Object.keys(unsortedCategorySelectOptions)
      .sort()
      .forEach(function(key) {
        categorySelectOptions[key] = unsortedCategorySelectOptions[key];
      });

    Object.keys(unsortedCompanySelectOptions)
      .sort()
      .forEach(function(key) {
        companySelectOptions[key] = unsortedCompanySelectOptions[key];
      });
    return myArray;
  }

  _onSelect(option) {
    // console.log("_onSelect");
    // console.log(option.target);
    this.setState({ selected: option.target.value });
  }

  async updateBoard(newData, bId) {
    const ownerId = this.props.currentUser.id;
    const boardId = bId;

    // eslint-disable-next-line no-new
    await axios
      .put(
        process.env.REACT_APP_BOARDS_DOMAIN +
          `/api/boards/${boardId}/auth/${ownerId}`,
        {
          Categories: newData.lanes,
        }
      )
      // eslint-disable-next-line no-unused-vars
      .then(function(response) {
        // console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  // insert list of boards into dropdown in modal
  // eslint-disable-next-line class-methods-use-this
  insertOptions(boardData) {
    let index;
    let options = [];
    let toPush = {};
    if (boardData) {
      for (index = 0; index < boardData.length; index++) {
        toPush = {
          value: boardData[index].id,
          label: boardData[index].title,
        };
        options.push(toPush);
      }
    }
    return options;
  }

  render() {
    if (this.state.boards == null) this.state.boards = [];
    const { columns, jobs } = this.state;
    const options = this.insertOptions(this.state.boards);
    const defaultOption = this.state.selected;
    const {
      toggleClassName,
      togglePlaholderClassName,
      toggleMenuClassName,
    } = this.state;

    const rowEvents = {
      onClick: (e, row, rowIndex) => {
        this.openModal(row);
      },
    };

    return (
      <Jobs
        addJob={this.addJob}
        seeJob={this.seeJob}
        modalData={this.state.modalData}
        options={options}
        _onSelect={this._onSelect}
        defaultOption={defaultOption}
        toggleClassName={toggleClassName}
        togglePlaholderClassName={togglePlaholderClassName}
        toggleMenuClassName={toggleMenuClassName}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  boards: state.boards.items,
});

export default connect(mapStateToProps, { fetchBoards })(JobsPage);
