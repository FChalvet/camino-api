const chalk = require('chalk')
const seeding = require('../seeding')

const domaines = ['c', 'f', 'g', 'h', 'm', 'r', 's', 'w']

const entreprises = domaines.reduce((acc, domaine) => {
  acc.push(...require(`../../sources/entreprises-titres-${domaine}`))

  return acc
}, [])

const entreprisesEtablissements = domaines.reduce((acc, domaine) => {
  acc.push(
    ...require(`../../sources/entreprises-titres-${domaine}-etablissements`)
  )

  return acc
}, [])

const administrations = require('../../sources/administrations.json')
const administrationsTypes = require('../../sources/administrations-types.json')
const administrationsDomaines = require('../../sources/administrations--domaines.json')

const findDuplicates = (array, key1) =>
  array.reduce((res, el) => {
    if (el[key1][0] === 'F') console.log('majuscule', el)

    if (res.find(e => e[key1] === el[key1])) {
      console.log(
        chalk.red(
          `erreur: entreprise en doublon (à supprimer dans la source): ${el[key1]}`
        )
      )
    } else {
      res.push(el)
    }

    return res
  }, [])

const findMissing = (elements, relations, field1, field2) =>
  relations.forEach(r => {
    if (!elements.find(e => r[field2] === e[field1])) {
      throw new Error(`Missing: ${field1} <-> ${field2} = "${r[field2]}"`)
    }
  })

const entr = findDuplicates(entreprises, 'id')

findMissing(entreprises, entreprisesEtablissements, 'id', 'entreprise_id')
findMissing(administrationsTypes, administrations, 'id', 'type_id')

exports.seed = seeding(async ({ del, insert }) => {
  await Promise.all([del('entreprisesEtablissements'), del('administrations')])
  await del('entreprises')

  await Promise.all([
    insert('entreprises', entr),
    insert('administrations_types', administrationsTypes)
  ])
  await insert('administrations', administrations)
  await insert('administrations__domaines', administrationsDomaines)
  await insert('entreprisesEtablissements', entreprisesEtablissements)
})
