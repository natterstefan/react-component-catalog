import { Catalog } from 'react-component-catalog'

// base components (or from other clients if you like)
import Button from 'Base/components/button'

/**
 * client specific components
 *
 * eg. Title: exists also in the base component, but client wants to have a
 * custom implementation
 */
import App from './components/app'
import Title from './components/title'

const catalog = new Catalog({
  components: {
    App,
    Button,
    Title,
  },
})

export { App }
export default catalog
