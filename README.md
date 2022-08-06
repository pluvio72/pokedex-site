# Pokedex Site
Pokedex site which caches pokemon stats to compare and look through your favourite pokemon using the [pokemon api](https://pokeapi.co/docs/v2).

## Features

- Caches pokemon after fetching data from API for faster interactions
- Async fetching so user can keep interacting while it is fetching
- Uses react-bootstrap API for modular UI interfaces
- Responsive layout (thanks bootstrap)


## Getting Started
You can clone the project from command line with `git clone https://github.com/pluvio72/pokedex-site`.
Then to start the project in development mode on localhost:3000 run these commands:
```sh
npm install
npm start
```
Navigate to your server address in your preferred browser. To view in development mode.
```sh
localhost:3000
```
To build out react files into static JS for production run `npm run build` which builds files into the /build folder.

#### Libraries Used
- react-bootstrap
        - This was chosen as I am 1. familiar with bootstrap and 2. helps create modular UI that can be reused
- sass
       - Used to customize bootstrap and provide variables for more consistent styling in pokemon-esc 
- react-router-dom
        - Helped create clean routing logic between components

### Challenges
Fetching data from the pokemon API proved to be slow when fetching information about many pokemon so it would cause bad UX as there would be significant time where no data would be shown. To fix this I called requests asynchronously and displayed data as it was recieved. Next Challenge was that since retrieving the data was so slow I had to find a way to cache the data so that once retrieved it would be much faster to access again as it was already stored locally. To achieve this I used local storage in the browser in combination with react context to make the cached data globally available around the application.

### Future Ideas (if i had more time)
- Would have implemented some UI tests and e2e integration tests to check application business logic is working
- Added a more robust caching method in combination or instead of local storage as it isn't supported in all environments (safari incognito but there may be more).
- Add prop-types to more files (only added in layout) to make type checking more script between props. (Another possibility is to rewrite in TS but that is larger than using prop-types).
