var App = function() {
	this.init();
};

App.prototype.init = function() {
	
	this.$ = {};
	this.$.body = $('body');

	this.initPage();
};

App.prototype.initPage = function() {

	if ($("#admin").length) {
		this.page = new Admin();
	}
};