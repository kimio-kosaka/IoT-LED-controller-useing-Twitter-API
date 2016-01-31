// include modules
var twitter = require('twitter');
var five = require("johnny-five");
var board = new five.Board();

// use keys secrets in config.js
var client = new twitter(require('./config.js'));

board.on("ready", function() {
    // Create an Led on pin 13
    var led = new five.Led(13);
 
    // get timeline text by public APIのstatuses/filter and filtering by '@your accont'
    client.stream( 'statuses/filter', { track : '@your account' }, function( stream ) {     
        stream.on( 'data', function( data ) {
            var text = data.text; 
            console.log( text );
            if ( /\[ON\]/.test(text) ) {    //check and do [ON] command
                led.stop();
                led.on();          
            }
            if ( /\[OFF\]/.test(text) ) {    //check and do [OFF] command
                led.stop();
                led.off();          
            }
            if ( /\[BLINK\]/.test(text) ) {    //check and do [BLINK] command
                led.blink(500);
            }
            if ( /\[STOP\]/.test(text) ) {    //check and do [STOP] command
                led.stop();
                led.off();
            }
        });
    });
});