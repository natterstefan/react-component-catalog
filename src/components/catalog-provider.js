import React from 'react'
import PropTypes from 'prop-types'

// TODO: use new Context API (https://reactjs.org/docs/context.html)
class CatalogProvider extends React.Component {
  static propTypes = {
    catalog: PropTypes.object.isRequired,
  }

  static childContextTypes = {
    catalog: PropTypes.object,
  }

  getChildContext() {
    return {
      catalog: this.props.catalog,
    }
  }

  render() {
    return React.Children.only(this.props.children)
  }
}

export default CatalogProvider
