[![Netlify Status](https://api.netlify.com/api/v1/badges/6b7b76e7-6619-4ad4-a3f5-bc9e6b98efaa/deploy-status)](https://app.netlify.com/sites/mariana-contact-app/deploys)

# [Contact App](https://mariana-contact-app.netlify.com/)

Contacts website using React and Material UI

### How to install

Before starting, please clone this repository.

After, to install this project, you need to run these two commands to go to the project directory and install it:

#
```
cd contact-app
yarn install
```

### 🍻 To initialize Contact App

In the project directory, you can run:

```
yarn start
```

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload as you change the code.<br>
You will also see any lint errors in the console.

#### Loading test data locally

If you want to load some contacts, open the browser console and type:

```
populateTestData()
```

It will add several contacts.  It's required to reload the page after doing it.

### ☘ Testing Contact App

In the project directory, you can run:

```
npm test
```

It launches the test runner in the interactive watch mode.

### 🚀 Building Contact App

In the project directory, you can run:

```
npm run build
```

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.
The build is minified and the filenames include the hashes.

## Requirements

1. The user should be able to add the contact information where:
    - name - is required
    - email - is required
    - phone - optional
1. User should be able to favorite the contact.
1. User should be able to see the list of all contacts and list of favorite contacts.
1. In the contacts list, the user should be able to toggle "favorite" on and off. If the contact was not unfavorited, it should disappear from the list of favorite contacts.
1. You should be able to modify existing contact.
1. The data should be persistent so you might want to use the localStore for simplicity.
