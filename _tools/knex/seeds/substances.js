const substances = require('../../sources/substances.json')
const substancesLegals = require('../../sources/substances-legals.json')

exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return Promise.all([
    knex('substances').del(),
    knex('substances_legals').del()
  ]).then(() => {
    // Inserts seed entries
    return Promise.all([
      knex('substances').insert(substances),
      knex('substances_legals').insert(substancesLegals)
    ])
  })
}