/* eslint-disable radix */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
//* *For Parsing and working with API Data**

// todo: parse all lanes, not just 4
// parse the data for getting one board, converts to cards for the board
export function JobsToCards(response, data) {
  this.obj = response.data;
  this.vals = Object.values(this.obj);

  // fill category titles
  data.lanes[0].title = this.vals[3][0].title;
  data.lanes[1].title = this.vals[3][1].title;
  data.lanes[2].title = this.vals[3][2].title;
  data.lanes[3].title = this.vals[3][3].title;

  data.lanes[0].cards = [];
  data.lanes[1].cards = [];
  data.lanes[2].cards = [];
  data.lanes[3].cards = [];

  for (let x = 0; x < data.lanes.length; x++) {
    const jobArr = this.vals[3][x].Jobs;
    for (let i = 0; i < jobArr.length; i++) {
      const currJob = jobArr[i];
      var tasks;
      if (currJob.JobDetails.Tasks == null) {
        tasks = [];
      } else tasks = currJob.JobDetails.Tasks;

      data.lanes[x].cards.push({
        laneId: x.toString(),
        id: currJob.id,
        title: currJob.JobDetails.company,
        label: currJob.JobDetails.title,
        cardStyle: {
          width: 270,
          maxWidth: 270,
          margin: "auto",
          marginBottom: 5,
        },
        description: currJob.JobDetails.description,
        location: currJob.JobDetails.location,
        category: currJob.JobDetails.category,
        post_date: currJob.JobDetails.post_date,
        experience: currJob.JobDetails.experience,
        url: currJob.JobDetails.url,
        date_added: currJob.JobDetails.date_added,
        salary: currJob.JobDetails.salary,
        Tasks: tasks,
      });

      data.lanes[x].Jobs = [];
    }
  }
}

// convert cards to Jobs to then be pushed to db
export function CardsToJobs(data) {
  // empty payload jobs
  for (let i = 0; i < data.length; i++) {
    data[i].Jobs = [];
  }

  // put new data into payload
  const d = String(new Date());
  for (let k = 0; k < data.length; k++) {
    for (let j = 0; j < data[k].cards.length; j++) {
      if (data[parseInt(k)].cards[j]) {
        if (!("date_added" in data[parseInt(k)].cards[j])) {
          data[parseInt(k)].cards[j].date_added = d; // if card has no date, give it current date
        }
      }

      const currCard = data[k].cards[j];

      var tasks = [];
      if (currCard.Tasks == null) {
        data[k].cards[j].Tasks = tasks;
      } else tasks = currCard.Tasks;

      const addToPayload = {
        id: currCard.id,
        JobDetails: {
          company: currCard.title,
          title: currCard.label,
          description: currCard.description,
          date_added: currCard.date_added,
          location: currCard.location,
          category: currCard.category,
          experience: currCard.experience,
          url: currCard.url,
          salary: currCard.salary,
          Tasks: tasks,
        },
      };
      data[parseInt(k)].Jobs.push(addToPayload);
    }
  }
}
