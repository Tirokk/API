module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function (hook) {
    return new Promise(resolve => {
      const notificationService = hook.app.service('notifications');
      const contributionService = hook.app.service('contributions');

      const commentId = hook.result._id;
      const contributionId = hook.result.contributionId;

      contributionService.get(contributionId)
        .then(result => {
          const userId = result.userId;
          let username = hook.result.user.username;
          username = username !== undefined ? username : 'Someone';

          // Only create notification for other users
          if(userId == hook.result.userId) {
            resolve(hook);
            return false;
          }

          const notification = {
            userId: userId,
            message: `${username} has commented your contribution.`,
            relatedContributionId: contributionId,
            relatedCommentId: commentId,
          };

          notificationService.create(notification)
            .then(resolve(hook))
            .catch(() => {
              resolve(hook);
            });
        })
        .catch(() => {
          resolve(hook);
        });
    });
  };
};
