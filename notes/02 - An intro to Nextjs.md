# Next.js Intro

Next.js is a small framework for creating React applications. Almost all of the code we are writing has nothing to do with Next.js - so if you decide not to use Next.js you will be able to move almost all of this code outside of next.

So, what does next.js do then? A few things:

1. **No tooling.** Babel? Webpack? I want to Cry? Next.js takes all the tooling out of the equation and does it under the hood for you. You can just start writing your React app and go. It's setup for the most common types of authoring (es6, async+await..) but you do have the option to have a custom babel config or webpack if you need.
1. **Server-side rendering** — Next.js is a node application that makes the process of server-rendering your application a snap. It mostly "just works", but it does expose a custom `getInitialProps` lifecycle method mean to use with async data calls that we will explore. You also have the option to export a static version of your site.
1. **Routing** — Routing is built into next.js and requires no config. There is a `pages` folder where you create an `index.js` or `about.js` for `/` and `/about` pages accordingly.
1. **Prefetching** — Becuse Next.js is server rendered - we can request that the server pre-render specific pages and then preload them wite ease.
1. **On Demand / Dynamic imports** — lazy load your scripts with ease!


## Our First Page

To Create our first page, simply create an `index.js` file in the `pages/` dir.


Then inside of that, we can create a simple React component

```js
const IndexPage = () => (
  <div>
    <p>Hello!</p>
  </div>
);

export default IndexPage;
```

You'll notice that we are using _stateless functional components__ here - thats just a fancy word for a function that returns JSX.

In some cases, stateless functional components are faster than regular components. You can reach for one of these anytime you have a component that only has a render method.

Here are a few other ways you could write this:


```js
function IndexPage() {
  return (
    <div>
      <p>Hello!</p>
    </div>
  )
}

export default IndexPage;
```

or as a regular react component:

```js
import React from 'react';

class IndexPage extends React.Component {
  render() {
    return (
      <div>
        <p>Hello!</p>
      </div>
    )
  }
};

export default IndexPage;
```

You'll also notice that I export my components at the bottom of files - that is a personal preference and you are welcome to export then as you create them as well.

## Starting the Server
To start the server, run `npm run dev` in your `app` folder.

You should see your site on <http://localhost:9876> - note that I chose the port in the package.json

## Second Page && Routing

Go Ahead and create a page called `note.js` and visit <http://localhost:9876/note> - do you see these pages?

```js
const NotePage = () => (
  <div>
    <p>Im the note page!</p>
  </div>
);

export default NotePage;
```

Go ahead and view-source on on of these pages as well, you'll see the content of the page in the source, which means that page has been server-rendered.

Now, how do we link between the two pages? Normally you would just use a link like so:

```html
<a href="/note">Note</a>
```

But, that causes a full page reload. We want to harness the power of React and never reload the page - that's why it's called a Single Page Application.

To do routing in React, we use the router built into Next.js. We can write our link tags like so:

```js
import Link from 'next/link';

const IndexPage = () => (
  <div>
    <p>Hey!</p>
    <Link href="/note">
      <a>Note</a>
    </Link>
  </div>
);

export default IndexPage;
```

The only difference here is that the `Link` components get the `href` and there must be an anchor link inside of it that has no `href`.

Now if we click that Link from the index page to the notes page, you'll see it instantly cuts over.


## Custom Page Layout

Now if each page in the `pages/` dir is it's own component, how do we share page layout between them?

I like to create what is called a `<Page></Page>` component that will wrap each page a provide site-wide layout.

Let's create this now, in the `Components` folder:


```js
import Link from 'next/link';

const Page = props => (
  <div>
    <Link href="/">
      <a>
        <h1>Take Notes!</h1>
      </a>
    </Link>
    {props.children}
  </div>
);

export default Page;
```

Notice how we used `{props.children}` above? This means that we can wrap anything in a `<Page>` component and have this general layout work.

Try wrap both `index.js` and `note.js` in a page component now.


## Custom _app.js
In the last step the Page component solved the re-usable layout problem that we have, but it doesn't solve the problem of having a single application-wide component. If you were to put state or lifecycle methods into `<Page>`, you would notice that it mounts and unmounts once for every page we visit.

This is a problem because we currently do no have an application wide component that is mounted on page load and never unmounted until we close the page.

If we want to have application-wide state for things like storing a list of notes, holding a site's theme variables or implementing a state manager like redux, we need sort of a _mama-component_ that will wrap the entire thing.

If you take a look at your react dev tools - you'll see we actually do have an `<App>` component! This is created by Next.js automatically.

![](http://wes.io/99a2c4916ab2/content)

We can acutally create our own custom App component by creating a file called `pages/_app.js` with the following code. This is also a good place to put your Page component if you want it to be on every single page of your application.

Type the following code in it's entirety. We will come back to the `getInitialProps` section shortly and explain what we are doing here.


```js
import App, { Container } from 'next/app';
import Page from '../components/Page';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    pageProps.query = ctx.query;
    return { pageProps };
  }
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Page>
          <Component {...pageProps} />
        </Page>
      </Container>
    );
  }
}

export default MyApp;
```
