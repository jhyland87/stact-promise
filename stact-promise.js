const Stact   = require( 'stact' )
const Promise = require( 'bluebird' )
//const _       = require( 'lodash' )
const _       = require( 'moar-lodash' )

const StactClass = Stact.Stact

function tof ( item ) {
  return _.typeof( item )
}
function tof2 ( item ) {
  return _.typeof( item, true )
}
function _typ( item ){
  return _.type( item) 
}

/**
 * Get the function farthest to the right in the arguments provided. If the `drop` argument is
 * defined (as a number), then ignore that number of arguments (from the left) while looking
 * for a defined function (basically, the number of non-callback args)
 *
 * @param   {array}     args    The `arguments` from the executing function
 * @param   {number=}   drop    Number of items to drop from the args array 
 * @returns {function=}         Returns the function found, or undefined
 */
function getCb( args, drop ){
    if ( _.isNumber( drop ) ){
        args = _.drop( args, drop )
    }

    return _.chain( args ).findLast( a => _.isFunction( a ) ).value()
}

/**
 * Execute an item (function)in the stack
 */
function execStacItem() {
  let _f = data => ({
    data   : data,
    result : false
  })

  let _t = data => ({
    data   : data,
    result : true
  })

  try {
    // (func, thisArg, args, cb)
    let result = fastApply( self._getFunc( item ), item, args, finish( i ) )

    console.log( '[execStackItem] result (type: %s):', typeof result, result )
    return _t( result )
  }
  catch( err ){
    if ( ! _.size( err ) ){
      return _f( 'Unknown error executing stacked function' )
    }

    return _f( err )
  }
}

StactClass.prototype.execFirst = function () {
  let self    = this
  let results = []
  let count   = 0
  let abort   = false

  //console.log('self (%s):', _.size(self), self)
  this._stack = _.drop( this._stack )
}

StactClass.prototype.execLast = function () {
  let self    = this
  let results = []
  let count   = 0
  let abort   = false

  //console.log('self (%s):', _.size(self), self)
  this._stack = _.dropRight( this._stack )
}

StactClass.prototype.exec = function () {
  let self    = this
  let results = []
  let count   = 0
  let abort   = false

_.forEach([
    //1, 2,
    true, 1, 5, 'some string', 1.2, '3.4', ['foo','nar'], {first:'j'}, '1.2.3', a => console.log( 'test' ) 
  ], function(value, key) {
  //console.log( '[ARR] key: %s; val: %s', key, value )
  console.log( '[ARR] key: %s; value: %s; typeof: %s; _.typeof: %s; _.type: %s (invistigate: %s)',
    '???', value.toString(), typeof value, tof( value ), _typ( value ), tof2( value ) )


})
/*
  _.forEach( [
  //true, 1, 5, 'some string', 1.5, [1,2], {first:'j'}, '1.2.3', a => console.log( 'test' )
  1, true, 'str'
], a => function(value) {
  console.log( '[ARR] -------------\nasdf\n------------' )
  //console.log( 'key: %s; value: %s; typeof: %s; _.typeof: %s','???', value.toString(), typeof value, to( value ) )
  //console.log( 'value: %s; typeof: %s', value, typeof value)
  console.log( '-------------' )
})*/

  // Get the function from the end of the arguments, or undefined
  let cb      = getCb( arguments )

  console.log('_.typeof(cb):', tof(cb))

  // If a callback was found, then get all but the last argument 
  // for the args (otherwise, get all)
  let args    = ( cb ? _.dropRight( arguments ) : arguments )

  return new Promise( ( res, rej ) => {
    if ( ! self.length ){
      return rej( 'No stacked functions saved' )
    }

    const finish = i => ( err, result ) => {
      if ( abort ){
        return rej( 'Aborted..' )
      }

      if ( err ) {
        abort = true
        return rej( err )
      }

      results[i] = result

      if ( ++count >= self.length ) {
        return res( results )
      }
    }

    self.forEach( ( item, i ) => {
      console.log('self.forEach self (%s):', self.length, self)

      try {
        //let result = fastApply( self._getFunc( item ), item, args, finish( i ) )
        let result = execStacItem( )

        return res( result )
      }
      catch( err ){
        if ( ! _.size( err ) ){
          err = 'Unknown error executing stacked function'
        }

        return rej( err )
      }
    })

  }).asCallback( cb )

}

StactClass.prototype.len = function () {
  let self = this

  console.log( '# LENGTH ----------------------------')
  console.log( 'self:', self )
  console.log( 'self.prototype:', self.prototype )
  console.log( 'self.prototype:', self.cs )
  console.log( 'self.length:', self.length )
  console.log( '# -----------------------------------')
}


// Silly optimization instead of calling apply().
function fastApply (func, thisArg, args, cb) {
  console.log('[fastApply] func name: %s; Args (%s):', func.name, args.length, args )

  if ( ! _.isArray( args ) ){
    if ( ! args ){
      args = []
    }
    else {
      args = [ args ]
    }
  }

  if ( ! _.isFunction( cb ) ){
    console.log('WTF IS WITH CB - ', cb)
    cb = function(){ 
      console.log( 'DEFAULT FUNCTION THINGY - arguments:', arguments )
    }
  }

  return func.apply( thisArg, _.concat( args, cb ) )
}

module.exports = function ( options, items ) {
   return new StactClass( options, items )
}

module.exports.Stact = StactClass