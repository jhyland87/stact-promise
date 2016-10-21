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

/**
 * Execute the function found at the far right
 */
StactClass.prototype.exec = function () {
  let self    = this
  let results = []
  let count   = 0
  let abort   = false

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
/**
 * Execute the last function-type item found in the stack
 */
StactClass.prototype.execFirst = function () {
  let self    = this
  let results = []
  let count   = 0
  let abort   = false

  /**
   * Execute the last function-type item found in the stack
   */
  return new Promise( ( res, rej ) => {
    // Logic 
  }).asCallback( cb )
}

/**
 * Execute the last function-type item found in the stack
 */
StactClass.prototype.execLast = function () {
  let self    = this
  let results = []
  let count   = 0
  let abort   = false

  /**
   * Execute the last function-type item found in the stack
   */
  return new Promise( ( res, rej ) => {
    // Logic 
  }).asCallback( cb )
}

/**
 * Execute the function found in the `idx` spot 
 * @note  The idx variable array-type indexes, starting from 0. So 
 *        an idx value of 3 returns the 4th value in the stack
 */
StactClass.prototype.execIdx = function ( idx ) {
  let self    = this
  let results = []
  let count   = 0
  let abort   = false

  if( ! _.typeof( idx, true ) !== 'number' ){
    // Throw a hissy fit
  }

  /**
   * Execute the last function-type item found in the stack
   */
  return new Promise( ( res, rej ) => {
    // Logic 
  }).asCallback( cb )
}

/**
 * Move a stack item from the index fromIdx to toIdx
 * @note  This will cause other items to get re-indexed as well
 */
StactClass.prototype.moveItem = function ( fromIdx, toIdx ) {
  let self    = this
  let results = []
  let count   = 0
  let abort   = false

  /**
   * Execute the last function-type item found in the stack
   */
  return new Promise( ( res, rej ) => {
    // Logic 
  }).asCallback( cb )
}

/**
 * Switch the two items found in the stact stack
 */
StactClass.prototype.swapItems = function ( idx1, idx2 ) {
  let self    = this
  let results = []
  let count   = 0
  let abort   = false

  /**
   * Execute the last function-type item found in the stack
   */
  return new Promise( ( res, rej ) => {
    // Logic 
  }).asCallback( cb )
}

/**
 * Return the number of items in the object instance
 * @return {number}   Number of items
 */
StactClass.prototype.count = function(){
  return this.length
}

// Silly optimization instead of calling apply().
function fastApply ( func, thisArg, args, cb ) {
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