const checkAuthenticated = (req: any, res: any, next: any) => {
	if (req.session && req.session.user) {
		next();
	} else {
		res.redirect('/users/signin')
	}
};

export default checkAuthenticated;