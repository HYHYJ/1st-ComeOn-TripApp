import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

const MetaTag = ({ title, description }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='title' content={title} />
      <meta name='description' content={description} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
    </Helmet>
  );
};

export default MetaTag;

MetaTag.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};
