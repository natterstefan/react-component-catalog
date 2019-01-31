import { Catalog } from 'react-component-catalog'

/**
 * client specific components
 *
 * eg. Title: exists also in the base component, but client wants to have a
 * custom implementation
 */
import App from './app'
import Title from './title'

// base components (or from other clients if you like)
import Button from 'Base/components/button'

const catalog = new Catalog({
  components: {
    App,
    Button,
    Title,
  },
})

export { App }
export default catalog
