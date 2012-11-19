What is it?
-----------
This is a jQuery Plugin that "watches" the result of a function applied to the selected element. 
If the return value of this function changes a callback function is executed.

You can for example watch changes in an element's CSS properties like it's height or if it has a background image set.

Example Use
-----------
	// watch an element for height change
	$('#somediv').watch(

		// your name for this watcher (for future reference)
		'heightchange', 

		// watcher function (if this the return value changes  fire the watcher action is executed)
		function(){
			return $(this).height();
		},

		// the watcher action function (executed when watcher function return changes)
		function(){
			alert('#somediv has a new height: ' + $(this).height());
		},

		// interval in ms (watcher function is executed this often)
		100
	);

	// later unwatch this watcher (here you need the watcher name from above)
	$('#somediv').unwatch('heightchange');
