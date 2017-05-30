import PropTypes from 'prop-types';

export const UserProps = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string,
  photo: PropTypes.string
});

export const PhotoProps = PropTypes.shape({
  backup: PropTypes.bool,
  bytes: PropTypes.number,
  created_at: PropTypes.string,
  format: PropTypes.string,
  height: PropTypes.number,
  public_id: PropTypes.string,
  resource_type: PropTypes.string,
  secure_url: PropTypes.string,
  type: PropTypes.string,
  url: PropTypes.string,
  version: PropTypes.number,
  width: PropTypes.number
});
