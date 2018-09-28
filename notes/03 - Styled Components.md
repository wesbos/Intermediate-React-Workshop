# Styled Components

Writing CSS in react can be done a number of different ways. I'll assume you are familiar with the regular `<link>` tag in your applications `<head>`

Another way to write CSS in react is to write the CSS so that it's scoped to the component you are applying it to. There are a few benefits to doing this:

* your CSS wll never leak outside of a component
* You don't need complex selector
* You can create re-usable styles like headings and buttons
* You have access to all of JavaScript inside of your CSS - great for logic

## The Basics
The basics of styled components is that instead of creating an element, adding a class and then writing some CSS to match that class, we create replacement components that have the css attached to it.

say we start with this:

```JSX
<div className="hey">
  <p>Hey</p>
</div>

<style>
.hey { background: red; }
</style>
```

Instead of using a div, we create a div with the styles attached directly to it:

```JSX
import styled from 'styled-components';

const HeyStyles = styled.div`
  background: red;
`;
```

And then use that component wherever we need those styles applied to a div:


```JSX
<HeyStyles>
  <p>Hey</p>
</HeyStyles>
```

Note how we use back ticks after the `styled.div`? We can write any regular CSS in here, including child selectors:

```JSX
const HeyStyles = styled.div`
  background: red;
  p {
    font-size: 100px;
  }
`;
```

In addition to that we can access the props of a component like so:

```JSX
<HeyStyles cool={true}>
  <p>Hey</p>
</HeyStyles>

const HeyStyles = styled.div`
  background: red;
  ${props => props.cool ? 'background: rainbow;'}
  p {
    font-size: 100px;
  }
`;
```

Styled components is surprisingly simple to work with - all of your CSS knowledge transfers over and everything that you know from Sass has a styled-components equivalent. The above example is what 99% of your CSS will look like but for advanced use cases check out <https://www.styled-components.com/docs>. Additionally we will be using it throughout today.

## Global Styles in Styled Components

Scoped styles in a react application isn't always the best way to approach certain styles. The C in CSS stands for Cascade and that can be extremely helpful.

Base styles like a CSS reset, border-box, fonts and colours are best set globally on the entire document. No one wants to have to set the font-family and font-size on every single paragraph tag they create.

To do this, let's crack open `components/styles/PageStyles.js` and write the following CSS. You'll notice that we use `injectGlobal` to .. well ... inject global styles :)

Then we also create a PageStyles div that we can use to replace our div in `Page.js`.

```JSX
import styled, { injectGlobal } from 'styled-components';

// global styles
injectGlobal`
  html {
    font-family: sans-serif;
    background: linear-gradient(to right, #673ab7, #512da8);
    box-sizing: border-box;
  }
  * {
    box-sizing: inherit;
  }
  body {
    display: grid;
    min-height:100vh;
    align-items: center;
    justify-items: center;
  }
  a {
    color: #ffc600;
  }
`;

const PageStyles = styled.div`
  width: 500px;
  padding: 10px 0;
  background: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  position: relative;
  display: grid;
  height: 50vh;
  grid-template-rows: auto auto 1fr;
  &:before,
  &:after {
    display: block;
    content: '';
    background: white;
    width: 100%;
    height: 100%;
    top: 0;
    transform: rotate(2deg);
    z-index: -2;
    position: absolute;
    box-shadow: 0 0 10 rgba(0, 0, 0, 0.3);
  }
  &:after {
    transform: rotate(-2deg);
  }
`;

export default PageStyles;
```

## Try it yourself

Let's try swap that h1 tag out with the following styles:

```css
text-align: center;
font-size: 70px;
color: black;
margin: 0;
```

If this is a style you plan on using more than once, you can put the styles in a separate file. You may also put the styled component directly in another component folder.

I find that if the component is more than 20 lines, or is used in more than one file, I make it separate. Otherwise keep it with the component its styling.

.

.

.

.

Answer:

```JSX
const Heading = styled.h1`
  text-align: center;
  font-size: 70px;
  color: black;
  margin: 0;
`;
```
