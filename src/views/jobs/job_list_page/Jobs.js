import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Job from "./Job";
import "./Jobs.css";
import JobsPagination from "./JobsPagination";
import SearchForm from "./SearchForm";
import useFetchJobs from "./useFetchJobs";

function Jobs({
  addJob,
  modalData,
  options,
  _onSelect,
  defaultOption,
  toggleClassName,
  togglePlaholderClassName,
  toggleMenuClassName,
}) {
  const [params, setParams] = useState({});
  const [page, setPage] = useState(1);
  let {
    jobs,
    loading,
    error,
    hasNextPage,
    totalJobs,
    companies,
    categories,
  } = useFetchJobs(params, page);
  // console.log("error: " + error);
  // console.log(totalJobs);
  // console.log(companies);
  if (jobs) {
    if (jobs[0] != null) {
      // console.log(Object.keys(jobs[0])[0]);
    }
  } else {
    jobs = [];
  }

  function handleParamChange(e) {
    const param = e.target.name;
    const value = e.target.value;
    // console.log(param);
    // console.log(value);
    setPage(1);
    setParams((prevParams) => {
      // console.log("prevParams:");
      // console.log(prevParams);
      return { ...prevParams, [param]: value };
    });
  }

  return (
    <Container className="my-4">
      <h3 className="mb-4">Jobs</h3>
      <SearchForm
        params={params}
        onParamChange={handleParamChange}
        companies={companies}
        categories={categories}
      />
      <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
      {loading && <h1>Loading...</h1>}
      {error ? (
        <h1>
          Error. No Jobs Found. Try Refreshing or Using Different Job
          Parameters.
        </h1>
      ) : (
        <h6>{totalJobs} Job(s) Found</h6>
      )}
      {jobs.map((job) => {
        var id = Object.keys(job)[0];
        // console.log("Jobs");
        // console.log(job[id]);
        return (
          <Job
            key={id}
            job={job[id]}
            addJob={addJob}
            options={options}
            _onSelect={_onSelect}
            defaultOption={defaultOption}
            toggleClassName={toggleClassName}
            togglePlaholderClassName={togglePlaholderClassName}
            toggleMenuClassName={toggleMenuClassName}
            modalData={modalData}
          />
        );
      })}
      <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
    </Container>
  );
}

export default Jobs;
