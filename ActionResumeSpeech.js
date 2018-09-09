/*\
title: $:/plugins/OokTech/TiddlyTalking/action-resumespeech.js
type: application/javascript
module-type: widget

Action widget to pause any speech paused by action-pausespeech

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var Widget = require("$:/core/modules/widgets/widget.js").widget;

var ResumeSpeech = function(parseTreeNode,options) {
	this.initialise(parseTreeNode,options);
};

/*
Inherit from the base widget class
*/
ResumeSpeech.prototype = new Widget();

/*
Render this widget into the DOM
*/
ResumeSpeech.prototype.render = function(parent,nextSibling) {
	this.computeAttributes();
	this.execute();
};

/*
Compute the internal state of the widget
*/
ResumeSpeech.prototype.execute = function() {
  $tw.speechSynthesis = window.speechSynthesis;
};

/*
Refresh the widget by ensuring our attributes are up to date
*/
ResumeSpeech.prototype.refresh = function(changedTiddlers) {
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
ResumeSpeech.prototype.invokeAction = function(triggeringWidget,event) {
  $tw.speechSynthesis.resume();
	return true; // Action was invoked
};

exports["action-resumespeech"] = ResumeSpeech;

})();
