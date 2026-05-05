# Map Dataset Selector

This is a Next.js application that displays a map view (currently a placeholder) alongside a list of selectable datasets. The primary goal is to allow users to filter and select one or more datasets to visualize on the map.

## Getting Started

Install dependencies:
`npm install`

Run the development server:
`npm run dev`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Architecture

### Component Structure

- page.tsx – top-level layout and shared state
- map.tsx – map view (placeholder)
- list.tsx – dataset list, filtering, and selection logic
- smaller components (cards, filters) are stateless and reusable

### State Management

I chose to use local React state instead of Redux due to the app's simplicity and limited shared state. The parent component `page.tsx` contains only the minimal state needed by both of its child components (`map.tsx` and `list.tsx`). The rest of the state lives in the `list.tsx` component, in order to avoid unnecessary re-rendering of the map. The card and filter components are stateless.

## UI/UX

The UI is responsive using Chakra UI breakpoints:

- Desktop: map and list are displayed side by side
- Mobile: a bottom-positioned toggle switches between map and list views

Key UX decisions:

- Explicit handling of loading, error, and empty states
- Popover-based filter design allows additional filters to be added without restructuring the layout.
- Visual indicator showing how many filters are applied

## Testing

Unit tests are included for the filtering logic and can be run using `npm run test`.

## Tradeoffs

- Local state vs Redux - Local is ok for now but if more components needed shared state I would change to Redux
- Popover filter vs in-line filter - The popover design requires an extra click, but will scale well if more filters are needed
- Mobile view - The mobile view requires the user to switch between the list and map views, but gives the map the full screen. If mobile use is heavy I would change the design to be more map-centric with a list popup (possibly not cards) to select data sets.

## Use of AI

I was advised to limit AI usage for this assignment. The code here is mine aside from anything that was generated via command line or that I copied as part of library setup (such as Next js boilerplate, Chakra UI setup, etc.) I used AI only for debugging and searching Chakra UI documentation, not for code generation. I have thoughts on how spec-driven AI development could have aided this project, but I chose not to use it as I did not want to violate the rules of the assignment.
