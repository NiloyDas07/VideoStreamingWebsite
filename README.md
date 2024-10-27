# Project Overview

[Live Site - https://vids-cxgc.onrender.com/](https://vids-cxgc.onrender.com/)

[Github - https://github.com/NiloyDas07/VideoStreamingWebsite](https://github.com/NiloyDas07/VideoStreamingWebsite)

====================

This is a video sharing website built using **[React](https://reactjs.org)**, **[Redux](https://redux.js.org)**, and **[Express.js](https://expressjs.com)**.

**[Tailwind CSS](https://tailwindcss.com)** is used for styling.

**[MongoDB](https://www.mongodb.com)** is used as the database.

**[Cloudinary](https://cloudinary.com)** is used for storing images and videos.

The frontend is located in the `client` folder, while the backend is located in the `server` folder.

## Frontend Documentation

=========================

### Client Folder Structure

- `client`
  - **public\images** - Contains default user avatar and cover image files.
  - **src**
    - **components** - Contains all the reusable components.
    - **actions** - Contains all the `async thunk` action creators for **redux**.
    - **features** - Contains all the `slice reducers` for `redux`.
    - **pages** - Contains all the page components(e.g. `Home`, `Login`, `SignUp`, etc.).
    - **store** - Contains the `redux store`.
    - **utils** - Contains all the utility functions(e.g. `axios instances etc.`).

### Components

- `Container.jsx`: A reusable container component.
- `Header.jsx`: The main header component.
- `Logo.jsx`: The logo component.
- `Button.jsx`: A reusable button component.
- `Input.jsx`: A reusable input component.
- `Loading.jsx`: A loading indicator component.
- `Modal.jsx`: A reusable modal component.
- `SearchBox.jsx`: A search box component.
- `VideoCard.jsx`: A video card component.
- `Videos.jsx`: A videos component.
- `EditButton.jsx`: An edit button component.
- `LikeButton.jsx`: A like button component.
- `ShareButton.jsx`: A share button component.
- `SubscribeButton.jsx`: A subscribe button component.

### Actions

- `userActions.js`: User-related actions (e.g., login, logout, update account).
- `playlistActions.js`: Playlist-related actions (e.g., get playlists, create playlist).
- `videoActions.js`: Video-related actions (e.g., get videos, create video).
- `channelActions.js`: Channel-related actions (e.g., get channels).
- `commentActions.js`: Comment-related actions (e.g., get comments, create comment).

### Features

- `channelSlice.js`: Channel-related state management.
- `commentSlice.js`: Comment-related state management.
- `playlistSlice.js`: Playlist-related state management.
- `userSlice.js`: User-related state management.
- `videoSlice.js`: Video-related state management.
- `UiSlice.js`: UI-related state management.
- `multipleVideoSlice.js`: Multiple video-related state management.

### Store

- `store.js`: The main store configuration.

### Utils

- `axios.util.js`: Axios utility functions.
- `tokenRefresh.js`: Token refresh utility functions.

## Backend Documentation

=========================

### Server Folder Structure

- `server`
  - `src`
    - `app.js`
    - `routes`
    - `controllers`
    - `services`
    - `middlewares`
    - `models`
    - `utils`
  - `package.json`

### Dependencies

- [bcrypt](https://www.npmjs.com/package/bcrypt): For password hashing.
- [cloudinary](https://cloudinary.com/documentation/node_integration): For storing images and videos to cloudinary.
- [cookie-parser](https://www.npmjs.com/package/cookie-parser): For parsing cookies.
- [cors](https://www.npmjs.com/package/cors): For cross-origin resource sharing.
- [email-validator](https://www.npmjs.com/package/email-validator): For email validation.
- [dotenv](https://www.npmjs.com/package/dotenv): For environment variables.
- [express](https://expressjs.com/): For server setup.
- [mongoose](https://mongoosejs.com/): For database access.
- [mongoose-aggregate-paginate-v2](https://www.npmjs.com/package/mongoose-aggregate-paginate-v2): For pagination in mongoose.
- [multer](https://www.npmjs.com/package/multer): For file upload.

### Routes

- `healthcheck.routes.js`: Healthcheck route.
- `user.routes.js`: User-related routes (e.g., login, logout, update account).
- `playlist.routes.js`: Playlist-related routes (e.g., get playlists, create playlist).
- `video.routes.js`: Video-related routes (e.g., get videos, create video).
- `subscription.routes.js`: Subscription-related routes (e.g., toggle subscription, get subscribed channels).
- `dashboard.routes.js`: Dashboard-related routes (e.g., get channel stats, get channel videos).
- `comment.routes.js`: Comment-related routes (e.g., get comments, create comment).
- `like.routes.js`: Like-related routes (e.g.,toggle video like, toggle comment like).

### Controllers

- `healthcheck.controller.js`: Healthcheck controller function.
- `user.controller.js`: User-related controller functions.
- `playlist.controller.js`: Playlist-related controller functions.
- `video.controller.js`: Video-related controller functions.
- `subscription.controller.js`: Subscription-related controller functions.
- `dashboard.controller.js`: Dashboard-related controller functions.
- `comment.controller.js`: Comment-related controller functions.
- `like.controller.js`: Like-related controller functions.

### Services

- `cloudinary.service.js`: Cloudinary service functions.

### Middlewares

- `auth.middleware.js`: Authentication middleware.
- `errorHandler.middleware.js`: Error handler middleware.
- `multer.middleware.js`: Multer middleware.

### Models

- `user.model.js`: User model.
- `playlist.model.js`: Playlist model.
- `video.model.js`: Video model.
- `comment.model.js`: Comment model.
- `like.model.js`: Like model.
- `subscription.model.js`: Subscription model.

### Utils

- `asyncHandler.js`: Async handler utility functions.
- `ApiError.js`: API error utility functions.
- `ApiResponse.js`: API response utility functions.
