/* eslint-disable import/no-extraneous-dependencies */
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
global.__DEV__ = true
