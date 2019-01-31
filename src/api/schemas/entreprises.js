export default `
type Entreprise {
  id: ID!
  nom: String
  raisonSociale: String
  paysId: String
  legalSiren: String
  legalEtranger: String
  legalForme: String
  voieNumero: String
  voieType: String
  voieNom: String
  adresseComplement: String
  codePostal: Int
  ville: String
  cedex: Int
  url: String
  telephone: String
  email: String
  utilisateurs: [Utilisateur]
}

input InputEntreprise {
  id: ID!
  nom: String
  raisonSociale: String
  paysId: String
  legalSiren: String
  legalEtranger: String
  legalForme: String
  voieNumero: String
  voieType: String
  voieNom: String
  adresseComplement: String
  codePostal: Int
  ville: String
  cedex: Int
  url: String
  telephone: String
  email: String
  utilisateurs: [InputUtilisateur]
}`
