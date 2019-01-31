import Utilisateurs from '../models/utilisateurs'
import options from './_options'

const utilisateurGet = async id =>
  Utilisateurs.query()
    .findById(id)
    .eager(options.utilisateurs.eager)

const utilisateurByEmailGet = async email =>
  Utilisateurs.query()
    .where('email', email)
    .eager(options.utilisateurs.eager)
    .first()

const utilisateursGet = async ({
  noms,
  entrepriseIds,
  administrationIds,
  permissionIds
}) => {
  const q = Utilisateurs.query()
    .skipUndefined()
    .eager(options.utilisateurs.eager)
    .whereIn('utilisateurs.administrationId', administrationIds)
    .whereIn('utilisateurs.entrepriseId', entrepriseIds)
    .whereIn('utilisateurs.permissionId', permissionIds)

  if (noms) {
    q.whereRaw(`lower(??) ~* ${noms.map(n => '?').join('|')}`, [
      'utilisateurs.nom',
      ...noms.map(n => n.toLowerCase())
    ])
  }

  return q
}

const utilisateurAdd = async utilisateur =>
  Utilisateurs.query()
    .insertGraph(utilisateur, options.utilisateurs.update)
    .eager(options.utilisateurs.eager)
    .first()

const utilisateurRemove = async id =>
  Utilisateurs.query()
    .deleteById(id)
    .first()
    .returning('*')

const utilisateurUpdate = async utilisateur =>
  Utilisateurs.query()
    .upsertGraphAndFetch(utilisateur, options.utilisateurs.update)
    .eager(options.utilisateurs.eager)

export {
  utilisateurGet,
  utilisateurByEmailGet,
  utilisateursGet,
  utilisateurAdd,
  utilisateurRemove,
  utilisateurUpdate
}
