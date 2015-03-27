
// check if there is a user session saved already
var aUser = Alloy.createModel('User');
if (aUser.authenticated()) {
	// rehydrate the user
	aUser.showMe().then(function(_user) {
		userLoggedIn(_user);
	}, function(_error) {
		alert("Application Error\n " + _response.error.message);
		Ti.API.error(JSON.stringify(_response.error, null, 2));
		// go ahead and do the login
		userNotLoggedIn();
	});
} else {
	userNotLoggedIn();
}

/**
 * 
 */
function userLoggedIn(_user) {
		
	if ( !$.alreadyOpenedIndex ) {
		// start the application
		$.mainWindow.open();
		
		$.alreadyOpenedIndex = true;
	}
	
	Alloy.Globals.CURRENT_USER = _user;
	
	// set button title with name to show we are logged in
	$.logoutBtn.title = "Logout: " + _user.get("username");
	
}
/**
 *
 */
function userNotLoggedIn() {
	// display login information
	var ctrl = Alloy.createController('User', {
		callback : function(_user) {
			
			userLoggedIn(_user);
			
			// close the old window
			ctrl.getView().close();
		}
	});

	ctrl.getView().open();
}

/**
 * 
 */
function doLogout() {
	if (Alloy.Globals.CURRENT_USER) {
		Alloy.Globals.CURRENT_USER.logout().then(function(_model){
			Alloy.Globals.CURRENT_USER = null;
			console.log("logged out!");
			
			// display login window
			userNotLoggedIn();
			
		}, function(_error){
			alert(_error.message);
		});
	}
}
