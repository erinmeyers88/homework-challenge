This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

Install the packages:
`npm install`

Run the development server:
`npm run dev`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Purpose

This app has a single route that displays a map view (placeholder only for now) and a list of map cards. The app's main purpose is to allow a user to select one or more sets of data to display on the map. The sets of data are represented by a list of cards which can be filtered.

## State Management

I chose to use local React state instead of Redux due to the app's simplicity. The parent component `page.tsx` contains only the minimal state needed by both if its child components (`map.tsx` and `list.tsx`). The rest of the state lives in the `list.tsx` component, in order to avoid unncessary re-rendering of the map. The card and filter components are stateless.

## UI/UX

The design is responsive, enabled by Chakra UI breakpoints. It renders the map and list side by side on large screens, while on mobile screen there is a view switcher button at the bottom that toggles between the two views.

The card list handles a variety of states, including showing a loader while data is loading, an error message if an error occurs, and an empty message if there are no map cards.

Rather than rendering the data source filter directly next to the search input, I designed a filter popup that can accomodate a list of filters. I also included an indicator for the number of filters applied. This allows the filtering solution to scale if the dataset or filtering requirements grow more complex.

## Testing

Testing is included for the filtering functionality and can be run using `npm run test`.

## Use of AI

I was advised to limit AI usage for this assignment. The code here is mine aside from anything that was generated via command line or that I copied as part of library setup (such as Next js boilerplate, Chakra UI setup, etc.) I used AI only for debugging and searching Chakra UI documentation, but not for code generation. I have thoughts on how spec-driven AI development could have aided this project, but I chose not to use it as I did not want to violate the rules of the assignment.
