const fetch = require('node-fetch');

const catFacts = async (req, res) => {
  const response = await fetch('https://cat-fact.herokuapp.com/facts');
  const body = await response.json();
  const facts = body.map(({ text, createdAt}) => ({
    text,
    createdAt,
  }));

  res.send(facts);
}

module.exports = catFacts;