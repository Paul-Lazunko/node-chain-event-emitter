var ChainEventEmitter = function ( ) {
  return Object.create( ChainEventEmitter.prototype );
};

ChainEventEmitter.prototype.callbacks = {};

ChainEventEmitter.prototype.on = function( name, method ) {
  var self = this;
  if ( Array.isArray( name ) ) {
    name.filter( function( event ) {
      if ( typeof event === 'string' ) {
        if ( self.callbacks.hasOwnProperty( event ) && Array.isArray( self.callbacks[ event ] )  ) {
          self.callbacks[ event ].push( method );
        }  else {
          self.callbacks[ event ] = [];
          self.callbacks[ event ].push( method );
        }
      }
    });
  } else if ( typeof name == 'string' ) {
    if ( name === '*' ) {
      if ( this.callbacks.hasOwnProperty( '*' ) && Array.isArray( this.callbacks[ '*' ] )  ) {
        this.callbacks[ '*' ].push( method );
      }  else {
        this.callbacks[ '*' ] = [];
        this.callbacks[ '*' ].push( method );
      }
    } else {
      if ( this.callbacks.hasOwnProperty( name ) && Array.isArray( this.callbacks[ name ] )  ) {
        this.callbacks[ name ].push( method );
      }  else {
        this.callbacks[ name ] = [];
        this.callbacks[ name ].push( method );
      }
    }
  }
};

ChainEventEmitter.prototype.emit = function( name, data ) {
  var i, callbacks = [];
  if ( this.callbacks.hasOwnProperty( name ) ) {
    for ( i = this.callbacks[ name ].length; i >= 0; i-- ) {
      if ( i > 0 ) {
        if ( ! this.callbacks[ name ][ i ] ) {
          callbacks.push( this.callbacks[ name ][ i - 1 ].bind( this, data, function(){} ) );
        } else {
          callbacks.push( this.callbacks[ name ][ i - 1 ].bind( this, data, callbacks[ callbacks.length - 1 ] ) );
        }
      }
    }
  }
  if ( this.callbacks.hasOwnProperty( '*' ) && Array.isArray( this.callbacks[ '*' ] ) && !! this.callbacks[ '*' ].length ) {
    for ( i = this.callbacks[ '*' ].length; i > 0; i-- ) {
      callbacks.push( this.callbacks[ '*' ][ i - 1 ].bind( this, data, callbacks[ callbacks.length - 1 ] ) );
    }
  }
  callbacks = callbacks.reverse();
  callbacks[0]();
};

ChainEventEmitter.prototype.getEvents = function() {
  return Object.keys( this.callbacks );
};

ChainEventEmitter.prototype.getListneresCount = function( event ) {
  var count = 0;
  if ( event && this.callbacks.hasOwnProperty( event ) ) {
    count += this.callbacks[ event ].length;
  } else {
    for ( var e in this.callbacks ) {
      count += this.callbacks[ e ].length;
    }
  }
  return count;
};

module.exports = ChainEventEmitter;
