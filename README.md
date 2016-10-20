# Note: Project in development
No touchy, until this message is gone.

# stact-promise
Currently, this module is essentially a copy of **[node-stact](https://github.com/cpsubrian/node-stact)**, with some added extra  functionality. 

### Added Functionality
 - Use the [asCallback](http://bluebirdjs.com/docs/api/ascallback.html) method from the  [BluebirdJS](http://bluebirdjs.com/docs/getting-started.html) module to allow *Promises* for the `run` method, while mantaining compatability with the existing start-guide.
 - Add the functionality found in the [node-stact-hooks](https://github.com/cpsubrian/node-stact-hooks) module.
 - *More to come... maybe*

### Examples
**Executing the next element in the array, using a *callback* to handle the result:**
```javascript
const Stact = require('stact-promise')
const stack = Stact({})

/**
 * Add a function to the Stack.. 
 */
stack.add( function maketUsername( first, last ) { 
    const username = first.charAt(0) + last
    console.log( 'Username for %s %s: %s', first, last, username )
})

/**
 * Execute the maketUsername function in the stack, using a **callback** to handle the results/errors. (This
 * JSDoc block is for the callback parameters, which im sure you realized by now, hah
 * @param   {string=}   err         Error that may have occurred.. Or null for no error 
 * @param   {*}         results     Results of the function being executed.
 */
stack.run( 'John', 'Doe', function testFunc ( err, results ) {
    if( err ){
        console.log('Error:', err)
        return
    }
    username = maketUsername(
    console.log('Username:',results)
})

// OR....

/**
 * The below JS snippet would be whats used to replace `testFunc` function in the execution 
 * of `stack.run` method found in the above segment of code. 
 */
stack.run( 'John', 'Doe' )
    .then( result => console.log( 'Generated username for John Doe is: %s', result ) )
    .catch( err =>  console.log( 'Error:', err ) )
```

### Credits
- [node-strict](https://github.com/cpsubrian/node-stact)
- [node-stact-hooks](https://github.com/cpsubrian/node-stact-hooks)
- [BluebirdJS](http://bluebirdjs.com/docs/getting-started.html)