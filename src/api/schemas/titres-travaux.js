export default `
type TitreTravauxRapport {
  id: ID!
  titreId: ID!
  date: Date!
  confirmation: Boolean
  contenu: Json
}

input InputTitreTravauxRapport {
  id: ID!
  titreId: ID!
  date: Date!
  confirmation: Boolean
  contenu: Json
}`
