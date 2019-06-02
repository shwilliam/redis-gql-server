export default {
  Query: {
    get: (parent, {key}, {client}) => {
      try {
        return client.getAsync(key)
      } catch (e) {
        console.error(e)
        return null
      }
    },
  },
  Mutation: {
    set: async (parent, {key, value}, {client}) => {
      try {
        await client.set(key, value)
        return true
      } catch (e) {
        console.error(e)
        return false
      }
    },
  },
}
