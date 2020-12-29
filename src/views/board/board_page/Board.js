/* eslint-disable array-callback-return */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable radix */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/sort-comp */
// React
import styled from "@emotion/styled";
import { primaryColor } from "assets/jss/material-kit-react";
import axios from "axios";
import BoardCard from "components/BoardCard/BoardCard";
import React, { Component } from "react";
// eslint-disable-next-line import/no-unresolved
import Board from "react-trello";
import "../../../App.css";
import { CardsToJobs, JobsToCards } from "./API";
import BoardModal from "./BoardModal";

const data = require("../../../components/data/data.json");

class ReactBoard extends Component {
  constructor() {
    super();

    this.state = {
      boardData: { lanes: [] },
      modalIsOpen: false,
      modalCard: {
        Tasks: [],
      },
    };
  }

  setEventBus = (eventBus) => {
    // eslint-disable-next-line react/no-unused-state
    this.setState({ eventBus });
  };

  async componentDidMount() {
    this.getBoardData();
    // todo: get boards data aswell, put in redux store
  }

  async getBoardData() {
    const ownerId = this.props.currentUser.id;
    const boardId = this.props.match.params.boardid;
    const response1 = await axios.get(
      process.env.REACT_APP_BOARDS_DOMAIN +
        `/api/boards/${boardId}/auth/${ownerId}`
    );
    // eslint-disable-next-line no-new
    new JobsToCards(response1, data);
    const parsedData = await this.resolveData();
    for (var i = 0; i < parsedData.lanes.length; i++) {
      if (!("cards" in parsedData.lanes[i])) {
        parsedData.lanes[i].cards = [];
      }
      parsedData.lanes[i].label = parsedData.lanes[i].cards.length;
    }
    parsedData.lanes[0].label = parsedData.lanes[0].cards.length + " Job(s)";
    parsedData.lanes[1].label = parsedData.lanes[1].cards.length + " Job(s)";
    parsedData.lanes[2].label = parsedData.lanes[2].cards.length + " Job(s)";
    parsedData.lanes[3].label = parsedData.lanes[3].cards.length + " Job(s)";

    this.setState({ boardData: parsedData });
  }

  seeJob = (url) => {
    this.openInNewTab(url);
  };

  openInNewTab(url) {
    const win = window.open(url, "_blank");
    win.focus();
  }

  async updateBoard(newData) {
    const ownerId = this.props.currentUser.id;
    const boardId = this.props.match.params.boardid;

    // eslint-disable-next-line no-new
    new CardsToJobs(newData.lanes);
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

    for (var i = 0; i < newData.lanes.length; i++) {
      if (!("cards" in newData.lanes[i])) {
        newData.lanes[i].cards = [];
      }
      newData.lanes[i].label = newData.lanes[i].cards.length;
    }
    newData.lanes[0].label = newData.lanes[0].cards.length + " Job(s)";
    newData.lanes[1].label = newData.lanes[1].cards.length + " Job(s)";
    newData.lanes[2].label = newData.lanes[2].cards.length + " Job(s)";
    newData.lanes[3].label = newData.lanes[3].cards.length + " Job(s)";

    this.setState({ boardData: newData });
  }

  async updateCard() {
    const ownerId = this.props.currentUser.id;
    const boardId = this.props.match.params.boardid;

    const payload = this.state.boardData.lanes;

    // eslint-disable-next-line no-new
    new CardsToJobs(payload);
    await axios
      .put(
        process.env.REACT_APP_BOARDS_DOMAIN +
          `/api/boards/${boardId}/auth/${ownerId}`,
        {
          Categories: payload,
        }
      )
      // eslint-disable-next-line no-unused-vars
      .then(function(response) {
        // console.log(payload);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  shouldReceiveNewData = (nextData) => {
    this.updateBoard(nextData);
  };

  handleCardClick = (cardId, metadata, laneId) => {
    const objs = this.state.boardData.lanes[laneId].cards;
    const card = objs.find((obj) => {
      return obj.id === cardId;
    });

    // console.log(this.state.boardData);
    this.openModal(card);
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  openModal = (card) => {
    this.setState({ modalIsOpen: true });
    this.setState({ modalCard: card });
  };

  handelCardEdit = (card, type, value) => {
    // eslint-disable-next-line radix
    const lid = parseInt(card.laneId);

    const bd = { ...this.state.boardData };
    bd.lanes[lid].cards.map((c) => {
      if (c.id === card.id) {
        if (type === "salary") {
          c[type] = parseInt(value);
        } else c[type] = value;
      }
    });

    for (var i = 0; i < bd.lanes.length; i++) {
      if (!("cards" in bd.lanes[i])) {
        bd.lanes[i].cards = [];
      }
      bd.lanes[i].label = bd.lanes[i].cards.length;
    }
    bd.lanes[0].label = bd.lanes[0].cards.length + " Job(s)";
    bd.lanes[1].label = bd.lanes[1].cards.length + " Job(s)";
    bd.lanes[2].label = bd.lanes[2].cards.length + " Job(s)";
    bd.lanes[3].label = bd.lanes[3].cards.length + " Job(s)";
    // console.log(bd);

    this.setState({ boardData: bd });
    this.updateCard();
  };

  // Task Funcs:
  // Toggle Complete
  markComplete = (id, modalCard) => {
    const bd = { ...this.state.boardData };

    // eslint-disable-next-line array-callback-return
    bd.lanes[modalCard.laneId].cards.map((c) => {
      if (c.id === modalCard.id) {
        c.Tasks.map((t) => {
          if (t.id === id) {
            t.complete = !t.complete;
          }
        });
      }
    });
    this.setState({ boardData: bd });
    this.updateCard();
  };

  // Delete Task
  delTask = (id, modalCard) => {
    const bd = { ...this.state.boardData };

    bd.lanes[modalCard.laneId].cards.map((c) => {
      if (c.id === modalCard.id) {
        for (let g = 0; g < c.Tasks.length; g++)
          if (c.Tasks[g].id && c.Tasks[g].id === id) {
            c.Tasks.splice(g, 1);
            break;
          }
      }
    });
    this.setState({ boardData: bd });
    this.updateCard();
  };

  // Add Task
  addTask = (title, laneId, cardId) => {
    const bd = { ...this.state.boardData };

    const task = {
      // eslint-disable-next-line no-use-before-define
      id: cardId + makeid(10),
      title,
    };

    function makeid(length) {
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

    bd.lanes[laneId].cards.map((c) => {
      if (c.id === cardId) {
        c.Tasks.push(task);
      }
    });
    this.setState({ boardData: bd });
    this.updateCard();
  };

  resolveData() {
    return new Promise((resolve) => {
      resolve(data);
    });
  }

  render() {
    return (
      <BoardContainer>
        <Layout>
          <Board
            style={{
              backgroundColor: primaryColor,
            }}
            editable
            data={this.state.boardData}
            cardDraggable
            components={{
              Card: BoardCard,
            }}
            onDataChange={this.shouldReceiveNewData}
            eventBusHandle={this.setEventBus}
            handleDragStart={this.handleDragStart}
            handleDragEnd={this.handleDragEnd}
            onCardClick={this.handleCardClick}
          />

          <BoardModal
            markComplete={this.markComplete}
            addTask={this.addTask}
            delTask={this.delTask}
            handelCardEdit={this.handelCardEdit}
            modalIsOpen={this.state.modalIsOpen}
            closeModal={this.closeModal}
            modalCard={this.state.modalCard}
            seeJob={this.seeJob}
          />
        </Layout>
      </BoardContainer>
    );
  }
}
const Layout = styled.div`
  overflow-x: hidden;
`;

const BoardContainer = styled.div``;

export default ReactBoard;
