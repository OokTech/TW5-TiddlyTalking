/*\
title: $:/plugins/inmysocks/TiddlyTalking/action-pauseresumespeech.js
type: application/javascript
module-type: widget

Action widget to pause any speech started by action-readtiddler, this same widget will also resume the speech if it is triggered while speech is paused.

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var Widget = require("$:/core/modules/widgets/widget.js").widget;

var PauseResumeSpeech = function(parseTreeNode,options) {
	this.initialise(parseTreeNode,options);
};

/*
Inherit from the base widget class
*/
PauseResumeSpeech.prototype = new Widget();

/*
Render this widget into the DOM
*/
PauseResumeSpeech.prototype.render = function(parent,nextSibling) {
	this.computeAttributes();
	this.execute();
};

/*
Compute the internal state of the widget
*/
PauseResumeSpeech.prototype.execute = function() {
  $tw.speechSynthesis = window.speechSynthesis;
};

/*
Refresh the widget by ensuring our attributes are up to date
*/
PauseResumeSpeech.prototype.refresh = function(changedTiddlers) {
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
PauseResumeSpeech.prototype.invokeAction = function(triggeringWidget,event) {
  if ($tw.speechSynthesis.paused) {
    $tw.speechSynthesis.resume();
  } else {
    $tw.speechSynthesis.pause();
  }
	return true; // Action was invoked
};

exports["action-pauseresumespeech"] = PauseResumeSpeech;

})();
