module.exports = function* ( callbacks ) {

  for ( let i = 0; i < callbacks.length; i++ ) {

    yield callbacks[ i ];

  }

};
