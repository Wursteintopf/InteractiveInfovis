Interactive Information Visualization of Income and Expenditure Data in German Households
=============================================================================

This project was created as part of a university course work. But I thought to myself, why not make this open source, maybe
someone is interested in income and expenditure data of german households, or in an example of an interactive
information visualization developed with [React](https://reactjs.org/) and [D3.js](https://d3js.org/). 

So if you are: congrats, you're at the right place.

Exploring the Data
------------------

You can find the final result at [infovis.vogelvlug.de](https://infovis.vogelvlug.de). The visualization was meant to be
displayed on a large TV screen and controlled with a "remote control" application on your smartphone. The remote control
was only prototyped though, you'll find it if you open [infovis.vogelvlug.de/remote](https://infovis.vogelvlug.de/remote)
within the same browser you have the visualization itself opened with. (This only works with browsers,
that support JavaScript BroadcastChannels though. For more information visit [CanIUse](https://caniuse.com/broadcastchannel).)

Setting everything up locally (e.g. for further development)
-----------------------------------------------------------

If you want to set up the project locally (e.g. for futher development or whatever reason you come up with) you'll need
[Node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/) (or [yarn](https://yarnpkg.com/) of course) on your local machine.

First open the terminal of your choice in the project folder and install all dependencies with:
````
npm i
````

Then start up the local [Parcel Server](https://parceljs.org/) with:
````
npm run dev
````

As soon as you're done developing you can bundle everything with:

````
npm run build
````

The bundled html and javascript files are located within the 'build' folder.

Used technologies
-----------------

* [D3.js](https://d3js.org/) as the visualization framework
* [Redux](https://redux.js.org/) for handling the data
* [React](https://reactjs.org/) to render the data to the DOM tree
* [BroadcastChannels](https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API) to communicate between remote and visualization

Both D3 and React usually manipulate the DOM tree. There are several approaches to deal with that situation 
(e.g. giving D3 references to DOM elements created by React, so D3 can manipulate those elements itself), but we 
decided to ditch the DOM manipulation by D3 completely and only use it as the visualization framework and let React 
do all the rendering. Using both D3 and React at the same time results in weird errors if React tries to rerender some 
components (which is a core feature of React), but the elements manipulated by D3 do not get rerendered, because they 
weren’t created by React. The disadvantage of that is, that some minor functionalities that D3 ships per default had to 
be reimplemented within React.


License
-------
This project is licensed under ["THE BEER-WARE LICENSE" (Revision 42)](https://en.wikipedia.org/wiki/Beerware). For more information see the LICENSE file.
