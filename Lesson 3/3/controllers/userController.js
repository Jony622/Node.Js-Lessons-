const userMainPage = (req, res) => {
    res.render('index')
}

const download = (req, res) => {
    res.download('./secret.jpeg')
}

module.exports = { userMainPage,download }