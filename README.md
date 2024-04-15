## Available Scripts

In the project directory:

To start the app in dev mode:
`npm run dev`

For production mode:
`npm start`

Run the test cases (currently not implemented):
`npm run test`

## How to use it

- Go to the Adoro Cinema's site and search for your city: `https://www.adorocinema.com/programacao/`
- Choose the company/place you want to get the movies and their showtimes.
- You will be redirected to a page with a URL similar to this one: `https://www.adorocinema.com/programacao/cinema-F0332/`
- In this example, the `F0332` is the ID for that movie theater.
- Make a GET request to the `cinema/{ID}` route from this project to get the movies and their showtimes for the current day.
