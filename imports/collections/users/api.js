import Api from '../../utils/api';

Api.addCollection(Meteor.users, {
  excludedEndpoints: ['getAll', 'put', 'patch'],
  routeOptions: {
    authRequired: true
  },
  endpoints: {
    post: {
      authRequired: false
    },
    delete: {
      roleRequired: 'admin'
    }
  }
});