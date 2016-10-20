const Stact   = require( 'stact' )
const Promise = require( 'bluebird' )
const _ 	  = require( 'lodash' )

const StactClass = Stact.Stact

/*
StactClass.prototype.foo = function( str ){ 
	console.log('str:',str) 
}

module.exports = function (options, items) {
  return new Stact(options, items);
}

*/

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
    if( _.isNumber( drop ) ){
        args = _.drop( args, drop )
    }

    return _.chain( args ).findLast( a => _.isFunction( a ) ).value()
}

/*
// Example of how to only allow a callback in the last two arguments
var getFullName = ( first, last, middleOrCb, cb ) => {
    return new Promise( ( res, rej ) => {

        // Do cool stuff

    } ).asCallback( getCb( arguments, 2 ) )
    // Obviously, if any of the arguments could be a callback, then just use `arguments` in  asCallback()
}
*/

// Save the original run method
StactClass.prototype.runOrig = StactClass.prototype.run


// Silly optimization instead of calling apply().
function fastApply ( func, thisArg, args, cb ) {
	console.log('[fastApply] args (%s):',args.length, args)

	if( ! args ){
		args = []
	}
	else if( ! _.isArray( args ) ){
		args = [ args ]
	}

	if( _.isFunction( cb ) ){
		args.push( cb )
	}


	return func.apply( thisArg, args getCb( args ) )

	/*
  	switch ( args.length ) {
    	case 1:
      		return func.call( thisArg, cb )
    	case 2:
      		return func.call( thisArg, args[0], cb )
    	case 3:
      		return func.call( thisArg, args[0], args[1], cb )
    	case 4:
      		return func.call( thisArg, args[0], args[1], args[2], cb )
    	case 5:
      		return func.call( thisArg, args[0], args[1], args[2], args[3], cb )
    	case 6:
      		return func.call( thisArg, args[0], args[1], args[2], args[3], args[4], cb )
    	case 7:
      		return func.call( thisArg, args[0], args[1], args[2], args[3], args[4], args[5], cb )
    	case 8:
      		return func.call( thisArg, args[0], args[1], args[2], args[3], args[4], args[5], args[6], cb )
   }
   */
}

/*
this._getFunc = options.getFunc || function getFunc (item) {
	if (typeof self._func === 'function') {
		return self._func
	}

	if (self._funcProp) {
		return item[self._funcProp]
	}

	return item
}
*/

StactClass.prototype.run = function () {
 	let self 	= this
    let results = []
    let count 	= 0
    //let cb 		= arguments[ arguments.length - 1 ]
    let cb  	= getCb( arguments )
    let args 	= arguments
    let abort 	= false

  	console.log('[finish] abort: ',abort)
  	console.log('[finish] cb:',cb)

  	if ( ! this.length ){
  		if( _.isFunction( cb ) ){
  			return cb()
  		}

  		return
  	}

  	if( _.isFunction( cb ) ){
  		args = _.dropRight( args )
  	}

  	function finish ( i ) {
  		console.log('[Stact.run > finish] abort:',abort)

    	return ( function runFinish ( err, result ) {
  			console.log('[Stact.run > finish > runFinish] abort:',abort)

      		if ( abort ){
      			return
      		}

      		if ( err ) {
        		abort = true
        		return cb(err, results)
      		}
      		
      		results[i] = result
      		
      		if ( ++count >= self.length ) {
        		cb( null, results )
      		}
    	})
  	}

  	this.forEach( function iterator ( item, i ) {
  		let thisVal = self._getFunc( item )

  		console.log( '[Stact.run > forEach] item: %s', item )
  		console.log( '[Stact.run > forEach] i: %s', i )
  		console.log( '[Stact.run > forEach > thisVal]:',thisVal ) )

    	fastApply( thisVal, item, args, finish( i ) )
  	})
}


//console.log( 'Keys:', _.keys( Stact.Stact.prototype ) )

module.exports = function ( options, items ) {
   return new StactClass( options, items )
}

module.exports.Stact = StactClass