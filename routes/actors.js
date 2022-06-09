var express = require('express');
var router = express.Router();

const get = async (req, res, next) => {
  try {
    const getUsers = await knex('actors')
      .modify((q) => {
        if (req.query?.where?.name) {
          const { name } = req.query?.where
          const keys = Object.keys(name)
          for (const key of keys) {
            if (key === 'in') {
              q.whereIn('name', name.in.split(','))
            }
            if (key === 'like') {
              q.where('name', 'ilike', `%${name.like}%`)
            }
          }
        }
        if (req.query?.where?.actor_id) {
          const { actor_id } = req.query?.where
          const keys = Object.keys(actor_id)
          for (const key of keys) {
            if (key === 'in') {
              q.whereIn('actor_id', actor_id.in.split(','))
            }
            if (key === 'like') {
              q.where('actor_id', 'ilike', `%${actor_id.like}%`)
            }
          }
        }
      })
    res.json(getUsers)
  } catch ({ code, message }) {
    res.json({ code, message })
  }
}
const filmTerbaik = async (req, res, next) => {
  // select * from content_actors ca
  // inner join actors a ON ca.actor_id = a.actor_id 
  // inner  join contents c on ca.content_id = c.content_id 
  // where c.imdb_score > 9
  // order by imdb_score desc
  req.json('tampilkan film terbaik')
}

module.exports = {
  get,
  filmTerbaik
};
