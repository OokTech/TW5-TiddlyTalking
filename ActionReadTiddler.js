/*\
title: $:/plugins/OokTech/TiddlyTalking/action-readtiddler.js
type: application/javascript
module-type: widget

Action widget to read the rendered text of a tiddler

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var Widget = require("$:/core/modules/widgets/widget.js").widget;

var ReadTiddler = function(parseTreeNode,options) {
	this.initialise(parseTreeNode,options);
};

/*
Inherit from the base widget class
*/
ReadTiddler.prototype = new Widget();

/*
Render this widget into the DOM
*/
ReadTiddler.prototype.render = function(parent,nextSibling) {
	this.computeAttributes();
	this.execute();
};

/*
Compute the internal state of the widget
*/
ReadTiddler.prototype.execute = function() {
	this.tiddler = this.getAttribute("tiddler");
	this.stateTiddler = this.getAttribute("state", "$:/settings/VoicesList");

  $tw.speechSynthesis = window.speechSynthesis;
};

/*
Refresh the widget by ensuring our attributes are up to date
*/
ReadTiddler.prototype.refresh = function(changedTiddlers) {
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
ReadTiddler.prototype.invokeAction = function(triggeringWidget,event) {
	var tiddler = this.wiki.getTiddler(this.tiddler);
  // Create the parse tree
	this.wikifyParser = this.wiki.parseText('text/vnd.tiddlywiki',tiddler.fields.text,{
			parseAsInline: true
		});
	// Create the widget tree
	this.wikifyWidgetNode = this.wiki.makeWidget(this.wikifyParser,{
			document: $tw.fakeDocument,
			parentWidget: this
		});
	// Render the widget tree to the container
	this.wikifyContainer = $tw.fakeDocument.createElement("div");
	this.wikifyWidgetNode.render(this.wikifyContainer,null);

  var msg = new SpeechSynthesisUtterance(this.wikifyContainer.textContent);
	var settingsTiddler = this.wiki.getTiddler("$:/settings/VoicesList");
	if (settingsTiddler) {
		if (settingsTiddler.fields.selected_voice) {
			var voices = $tw.speechSynthesis.getVoices();
			msg.voice = voices[$tw.utils.parseStringArray(settingsTiddler.fields.name_list).indexOf(settingsTiddler.fields.selected_voice)];
		}
	}
	msg.onboundary = function(event) {
		var wordStart = event.charIndex;
		if ((event.currentTarget.text.slice(event.charIndex).indexOf('\n') !== -1 && (event.currentTarget.text.slice(event.charIndex).indexOf('\n') < event.currentTarget.text.slice(event.charIndex).indexOf(' ') || event.currentTarget.text.slice(event.charIndex).indexOf(' ') === -1))) {
			var wordEnd = event.currentTarget.text.slice(event.charIndex).indexOf('\n')+event.charIndex;
		} else {
			var wordEnd = (event.currentTarget.text.slice(event.charIndex).indexOf(' ') !== -1)?event.currentTarget.text.slice(event.charIndex).indexOf(' ')+event.charIndex:event.currentTarget.text.length;
		}
		$tw.wiki.setText("$:/settings/VoicesList",'current_word',undefined,event.currentTarget.text.slice(wordStart,wordEnd));
		$tw.wiki.setText("$:/settings/VoicesList",'before_word',undefined,event.currentTarget.text.slice(0,wordStart));
		$tw.wiki.setText("$:/settings/VoicesList",'after_word',undefined,event.currentTarget.text.slice(wordEnd));
	};
  $tw.speechSynthesis.speak(msg);
	return true; // Action was invoked
};

exports["action-readtiddler"] = ReadTiddler;

})();
