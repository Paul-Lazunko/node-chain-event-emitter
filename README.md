# node-chain-event-emitter
Chain Event Emitter for Node JS

npm i -s chain-event-emitter

```
const EventEmitter = require('node-chain-event-emitter');

let emitter = new EventEmitter();


emitter.on( 'test', ( data, next ) => {

  console.log({ firstHandler: data });
  
  if ( ! data.works ) {
    next();
  }
  
});


emitter.on( '*', ( data, next ) => {

  console.log({ beforAllEvents: data});
  next();
  
});


emitter.on('test', (data, next) => {

  console.log( { secondHandler: data } );
  next();
  
});

emitter.emit('test', { works: true } );

//  { beforAllEvents: { works: true } }
//  { firstHandler: { works: true } }

```
