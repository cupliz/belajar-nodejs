var express = require('express');

const queryByColumn = (where, column, query) => {
  const keys = Object.keys(where[column])
  if (typeof where[column] === 'string') {
    query.where(column, where[column])
  } else {
    for (const key of keys) {
      if (key === 'in') {
        query.whereIn(column, where[column][key].split(','))
      }
      if (key === 'like') {
        query.where(column, 'ilike', `%${where[column][key]}%`)
      }
      if (key === 'gt') {
        query.where(column, '>', where[column][key])
      }
      if (key === 'lt') {
        query.where(column, '<', where[column][key])
      }
    }
  }
}
const get = async (req, res, next) => {
  try {
    const janganBuka = ['id']
    let allow = false
    if (req.query?.where) {
      for (const key of Object.keys(req.query?.where)) {
        if (!janganBuka.includes(key)) {
          allow = true
        } else {
          allow = false
          throw "Jangan dibuka"
        }
      }
    }
    const getUsers = await req.db('contents')
      .modify((q) => {
        if (req.query?.where && allow) {
          for (const key of Object.keys(req.query?.where)) {
            queryByColumn(req.query.where, key, q)
          }
        }
      })
    const newData = getUsers.map(x => {
      delete x.title
      return x
    })
    res.status(500).json(newData)
  } catch (error) {
    if (error.code) {
      res.json({ code: error.code, message: error.message })
    } else {
      res.status(500).json({ code: 400, message: error })
    }
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
