import {readUser} from "../localStorage/userOperations.js";

readUser((err, user) => {
	if (err) {
		console.log(user);
	} else {
		window.location.href = "https://boojo.bitfrost.app/success";
	}
});
