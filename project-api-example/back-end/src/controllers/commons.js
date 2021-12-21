import NotAuthorized from '../exceptions/NotAuthorized';

const defaultErrorMsg = 'You must be an admin!';

function verifyAuthorization(
  user,
  targetID = '',
  targetRole = 'admin',
  errorMsg = defaultErrorMsg
) {
  if (user.id !== targetID && user.role !== targetRole) {
    throw new NotAuthorized(errorMsg);
  }
}

export { verifyAuthorization };
