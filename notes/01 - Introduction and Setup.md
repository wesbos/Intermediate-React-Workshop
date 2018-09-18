
# Intermediate React

Welcome to the intermediate react workshop!

Today we are going to build a simple note-taking app while learning about some intermediate concepts in React such as:

* Render Props
* High Order Components
* Managing State with React Context
* React Fragments
* Fetching Data and Talking to Servers
* Applying CSS with styled-components
* Leveraging Downshift for easy and accessible search
* Server Side Rendering and Lifecycle Methods

You can take a look at the finished application by running `npm install` and then `npm run dev` in the `app-finished` folder.

Ready!?

## These Notes

These notes are meant to guide us through the day and serve as a reference point for when you are stuck or unable to type the code along with the class.

These notes won't work on their own as much of a nuance and examples will be explained in person.

These notes are hosted on github at <https://github.com/wesbos/Intermediate-React-Workshop> — code fixes, clarifications and spelling corrections are much appreciated!

## A Note on Questions

My style of teaching is fairly relaxed and I'm happy to go off on tangents or take breaks to re-explain something. Please ask questions at any time 😃

## Getting Setup
Today's application will be built out of the `app` folder.

CD in the `app` folder and type `npm install`

While we are doing that, let's take a second to explain what each of these deps do:

```
"axios"
"downshift"
"next"
"react"
"react-dom"
"styled-components"
```

## Our Backend

While today's workshop isn't focused on the backend, we do need some sort of backend to work with so we can C.R.U.D. our notes.

If you open the `backend` folder, you'll see the entire backend is in `index.js`.


First, let's get the backend installing and running:

1. cd into the `backend` folder - do this in another terminal tab than the `app` folder.
1. run `npm install`
1. run `npm run dev` to start the server

Then Let's run through the backend code quick to understand what is going on.

Please note that this backend isn't a production ready application as it contains **no authentication** and is running on a cheap-n-easy text-based database called `diskdb`. This is a great solution for whipping up a quick backend when you want to focus on the front end :)


