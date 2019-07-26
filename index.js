const generateCallbacks = require('./generator');

class ChainEventEmitter {

  constructor () {

    this.events = {};

  }

  on ( event, func ) {

    if ( typeof  event === 'string' && typeof func === 'function' ) {

      if ( event === '*') {

        for ( let event in this.events ) {

          this.events[ event ] = this.events[ event ] || [];
          this.events[ event ].unshift( func );

        }

      } else {

        this.events[ event ] = this.events[ event ] || [];
        this.events[ event ].push( func );

      }
    }

  }

  off ( event ) {
    delete this.events[ event ];
  }

  emit ( event, data ) {

    if ( typeof event === 'string' && this.events[ event ] ) {

      let callbacks = generateCallbacks( this.events[ event ] );

      let next = () => {

        let callback = callbacks.next();

        if ( callback.value ) {

          callback.value.apply(this, [data, next]);

        }

      };

      next();

    }
  }

}

module.exports = ChainEventEmitter;
