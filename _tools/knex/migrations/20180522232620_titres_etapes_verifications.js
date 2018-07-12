exports.up = knex => {
  return knex.schema
    .createTable('verifications', table => {
      table.enum('id', ['ver', 'err', 'inc']).primary()
      table.string('nom', 32).notNullable()
      table.string('couleur', 16).notNullable()
    })
    .createTable('titres_verifications', table => {
      table
        .string('titre_etape_id', 128)
        .primary()
        .references('titres_etapes.id')
        .notNullable()
        .onDelete('CASCADE')
      table.boolean('date')
      table.boolean('duree')
      table.boolean('surface')
      table.boolean('points')
      table.boolean('points_securite')
      table.boolean('substances')
      table.boolean('titulaires')
      table.boolean('amodiataires')
      table.boolean('administrations')
    })
}

exports.down = knex => {
  return knex.schema
    .dropTable('titres_verifications')
    .dropTable('verifications')
}