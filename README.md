# Sorting demo

#### Live Demo <https://cjklain.github.io/sorting-demo/>

#### Video Demo: <URL>

#### Description:

In this project I wanted to challenge my self to try make an app, which show how certain sorting algorithms works, using basic tools. It’s fully frontend app, on this stage I didn’t see reason to add backend logic. I think that I can say that I was able to reach my goal. Whole page is running without any external tools to animations, all is purely based on DOM and good old JS.

#### Source files:

- index.html – hold all structure of page
- index.ts - part which is responsible for all interactions. Every change that happens on the screen. There are also types here which help me a lot avoid many possible problems.
- index.js – every TypeScript file must be convert to JavaScript because web browsers don’t understand TS. So it holds same code as index.ts but converted to JS.
- style.css – file with all styles that I used to build this app.
- package.json – configuration file, contains list of used packages and information about this project, this is also script section where are defined function to run.
- .eslintrc – configuration file to eslint.
- .prettierrc – configuration file to prettier.
- .gitigoner – contains list of file to ignore.
- tsconfig.json – contains TypeScript configuration.

#### Technology Stack:

To build this application I decided to pretty basic set of technologies maybe except form TypeScript which is still pretty fresh but become standard now a days. So to build this application I used html 5, CSS and TS. During development I have been using eslint which is great tool for static code analyzer. It finds many possible problem and help keeps code clean. Also great tool that I used is prettier it makes great job with formatting code and also works great with eslint. Both require some configuration but it is worth time. During development I needed some tool to host application and to do that I user packages from npm (Node Package Manager) that is called lite-sever. I had some difficulties when working with TypeScript compiler and lite-sever. I wanted to be able run this two thins with one command so I decided to add packages called concurrently. And this packages made it possible to run this two scripts with just one command. So when it comes to technology that I used it all comes down to just basic HTML, JS, and CSS, but that was my goal.

#### Desing:

I wanted to keep this app pretty simple. I used mainly two colors and one design button. There is navigation section, main and footer. In navigation section there are command who role is to help with navigation and 3 buttons. Each button is assigned to different algorithm. There can be selected only one button at the time. When button is selected background becomes a bit darker. Below navigation is main section. It consists of 2 inputs, 2 buttons and div. I decided to used range and number input. They are connected so If user change value of one the other will change also. The role of the number input is also to display currently selected value. The range that I have decided will be selectable is between 2-100. I set the default value to 30 to not take too much time. Below Inputs there are two buttons. First is responsible for turning on soring and other for reset. Run buttons will not work if none of algorithms button weren't selected. Reset button can be used during sorting or just to change order of elements. Under control buttons is div where all sorting happens. It is responsive to number of chosen values. Inside there are some very similar divs with different height. Goal of entire application is to sort this elements and show how different algorithms works. Color of these elements changes depending on the state, they can by active, sorted Under main section is footer which contains my GitHub account name.

#### Inspiration:

During the lecture I saw very similar thing and I wanted to see if I could do something like that.

#### Hosting:

To host this app I used GitHub pages.

#### To work with:

- Clone repo
- Go to repo directory
- Run npm i
- Run npm run dev
