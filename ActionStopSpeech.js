/*\
title: $:/plugins/inmysocks/TiddlyTalking/action-stopspeech.js
type: application/javascript
module-type: widget

Action widget to stop any speech started by action-readtiddler

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var Widget = require("$:/core/modules/widgets/widget.js").widget;

var StopSpeech = function(parseTreeNode,options) {
	this.initialise(parseTreeNode,options);
};

/*
Inherit from the base widget class
*/
StopSpeech.prototype = new Widget();

/*
Render this widget into the DOM
*/
StopSpeech.prototype.render = function(parent,nextSibling) {
	this.computeAttributes();
	this.execute();
};

/*
Compute the internal state of the widget
*/
StopSpeech.prototype.execute = function() {
  $tw.speechSynthesis = window.speechSynthesis;
};

/*
Refresh the widget by ensuring our attributes are up to date
*/
StopSpeech.prototype.refresh = function(changedTiddlers) {
	var changedAttributes = this.computeAttributes();
	if(changedAttributes["tiddler"]) {
		this.refreshSelf();
		return true;
	}
	return this.refreshChildren(changedTiddlers);
};

/*
Invoke the action associated with this widget
*/
StopSpeech.prototype.invokeAction = function(triggeringWidget,event) {
  $tw.speechSynthesis.cancel();
	return true; // Action was invoked
};

exports["action-stopspeech"] = StopSpeech;

})();
