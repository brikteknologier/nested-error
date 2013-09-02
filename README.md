NestedError
===========

`NestedError` is an `Error` class useful for wrapping another `Error` to get a
better stack trace associated with it.

This can be very helpful, especially when the original `Error` is created
close to node's internal event loop.


Usage
-----

First, install `NestedError`: `npm install nested-error`

Then make use of it like in this illustrative example:

    var net = require('net');
    var NestedError = require('nested-error');

    // This function is our program:
    function listen(callback) {
      // Connect to a nonexistent UNIX domain socket to
      // cause an error in the net module:
      var server = net.connect({ "path": "nonexistent" });

      server.on('error', function (err) {
        // Wrap the error message we get in a NestedError
        // to attach a stack trace that goes here
        callback(new NestedError(err));
      });
    }


    // This should give an error callback
    listen(function (err) {
      if (err) {
        // Write out both stack traces for comparison:
        console.error(err.stack);
        console.error("\nCompare to inner exception:");
        console.error(err.innerException.stack);
        console.error("\nConclude that NestedError lets you debug easier :)");
      }
    });

This program will output the stack traces for both the error object we got
from node's net module and the `NestedError` we created. The `NestedError`
gives a much better context to be able to debug the problem.
