const homeController = {
  home(req, res) {
    res.send(
      `<div style="text-align: center;">
              <h1>Welcome to the Api</h1>
              <h4>Developed By M. H. Nahib</h4>
            </div>`
    );
  },
};

module.exports = homeController;
