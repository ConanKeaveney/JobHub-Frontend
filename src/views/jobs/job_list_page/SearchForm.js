import React from "react";
import { Col, Form } from "react-bootstrap";

export default function SearchForm({
  params,
  onParamChange,
  companies,
  categories,
}) {
  let companyItems = [];
  let categoryItems = [];
  companyItems.push(<option value="">All</option>);
  if (companies) {
    for (let number = 0; number < companies.length; number++) {
      var company = companies[number];
      companyItems.push(<option>{company}</option>);
    }
  }

  categoryItems.push(<option value="">All</option>);
  if (categories) {
    for (let number = 0; number < categories.length; number++) {
      var category = categories[number];
      categoryItems.push(
        <option value={category.split("+")[0]}>{category}</option>
      );
    }
  }
  return (
    <Form className="mb-4">
      <Form.Row className="align-items-end">
        <Form.Group as={Col}>
          <Form.Label>Keywords</Form.Label>
          <Form.Control
            onChange={onParamChange}
            value={params.description}
            name="description"
            type="text"
          />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Company</Form.Label>
          <Form.Control
            onChange={onParamChange}
            value={params.company}
            name="company"
            type="text"
            as="select"
          >
            {companyItems}
          </Form.Control>
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Label>Category</Form.Label>
          <Form.Control
            onChange={onParamChange}
            value={params.category}
            name="category"
            type="text"
            as="select"
          >
            {categoryItems}
          </Form.Control>
        </Form.Group>
      </Form.Row>
    </Form>
  );
}
