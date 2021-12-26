const userService = require("../services/user");

const requireAuthentication = async (ctx, next) => {
  const {
    authorization,
  } = ctx.headers;

  const {
    authToken,
    ...session
  } = await userService.checkAndParseSession(authorization);

  // Save the decoded session data in the current context's state
  ctx.state.session = session;
  // Also save the JWT in case we e.g. need to perform a request in the name of the current user
  ctx.state.authToken = authToken;

  return next();
}

const makeRequireRole = (role) => async (ctx, next) => {
  const {
    roles = [],
  } = ctx.state.session;

  userService.checkRole(role, roles);
  return next();
};

module.exports = {
  requireAuthentication,
  makeRequireRole,
};
