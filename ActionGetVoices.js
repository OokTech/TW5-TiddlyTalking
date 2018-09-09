/*\
title: $:/plugins/OokTech/TiddlyTalking/action-getvoices.js
type: application/javascript
module-type: widget

Action widget to get a list of available voices

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var Widget = require("$:/core/modules/widgets/widget.js").widget;

var GetVoices = function(parseTreeNode,options) {
	this.initialise(parseTreeNode,options);
};

/*
Inherit from the base widget class
*/
GetVoices.prototype = new Widget();

/*
Render this widget into the DOM
*/
GetVoices.prototype.render = function(parent,nextSibling) {
	this.computeAttributes();
	this.execute();
};

/*
Compute the internal state of the widget
*/
GetVoices.prototype.execute = function() {
	this.stateTiddler = this.getAttribute("state", "$:/settings/VoicesList");

  $tw.speechSynthesis = window.speechSynthesis;
};

/*
Refresh the widget by ensuring our attributes are up to date
*/
GetVoices.prototype.refresh = function(changedTiddlers) {
	var changedAttributes = this.computeAttributes();
	if(changedAttributes["state"]) {
		this.refreshSelf();
		return true;
	}
	return this.refreshChildren(changedTiddlers);
};

/*
Invoke the action associated with this widget
*/
GetVoices.prototype.invokeAction = function(triggeringWidget,event) {
	var tiddler = this.wiki.getTiddler(this.stateTiddler);

  var voices = $tw.speechSynthesis.getVoices();
  var voiceInfo = {};
  var nameList = [];
  var langList = [];
  for (var i = 0; i < voices.length; i++) {
    var label = voices[i].name + " (" + voices[i].lang + ")";
    //nameList.push(voices[i].name);
    nameList.push(label);
    //langList.push(voices[i].lang);
  }
  this.wiki.setText(this.stateTiddler,'name_list',undefined,$tw.utils.stringifyList(nameList));
  //this.wiki.setText(this.stateTiddler,'lang_list',undefined,$tw.utils.stringifyList(langList));
	return true; // Action was invoked
};

exports["action-getvoices"] = GetVoices;

})();
