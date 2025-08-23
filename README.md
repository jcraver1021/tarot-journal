# Tarot Journal

Tarot Journal is a web application for personal tarot exploration; it plays the
role of the dealer and offers space for journaling and reflection.

## Overview

### Personal Philosophy

The author of this application does not believe that tarot cards have any
magical powers or supernatural connections. Rather, I find the randomness of
drawing cards as well as the accumulated meanings associated with each card to
be a helpful tool for reflection.

For instance, drawing `Death` would not make me think I'm about to die, but it
would prompt me to think about what is ending, beginning, or changing in my
life today. Any card I draw would find something in my life to connect to, and
I welcome that directing of my attention even though it may have no ultimate
"meaning".

Therefore use of this application implies that you consent to using it under
these terms and you agree that any perceived connection to the supernatural is
something you have imported yourself and that you do not hold the author
responsible for that.

### Pages

The application hosts the following pages:

- `/`: Home page
  - `/card/:id`: Card view page
    - View the images and meanings of individual cards
    - `id`, if included, will jump to the card with that index in the deck
  - `/draw`: Card drawing methods
    - `/draw/single`: Single card draw + journal
  - `/read`: Open and view a set of journal entries

## Technical details

Tarot Journal is a [React][base-react] + [TypeScript][base-ts] application
which is tested, built, and run on [Vite][base-vite].

[base-react]: https://react.dev/
[base-ts]: https://www.typescriptlang.org/
[base-vite]: https://vite.dev/

### Prerequisites

To run, ensure you have [Node][prq-node] and [NPM][prq-npm] installed on your system.

[prq-node]: https://nodejs.org/en
[prq-npm]: https://www.npmjs.com/

### Running the application

#### Local deployment

To run in dev mode,

1. Check out the repository as follows:

   ```sh
   git clone git@github.com:jcraver1021/tarot-journal.git
   ```

1. Navigate to the directory where you checked out the repository.

1. Run the application using the `npm` script `dev` as follows:

   ```sh
   npm run dev
   ```

1. Navigate to the URL where the application is running
   (likely `http://localhost:5173`).

#### Hosted deployment

I will consider hosting the application in the future, but for now, local
deployment is the only option.

## Contribution and feedback

Do you have feedback for the application? Create an [issue][gh-issue]! I use
these for project management in this context. This is, however, a side project,
and I have a family and a full-time job that come first, so apologies in
advance if I'm slow to respond.

Are you a developer who would be interested in collaborating with me? Send a
[PR][gh-pr]! If it connects to an issue, includes a helpful description, passes
formatting and linting requirements, includes tests where appropriate, I'll
review it.

[gh-issue]: https://github.com/jcraver1021/tarot-journal/issues
[gh-pr]: https://github.com/jcraver1021/tarot-journal/pulls
