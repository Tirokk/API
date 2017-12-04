const _ = require('lodash');
const seedHelpers = require('../../helper/seed-helpers');

module.exports = (seederstore) => {
  return {
    services: [{
      count: _.keys(seederstore.contributions).length * 3,
      path: 'comments',
      templates: [
        {
          userId: () => seedHelpers.randomItem(seederstore.users)._id,
          contributionId: () => seedHelpers.randomItem(seederstore.contributions)._id,
          content: '{{lorem.text}} {{lorem.text}}',
          language: 'de_DE',
          createdAt: '{{date.recent}}',
          updatedAt: '{{date.recent}}'
        }
      ]
    }]
  };
};