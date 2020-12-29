import React, { useState } from "react";
import { Badge, Button, Card, Col, Collapse, Form } from "react-bootstrap";
import ReactMarkdown from "react-markdown";

export default function Job({
  job,
  addJob,
  options,
  _onSelect,
  defaultOption,
  toggleClassName,
  togglePlaholderClassName,
  toggleMenuClassName,
  modalData,
}) {
  const [open, setOpen] = useState(false);
  // console.log("Job");
  // console.log(job);
  const imgSrc = require("assets/img/companyLogos/" + job.company + ".png");
  // console.log("assets/img/companyLogos/" + job.company + ".png");
  let boardItems = [];
  boardItems.push(
    <option key="None" value="None">
      None
    </option>
  );
  if (options) {
    // console.log(options);
    for (let number = 0; number < options.length; number++) {
      var option = options[number];
      boardItems.push(
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      );
    }
  }
  return (
    <Card className="mb-3">
      <Card.Body>
        <div className="d-flex justify-content-between">
          <div>
            <Card.Title>
              {job.title} -{" "}
              <span className="text-muted font-weight-light">
                {job.company}
              </span>
            </Card.Title>
            <Card.Subtitle className="text-muted mb-2">
              {new Date(job.post_date).toLocaleDateString()}
            </Card.Subtitle>
            <Badge variant="secondary" className="mr-2">
              {job.category}
            </Badge>
            <Badge variant="secondary">{job.location}</Badge>
            <div style={{ wordBreak: "break-all" }}>
              <ReactMarkdown source={job.url} />
            </div>
          </div>
          <img
            className="d-none d-md-block"
            height="50"
            alt={job.company}
            src={imgSrc}
          />
        </div>
        <Card.Text>
          <Button
            onClick={() => setOpen((prevOpen) => !prevOpen)}
            variant="primary"
          >
            {open ? "Hide Details" : "View Details"}
          </Button>
        </Card.Text>
        <Collapse in={open}>
          <div className="mt-4">
            <ReactMarkdown source={job.description} />
            <h5>Qualifications</h5>
            <ReactMarkdown source={job.experience} />
            <h5>Apply</h5>
            <p>Pick A Board</p>
            <Form className="mb-4">
              <Form.Row className="align-items-end">
                <Form.Group as={Col}>
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    onChange={_onSelect}
                    name="board"
                    type="text"
                    as="select"
                  >
                    {boardItems}
                  </Form.Control>
                </Form.Group>
              </Form.Row>
            </Form>
            <Button onClick={() => addJob(job)} color="primary" simple>
              Apply
            </Button>
          </div>
        </Collapse>
      </Card.Body>
    </Card>
  );
}
