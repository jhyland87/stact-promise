# Note: Project in development
No touchy, until this message is gone.

# stact-promise
Currently, this module is essentially a copy of **[node-stact](https://github.com/cpsubrian/node-stact)**, with some added extra  functionality. 

### Added Functionality
 - Use the [asCallback](http://bluebirdjs.com/docs/api/ascallback.html) method from the  [BluebirdJS](http://bluebirdjs.com/docs/getting-started.html) module to allow *Promises* for the newly created `exec` method, while mantaining compatability with the existing start-guide. `exec` grabs an item in the associated *stack* (by default, `exec` grabs the *next* stack item in the stack, or a numeric value can be provided (in the first param) to grab the stack item found at that index number
 - New methods (listed in [examples table](https://github.com/jhyland87/stact-promise#new-methodsfunctions) below)
 - Add the functionality found in the [node-stact-hooks](https://github.com/cpsubrian/node-stact-hooks) module.
 - *More to come... maybe*

##### New Methods/Functions

| Method     | Return Type/Value | Description |
|:-----------|:------------:|:------------ |
| `exec`       | Callback\|Promise     | Blah blah..     
| `execLeft    | Callback\|Promise     | Blah blah..     
| `execIdx     | Callback\|Promise     | Blah blah.. 
| `moveItem`   | Boolean     | Move a stack item to a new index
| `swapItems`  | Boolean     | Swap two stack items (better than move, typically)
| `count`      | Numeric     | Was cutting wood all day

### Examples
Assume all of the examples are acting on a Stack object instance that was initiated using the below code:
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
```
Executing the next element in the array, using a *callback* to handle the result:
```javascript
/**
 * Execute the maketUsername function in the stack, using a **callback** to handle the results/errors. 
 * (This JSDoc block is for the callback parameters, which im sure you realized by now
 */
stack.exec( 'John', 'Doe', function testFunc ( err, results ) {
    if( err ){
        console.log('Error:', err)
        return
    }
    username = maketUsername(
    console.log('Username:',results)
})
```
Or, using a *Promise*, (opposed to a callback), to accomplish the exact same thing (which can be done with all the new `exec` methods):
```javascript
// As a callback..
StackObj.exec( 'John', 'Doe', ( err, data ) => {
    if( err ){
         /* Manage error */
         return SomeErrorHandler( err )
    }
    /* Data returned from executed function */
    console.log( JSON.stringify( data ) )
})

// .. Or as a Promise
StackObj.exec( 'John', 'Doe' )
    .then( data => /* Data returned from executed function */ )
    .catch( err => /* Manage error */ )
```
The above two examples grab the stack item next in line, where as this grabs the function found on the *other* side of the stack:
```javascript
// As a callback..
StackObj.execLast( 'John', 'Doe' )
    .then( result => /* Data returned from executed function */ )
    .catch( err   => /* Manage error */ )

// Or using a Promise
StackObj.execLast( 'John', 'Doe' )
    .then( data => /* Data returned from executed function */ )
    .catch( err => /* Manage error */ )
```
The `exec` and `execLast` grabs the stack items on the right and left, where this grabs the stack item found in the array in the index spot..
```javascript
// As a callback..
StackObj.execIdx( 3, 'John', 'Doe' )
    if( err ){
         /* Manage error */
         return SomeErrorHandler( err )
    }
    /* Data returned from executed function */
    console.log( JSON.stringify( data ) )
})

// .. Or as a Promise
StackObj.execIdx( 3, 'John', 'Doe' )
    .then( data => /* Data returned from executed function */ )
    .catch( err => /* Manage error */ )
```

### Credits
- [node-strict](https://github.com/cpsubrian/node-stact)
- [node-stact-hooks](https://github.com/cpsubrian/node-stact-hooks)
- [BluebirdJS](http://bluebirdjs.com/docs/getting-started.html)