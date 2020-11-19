import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

const formatDistance = value => {
  if (value < 1) {
    return `${Math.floor(value * 1000)} m`;
  }
  return `${Math.round(value, -1)} km`;
};

const formatAddress = address => {
  if (
    address.street &&
    address.number &&
    address.neighborhood &&
    address.city &&
    address.state &&
    address.state
  )
    return `${address.street}, ${address.number} - ${address.neighborhood}, ${address.city} - ${address.state}, ${address.state} `;
};

export { formatDistance, formatAddress };
