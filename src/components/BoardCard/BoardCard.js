import PropTypes from "prop-types";
import React, { Component } from "react";
import {
  CardHeader,
  CardRightContent,
  CardTitle,
  Detail,
  Footer,
  MovableCardWrapper,
} from "../styles/Base";
import DeleteButton from "../styles/DeleteButton";
import Tag from "./Tag";

class BoardCard extends Component {
  onDelete = (e) => {
    this.props.onDelete();
    e.stopPropagation();
  };

  render() {
    const {
      showDeleteButton,
      style,
      tagStyle,
      onClick,
      onDelete,
      className,
      id,
      title,
      label,
      description,
      tags,
      cardDraggable,
    } = this.props;

    return (
      <MovableCardWrapper
        data-id={id}
        onClick={onClick}
        style={style}
        className={className}
      >
        <CardHeader>
          <CardTitle draggable={cardDraggable}>{title}</CardTitle>
          <CardRightContent></CardRightContent>
          {showDeleteButton && <DeleteButton onClick={this.onDelete} />}
        </CardHeader>
        <Detail>{label}</Detail>
        {tags && tags.length > 0 && (
          <Footer>
            {tags.map((tag) => (
              <Tag key={tag.title} {...tag} tagStyle={tagStyle} />
            ))}
          </Footer>
        )}
      </MovableCardWrapper>
    );
  }
}

BoardCard.propTypes = {
  showDeleteButton: PropTypes.bool,
  onDelete: PropTypes.func,
  onClick: PropTypes.func,
  style: PropTypes.object,
  tagStyle: PropTypes.object,
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  label: PropTypes.string,
  description: PropTypes.string,
  tags: PropTypes.array,
};

BoardCard.defaultProps = {
  showDeleteButton: true,
  onDelete: () => {},
  onClick: () => {},
  style: {},
  tagStyle: {},
  title: "no title",
  description: "",
  label: "",
  tags: [],
  className: "",
};

export default BoardCard;
