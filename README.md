# node-chain-event-emitter
Chain Event Emitter for Node JS

npm i -s node-chain-event-emitter

```js
const EventEmitter = require('node-chain-event-emitter');

let emitter = new EventEmitter();


emitter.on( 'test', ( data, next ) => {

  console.log({ firstHandler: data });
  
  if ( ! data.works ) {
    next();
  }
  
});


emitter.on( '*', ( data, next ) => {

  console.log({ beforeAllEvents: data});
  next();
  
});


emitter.on('test', (data, next) => {

  console.log( { secondHandler: data } );
  next();
  
});

emitter.emit('test', { works: true } );

//  { beforeAllEvents: { works: true } }
//  { firstHandler: { works: true } }

```
If you want to change passed data while handling event, call next function with changed data as an argument:

```js

emitter.on('test', (data, next) => {

  // Do something with data
  next(data);
  
});

```

If you want to change context in the each handler you should pass it to the ChainEventEmitter constructor in the **options** object:

```js
const EventEmitter = require('node-chain-event-emitter');
const ctx = {};

let emitter = new EventEmitter({ ctx });
```