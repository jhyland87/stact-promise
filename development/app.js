const hooks = require('../stact-promise')
//const Stact   = require( 'stact' )
//const Promise = require( 'bluebird' )
const _     = require( 'lodash' )
//const _       = require( 'moar-lodash' )


//console.log( 'hooks:', hooks )
//console.log( 'keys > hooks.prototype:', _.keys( hooks.prototype ) )
//console.log( 'keys > hooks.Stact.prototype:', _.keys( hooks.Stact.prototype ) )

/*
hooks('before:save').add(function (next) {
  // Do something.
  next();
});

hooks('before:save').add(function (next) {
  // Do something.
  next();
});

hooks('after:save').add(function (next) {
  // Do something.
  next();
});

hooks('before:save').run(function (err, results) {
  if (err) // Handle err.
  save(function (err) {
    if (err) // Handle err.
    hooks('after:save').run(function (err, results) {
      if (err) // Handle err.
    });
  });
}
});
*/


var stack = hooks({})

stack.exec('failthis','bar','baz', function (err, results) {
  if( err ){
    console.log('Error:', err)
    return
  }

  console.log('Results:',results)
})

stack.add(function testFuncA( a, b, c ) { 
  console.log( '==================' ) 
  console.log('[STACKED FUNCTION (testFunc**A**)] executing - Arguments:',arguments)
  console.log( '==================' ) 
  if( a === 'failthis' ){
    throw new Error('a was failthis');
  }
  return 'testFuncA finished; Args: ' + JSON.stringify( arguments )
})



stack.add(function testFuncB( a, b ) { 
  console.log( '==================' ) 
  console.log('[STACKED FUNCTION (testFunc**B**)] executing - Arguments:',arguments)
  console.log( '==================' ) 
  if( a === 'failthis' ){
    return new Error('a was failthis')
    //throw new Error('a was failthis')
  }
  return 'testFuncB finished; Args: ' + JSON.stringify( arguments )
})

console.log('stack.count:', stack.count())

stack.execFirst('failthis','bar','baz', function (err, results) {
  if( err ){
    console.log('Error:', err)
    return
  }

  console.log('Results:',results)
})

console.log('stack.count:', stack.count())

stack.exec('failthis','bar','baz', function (err, results) {
  if( err ){
    console.log('Error:', err)
    return
  }

  console.log('Results:',results)
})

stack.exec('failthis','bar','baz' )
  .then( results => console.log( 'Results:', results ) )
  .catch( err => console.log( 'Error:', err ) )


/*
stack.first('bang', 'quux', function (err, results) {
  if( err ){
    console.log('Error:', err)
    return
  }

  console.log('Results:',results)
})
*/

/*stack.run( 'bang', 'quux' )
  .then( results => console.log( '>>> Results:',results ) ) 
  .catch( err =>  console.log( '>>> Error:', err ) )
*/