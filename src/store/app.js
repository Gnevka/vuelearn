import Http from '../utils/http'
const state = {
  apiUrl: 'http://185.87.193.167/index.php',
  users: [],
  roles: [],
  permissions: [],
  userStatuses: [],
}
const getters = {
  apiUrl: state => state.apiUrl,
  users: state => state.users,
  roles: state => state.roles,
  permissions: state => state.permissions,
  userStatuses: state => state.userStatuses,
  all: state => state.userStatuses + state.permissions,
}
const mutations = {
  setUsers: (state, users) => {
    state.users = users
  },
  setRoles: (state, roles) => {
    state.roles = roles
  },
  setPermissions: (state, permissions) => {
    state.permissions = permissions
  },
  setPermission: (state, permission, name) => {
    for (let i = 0 ; i < state.permissions.length; i++) {
      if (state.permissions[i].name == name) {
        state.permissions[i] = permission
      }
    }
  },
  setRole: (state, role, name) => {
    for (let i = 0 ; i < state.roles.length; i++) {
      if (state.roles[i].name == name) {
        state.roles[i] = role
      }
    }
  },
  addPermission: (state, permissions) => {
    state.permissions = permissions
  },
  setUserStatus: (state, statuses) => {
    state.userStatuses = statuses
  },
}

const actions = {
  getUsers: ({commit}) => {
    return new Promise((resolve) => {
      Http.get(state.apiUrl + '/user')
        .then(resp => {
          commit('setUsers', resp.data)
          resolve(resp)
        })
    })
  },
  getRoles: ({commit}) => {
    return new Promise((resolve) => {
      Http.get(state.apiUrl + 'role')
        .then(resp => {
          commit('setRoles', resp.data)
          resolve(resp)
        })
    })
  },
  createRole: ({dispatch}, roleName) => {
    return new Promise((resolve) => {
      Http.post(state.apiUrl + 'role/create', {name: roleName, description: roleName})
        .then(resp => {
          dispatch('getRoles')
          resolve(resp)
        })
    })
  },
  updateRole: ({commit}, role) => {
    let name = role.oldName
    return new Promise((resolve) => {
      Http.post(state.apiUrl + 'role/update', role)
        .then(resp => {
          commit('setRole', resp.data, name)
          resolve(resp)
        })
    })
  },
  deleteRole: ({dispatch}, name) => {
    return new Promise((resolve) => {
      Http.post(state.apiUrl + 'role/delete', {name: name})
        .then(resp => {
          dispatch('getRoles')
          resolve(resp)
        })
    })
  },
  getPermissions: ({commit}) => {
    return new Promise((resolve) => {
      Http.get(state.apiUrl + 'role/permissions')
        .then(resp => {
          commit('setPermissions', resp.data)
          resolve(resp)
        })
    })
  },
  createPermissions: ({dispatch}, permissionName) => {
    return new Promise((resolve) => {
      Http.post(state.apiUrl + 'role/createpermission', {name: permissionName, description: permissionName})
        .then(resp => {
          dispatch('getPermissions')
          resolve(resp)
        })
    })
  },
  updatePermission: ({commit}, permission) => {
    let name = permission.oldName
    return new Promise((resolve) => {
      Http.post(state.apiUrl + 'role/update', permission)
        .then(resp => {
          commit('setPermission', resp.data, name)
          resolve(resp)
        })
    })
  },
  deletePermission: ({dispatch}, name) => {
    return new Promise((resolve) => {
      Http.post(state.apiUrl + 'role/delete', {name: name})
        .then(resp => {
          dispatch('getPermissions')
          resolve(resp)
        })
    })
  },
  getUserStatuses: ({commit}) => {
    return new Promise((resolve) => {
      Http.get(state.apiUrl + '/auth/dictionary')
        .then(resp => {
          commit('setUserStatus', resp.data.userState)
          resolve(resp)
        })
    })
  },
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}