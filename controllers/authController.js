const passport = require('passport');

exports.login = passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: 'Failed login!',
  successRedirect: '/',
  successFlash: 'Successful login!'
})

exports.logout = (req,res) => {
  req.logout();
  req.flash('success', 'You are now logged out');
  res.redirect('/');
}
