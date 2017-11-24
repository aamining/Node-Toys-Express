const util = require('util');
const Toy = require('../models/toy');

module.exports = class ToysController {
  index(req, res) {
    Toy.find()
      .then(toys => { console.log(util.inspect(toys)); res.render('toys/index', { toys: toys })})
      .catch(err => { res.render('toys/index', { error: 'not foound '})})
  }

  show(req, res) {
    res.send(`GET toys#show id=${req.params.id}\n`);
  }

  new(req, res) {
    res.render('toys/new');
  }

  create(req, res) {
    const toy = new Toy(req.body.toy);
    const fault = (err) => res.status(400);
    const redirect = (toy) => res.redirect('/toys');
    toy.save().then(redirect).catch(fault);
  }
}
