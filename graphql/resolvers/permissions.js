const {
  permissionGet,
  permissionsGet
} = require('../../postgres/queries/permissions')

const { permissionsCheck } = require('./_permissions')

const resolvers = {
  async permissions(_, context) {
    if (permissionsCheck(context.user, ['super', 'admin'])) {
      return permissionsGet({
        ordreMax: context.user ? context.user.permission.ordre : null
      })
    }

    return null
  },
  async permission({ id }, context) {
    return permissionGet(id)
  }
}

module.exports = resolvers
