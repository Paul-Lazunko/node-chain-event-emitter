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

  emit ( event, data ) {

    if ( typeof event === 'string' && this.events[ event ] ) {

      let gen = function* ( callbacks ) {

        for ( let i = 0; i < callbacks.length; i++ ) {

          yield callbacks[ i ];

        }

      };

      let callbacks = gen( this.events[ event ] );

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
