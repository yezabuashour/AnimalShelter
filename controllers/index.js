// temp landing page, not needed for api
const homeAsync = async (req, res) => {
    return res.send('Home Sweet Home');
};

module.exports = {
    homeAsync
};