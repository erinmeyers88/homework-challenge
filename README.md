This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Purpose

This app has a single route that displays a map view (placeholder only for now) and a list of map cards. The app's main purpose is to allow a user to select one or more sets of data to display on the map. The sets of data are represented by a list of cards which can be filtered.

State Management

All of the state is managed locally in the list component using useState, as it was not complex enough to require Redux. The card and filter components are stateless. I chose not to keep state at the page level to avoid causing unneeded re-rendering of the map.

UI/UX

The design is responsive, enabled by Chakra UI breakpoints, such that it renders the map and list side by side on large screens and within tabs on smaller screens.

The card list handles a variety of states, including showing a loader while data is loading, an error message if an error occurs, and an empty message if there are no map cards.

Rather than rendering the data source filter directly next to the search input, I designed a filter popup that can accomodate a list of filters and includes an indicator for the number of filters applied. This allows the filtering solution to scale if the dataset or filtering requirements grow more complex.

Testing

Testing is included for the filtering functionality and can be run using `npm run test`.

Use of AI

I was advised to limit AI usage for this assignment. The code here is mine aside from anything that was generated via command line or that I copied as part of library setup (such as Next js boilerplate, Chakra UI setup, etc.) I used AI only for debugging and searching Chakra UI documentation, but not for code generation. I have thoughts on how spec-driven AI development could have aided this project, but I chose not to use it as I did not want to violate the rules of the assignment.
