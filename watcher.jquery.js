/* This program is free software. It comes without any warranty, to
 * the extent permitted by applicable law. You can redistribute it
 * and/or modify it under the terms of the Do What The Fuck You Want
 * To Public License, Version 2, as published by Sam Hocevar. See
 * http://sam.zoy.org/wtfpl/COPYING for more details. */

(function($){
	/*
	 * The Watcher (Things just ain't the same for gangstas)
	 * "Watches" the result of a function applied to the selected element.
	 * If the return value of this function changes a callback function is executed.
	 * 
	 * @param string watcherName is a name for this watcher, used to unwatch()
	 * @param function watchValFunc is function returning the watched value
	 * @param function callBack is a callback function to be executed whenever the value has changes
	 * @param integer timeoutVal is the amount of milliseconds the watcher waits until checking again
	 * 
	 * @return selected element(s)
	 */
	$.fn.watch = function(watcherName, watchValFunc, callBack, timeoutVal){
		return $(this).each(function(){
			var 
				// the currently worked on object
				self = this,
				// result of the watcher value function
				currentValue = watchValFunc.apply(self),
				// stores the former value
				oldValue = currentValue,
				// stores the timer
				localTimer,
				// default timer value
				timeoutValue = typeof timeoutVal === 'undefined' ? 50 : timeoutVal;

			// local function for setInterval executing watcher value function
			function localWatch(){
				currentValue = watchValFunc.apply(self);
				if($(self).data(watcherName + '-watch-abort') === true){
					window.clearInterval(localTimer);
					$(self).data(watcherName + '-watch-abort', null);
					return;
				}
				// if watcher function return value has changed call callBack
				if(currentValue !== oldValue){
					oldValue = currentValue;
					callBack.call(self);
				}
			}
			// execute localWatch every timeoutVal ms
			localTimer = window.setInterval(localWatch, timeoutVal);
		});
	};

	/*
	 * The Unwatcher
	 * Removes a watcher given by name from the selected element.
	 * 
	 * @param string watcherName is the name of the watcher to be removed
	 * 
	 * @return selected element(s)
	 */
	$.fn.unwatch = function(watcherName){
		return $(this).each(function(){
			$(this).data(watcherName + '-watch-abort', true);
		});
	};

})(jQuery);