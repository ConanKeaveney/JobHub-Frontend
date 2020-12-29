/* eslint-disable react/sort-comp */
/* eslint-disable class-methods-use-this */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
/* eslint-disable no-return-assign */
/* eslint-disable no-use-before-define */
/* eslint-disable react/destructuring-assignment */
import { TablePagination } from "@material-ui/core";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
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
import Visibility from "@material-ui/icons/Visibility";
import boardsPageStyle from "assets/jss/material-kit-react/views/boardsPage";
import axios from "axios";
import MaterialTable from "material-table";
import PropTypes from "prop-types";
import React, { Component, forwardRef } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { fetchBoards } from "../../../redux/actions/boardsActions";
import "./Boards.css";

const tableIcons = {
  Add: forwardRef((props, ref) => (
    <AddBox style={{ fill: "white" }} {...props} ref={ref} />
  )),
  Check: forwardRef((props, ref) => (
    <Check style={{ fill: "white" }} {...props} ref={ref} />
  )),
  Clear: forwardRef((props, ref) => (
    <Clear style={{ fill: "white" }} {...props} ref={ref} />
  )),
  Delete: forwardRef((props, ref) => (
    <DeleteOutline style={{ fill: "white" }} {...props} ref={ref} />
  )),
  Visibility: forwardRef((props, ref) => (
    <Visibility style={{ fill: "white" }} {...props} ref={ref} />
  )),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight style={{ fill: "white" }} {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => (
    <Edit style={{ fill: "white" }} {...props} ref={ref} />
  )),
  Export: forwardRef((props, ref) => (
    <SaveAlt style={{ fill: "white" }} {...props} ref={ref} />
  )),
  Filter: forwardRef((props, ref) => (
    <FilterList style={{ fill: "white" }} {...props} ref={ref} />
  )),
  FirstPage: forwardRef((props, ref) => (
    <FirstPage style={{ fill: "white" }} {...props} ref={ref} />
  )),
  LastPage: forwardRef((props, ref) => (
    <LastPage style={{ fill: "white" }} {...props} ref={ref} />
  )),
  NextPage: forwardRef((props, ref) => (
    <ChevronRight style={{ fill: "white" }} {...props} ref={ref} />
  )),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft style={{ fill: "white" }} {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => (
    <Clear style={{ fill: "white" }} {...props} ref={ref} />
  )),
  Search: forwardRef((props, ref) => (
    <Search style={{ fill: "white" }} {...props} ref={ref} />
  )),
  SortArrow: forwardRef((props, ref) => (
    <ArrowUpward style={{ fill: "white" }} {...props} ref={ref} />
  )),
  ThirdStateCheck: forwardRef((props, ref) => (
    <Remove style={{ fill: "white" }} {...props} ref={ref} />
  )),
  ViewColumn: forwardRef((props, ref) => (
    <ViewColumn style={{ fill: "white" }} {...props} ref={ref} />
  )),
};
const theme = createMuiTheme({
  overrides: {
    MuiTableSortLabel: {
      root: {
        color: "white",
        "&:hover": {
          color: "white",
        },
        "&$active": {
          color: "white",
        },
      },
      active: {
        color: "white",
      },
    },
    MuiTableFooter: {
      root: {
        color: "white",
      },
    },
    MuiTablePagination: {
      root: {
        color: "white",
      },
    },
  },
});

const noResultsMessage = (
  <span style={{ color: "white" }}>No results were found</span>
);

const deleteText = (
  <span style={{ color: "white" }}>
    Are you sure you want to delete this board?
  </span>
);

class Boards extends Component {
  constructor() {
    super();

    this.state = {
      boards: [],
      boardField: "",
      toBoard: false,
      boardLocation: "",
      columns: [
        {
          editComponent: (props) => (
            <input
              type="text"
              value={props.value}
              onChange={(e) => this.setState({ boardField: e.target.value })}
            />
          ),
          title: <h6 className={boardsPageStyle.colHeader}>Title</h6>,
          accessor: "title",
          field: "title",
          cellStyle: { color: "white" },
          render: (rowData) => (
            <Link style={{ color: "white" }} to={`/boards/${rowData.id}`}>
              {rowData.title}
            </Link>
          ),
        },
      ],
    };
  }

  componentDidMount() {
    this.getBoards(); // firstly, get data
  }

  async getBoards() {
    const ownerId = this.props.currentUser.id;
    const response = await axios.get(
      process.env.REACT_APP_BOARDS_DOMAIN + `/api/boards/auth/${ownerId}`
    );
    this.setState({ boards: response.data }); // update component state

    // todo: if application state already populated, don't pull data with api
    this.foo(response.data).then();
  }

  async addBoard(name, currentUser) {
    const ownerId = currentUser.id;
    await axios
      .post(
        process.env.REACT_APP_BOARDS_DOMAIN + `/api/boards/auth/${ownerId}`,
        {
          title: name,
          // todo: move the category creation to backend instead
          Categories: [
            {
              id: 0,
              title: "Applied",
              Jobs: [],
            },
            {
              id: 1,
              title: "Interview",
              Jobs: [],
            },
            {
              id: 2,
              title: "Offer",
              Jobs: [],
            },
            {
              id: 3,
              title: "Rejected",
              Jobs: [],
            },
          ],
        }
      )
      .then(function() {
        // console.log(response);
      })
      .catch(function(error) {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  }

  async deleteBoard(boardid) {
    const ownerId = this.props.currentUser.id;
    await axios.delete(
      process.env.REACT_APP_BOARDS_DOMAIN +
        `/api/boards/${boardid}/auth/${ownerId}`
    );
    setTimeout(() => this.getBoards(), 200);
  }

  async foo(data) {
    this.props.fetchBoards(data); // update application state
  }

  routeChange = (e, rd) => {
    this.setState({
      toBoard: true,
      boardLocation: `boards/${rd.id}`,
    });
  };

  handleOnClickSee = (e, rd) => {
    this.routeChange(e, rd);
  };

  handleOnClickAdd = (nd) => {
    this.addBoard(nd, this.props.currentUser);
    setTimeout(() => this.getBoards(), 200);
  };

  handleOnClickDelete = (rd) => {
    this.deleteBoard(rd.id);
  };

  render() {
    if (this.state.toBoard === true) {
      return <Redirect to={this.state.boardLocation} />;
    }
    if (this.state.boards == null) this.state.boards = [];
    const { columns, boards } = this.state;

    return (
      <div style={boardsPageStyle}>
        <MuiThemeProvider theme={theme}>
          <MaterialTable
            icons={tableIcons}
            title="Boards"
            style={boardsPageStyle}
            columns={columns}
            data={boards}
            options={{
              actionsColumnIndex: -1,
              headerStyle: {
                backgroundColor: "#1c0a29",
                color: "white",
              },
              rowStyle: {
                backgroundColor: "#1c0a29",
                color: "white",
              },
              searchFieldStyle: {
                backgroundColor: "#1c0a29",
                color: "white",
              },
              filterCellStyle: {
                backgroundColor: "#1c0a29",
                color: "white",
              },
            }}
            actions={[
              {
                icon: tableIcons.Visibility,
                tooltip: "See Board",
                onClick: (event, rowData) => {
                  this.handleOnClickSee(event, rowData);
                },
              },
            ]}
            editable={{
              onRowAdd: (newData) =>
                new Promise((resolve) => {
                  setTimeout(() => {
                    this.handleOnClickAdd(this.state.boardField);
                    resolve();
                  }, 600);
                }),

              onRowDelete: (oldData) =>
                new Promise((resolve) => {
                  setTimeout(() => {
                    this.handleOnClickDelete(oldData);
                    resolve();
                  }, 600);
                }),
            }}
            // todo: check if api has update board
            // onRowUpdate: (newData, oldData) =>
            //   new Promise(resolve => {
            //     setTimeout(() => {
            //       resolve();
            //       if (oldData) {
            //         this.setState(prevState => {
            //           const data = [...prevState.data];
            //           data[data.indexOf(oldData)] = newData;
            //           return { ...prevState, data };
            //         });
            //       }
            //     }, 600);
            //   }),
            localization={{
              body: {
                emptyDataSourceMessage: noResultsMessage,
                editRow: {
                  deleteText: deleteText,
                },
              },
            }}
            components={{
              Pagination: (props) => <TablePagination {...props} />,
            }}
          />
        </MuiThemeProvider>
      </div>
    );
  }
}

Boards.propTypes = {
  fetchBoards: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  boards: state.boards.items,
});

export default connect(mapStateToProps, { fetchBoards })(Boards);
