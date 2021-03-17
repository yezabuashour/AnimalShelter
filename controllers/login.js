const redirectToLogin = (req, res) => {
    return res.redirect('http://localhost:1812/login');
}

module.exports = {
    redirectToLogin
};