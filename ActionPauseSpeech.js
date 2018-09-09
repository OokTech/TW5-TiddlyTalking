/*\
title: $:/plugins/OokTech/TiddlyTalking/action-pausespeech.js
type: application/javascript
module-type: widget

Action widget to pause any speech started by action-readtiddler

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var Widget = require("$:/core/modules/widgets/widget.js").widget;

var PauseSpeech = function(parseTreeNode,options) {
	this.initialise(parseTreeNode,options);
};

/*
Inherit from the base widget class
*/
PauseSpeech.prototype = new Widget();

/*
Render this widget into the DOM
*/
PauseSpeech.prototype.render = function(parent,nextSibling) {
	this.computeAttributes();
	this.execute();
};

/*
Compute the internal state of the widget
*/
PauseSpeech.prototype.execute = function() {
  $tw.speechSynthesis = window.speechSynthesis;
};

/*
Refresh the widget by ensuring our attributes are up to date
*/
PauseSpeech.prototype.refresh = function(changedTiddlers) {
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
PauseSpeech.prototype.invokeAction = function(triggeringWidget,event) {
  $tw.speechSynthesis.pause();
	return true; // Action was invoked
};

exports["action-pausespeech"] = PauseSpeech;

})();
