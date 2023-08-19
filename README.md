## Getting Started

I have included no `.env` file in this repo. I have designed this repo not to require one as it would make the demostration difficult

- `docker compose up` with optional `-d` for detached mode
- go to `http://localhost:3000` to see the app running

## Technical Challenge
### Part 1
Create a simple REST API which stores and reports solutions from Project Euler with a nodeJS and
mongoDB backend.

Your API must implement Problem 1 and 3 from the The Problems list. Feel free to lookup solutions to
these problems and implement those; however your API should not have hardcoded solutions to these
problems.

Your API must be able to validate the received answer and store it's result.

The implementation must follow all software engineering best practices.

The main functionality this API has to support is:
- An endpoint to list all problems your API supports
- An endpoint to accept a problem solution
- You do not need to authenticate any requests
- An endpoint which can give a summary of the user's with the largest number of correct submissions for a given problem sorted by:
  - Earliest time
  - Number of attempts

For example; consider the following submissions for Problem 1;
```
Name     Submission Time     Is Correct
Jon      8am                 0
Jon      9am                 0
Jon      10am                0
Jon      11am                1
Alex     8am                 0
Alex     9am                 1
Alex     10am                1
Sam      8am                 0
Sam      9am                 0
Sam      11am                1
```

The resulting data should be sorted as:
```
Name    Earliest Correct Submission Time      Number Of Attempts
Alex    9am                                   2
Sam     11am                                  3
Jon     11am                                  4
```

### Part 2

Create a simple React UI which interacts with the above API. Authentication is not needed for your application and the primary use cases it needs to support are:
Users can submit their answers for each problem supported by the API
- Users can view a leaderboard for each problem
- Your frontend should follow all software engineering's best practices.

### Closing Words

The technical details of this task are intentionally left vague to give you freedom over the design. Document any assumptions, developer experience concerns, data access patterns, and design patterns you think are worthwhile to capture or consider. You do not need to worry about how this API could be deployed to infrastructure such as AWS; a simple express app will be fine.
