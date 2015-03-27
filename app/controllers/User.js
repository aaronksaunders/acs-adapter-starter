var args=arguments[0]|| {};
// function to call after login or user created
var callback=args.callback;
/**
 *
 */
function handleLoginClick(_event) {

	Ti.API.debug('clicked: '+_event.source.id);

	var aUser = Alloy.createModel('User');
	aUser.login($.login_email.value, $.login_password.value).then(function(_model){
        // Do stuff after successful login.
        Alloy.Globals.loggedIn = true;
        Alloy.Globals.CURRENT_USER = _model;
        callback && callback(_model);			
	},function(_error){
		var errorMsg = JSON.stringify(_error);
		alert(_error.message);
		Ti.API.error('Error: ' +errorMsg);
	});
}
/**
 *
 */
function handleShowAcctClick(_event) {
		
	Ti.API.debug('clicked: '+_event.source.id);
	
	var animation = require('alloy/animation');

	// when move the create account screen into view
	var moveToTop = Ti.UI.createAnimation({
		top: '0dp',
		duration: 1
	});
	$.createAcctView.animate(moveToTop, function(){

		// now cross fade
		animation.crossFade($.loginAcctView, $.createAcctView, 500, function(){
			// when done animating, move the view off screen
			var moveToBottom = Ti.UI.createAnimation({
    			top: '500dp',
    			duration: 1
			});
			$.loginAcctView.animate(moveToBottom);
		});
	});
}

/**
*
*/
function handleCreateAccountClick() {

}
/**
 *
 * @param {Object} _event
 */
function handleShowLoginClick(_event) {
		
	Ti.API.debug('clicked: '+_event.source.id);
	
	var animation = require('alloy/animation');

	// when move the login screen into view
	var moveToTop = Ti.UI.createAnimation({
		top: '0dp',
		duration: 1
	});
	$.loginAcctView.animate(moveToTop, function(){

		// now cross fade
		animation.crossFade($.createAcctView, $.loginAcctView, 500, function(){
			// when done animating, move the view off screen
			var moveToBottom = Ti.UI.createAnimation({
    			top: '500dp',
    			duration: 1
			});
			$.createAcctView.animate(moveToBottom);
		});
	});
}
