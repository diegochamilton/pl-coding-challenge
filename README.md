# Client

To run the client, install the packages in the client directory and run:

`npm start`

which will start the react app on localhost:8080

# API

To run the api, install the packages in the api directory and run:

`npm start`

which will start the api on localhost:3000

For information on how to interact with this api please review the `json-server` documentation here: https://www.npmjs.com/package/json-server

# Decision making

When building the table, I had two options. Either using the native table element or using divs.

I decided to use the latter, since I did some research and tables can be more difficult to style. Specially when applying borders and scrolling.

On the mobile design, I opted for a card instead of table. Since it's the only element on the website, I felt that a card would be more pleasing to the eye.

# Reusability

The modal is completeley reusable, separating concerns on opening and closing and what's inside the modal.

The api calls are being made trough a function called CallApi, I decided to do this since it can be useful when setting credentials. It also keeps separation of concerns.

I built a custom hook to complement this called useApi, it would give me the loading state, the data if present, an error and the function to call the server as well.

# Design

There's a slight difference on the main table. The content is aligned to the center instead of right. I tried both styles but prefered the content centered.

# Error Handling

When checking if the ethereum address is valid, the function will wait for the response on the ethereum network and display the error if the call fails.

# Loading

There's a Loading component that displays a loading wheel until the response from the api comes back.
