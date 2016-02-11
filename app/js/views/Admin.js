var Admin = function() {
	this.init();
};

Admin.prototype.init = function() {
	
	this.$ = {};
	this.$.body = $('body');
	this.$.form = this.$.body.find('form');

};

Admin.prototype.initEvents = function() {
	
	// var that = this;

	// this.$.form.on('submit', function(e) {
	// 	e.preventDefault();
	// });

};

Admin.prototype.handleErrors = function(e) {
	e.preventDefault();
};
