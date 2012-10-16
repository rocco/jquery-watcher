What is it?
-----------
This is a jQuery Plugin that "watches" the result of a function applied to the selected element.
If the return value of this function changes a callback function is executed.

Example Use
-----------
	// watch a div for changes in its height
	$('#somediv').watch(
		'heightchange', 
		function(){
			return $(this).height();
		},
		function(){
			alert('new height detected: ' + $(this).height());
		},
		100
	);

	// later unwatch this
	$('#somediv').unwatch('heightchange');