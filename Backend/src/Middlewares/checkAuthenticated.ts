const checkAuthenticated = (req: any, res: any, next: any) => {
	if (req.session && req.session.user || req.session.passport) {
		// res.json({ loggedIn: true, user: req.session.user ? req.session.user : req.session.passport.user});
		next();
	} else {
		res.json({ loggedIn: false });
	}
};

export default checkAuthenticated;
