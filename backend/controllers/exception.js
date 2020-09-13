const db = require('../database/connection');

module.exports = {
  async index(request, response) {
    try {
      const data = await db('exceptions').select('*');

      return response.status(200).json(data);
    } catch (error) {
      console.log(error);
      return response.status(400).json({ error });
    }
  },

  async store(request, response) {
    const { from, to } = request.body;

    try {
      await db('exceptions').insert({ from: from.toLowerCase(), to });
    } catch (error) {
      return response.status(400).json({ error });
    }

    return response.status(201).send();
  },
};
