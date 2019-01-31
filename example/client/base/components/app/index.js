import React, { Component } from 'react'
// base components can be imported without a registry
import Button from '../button'
import Title from '../title'
class App extends Component {
  render() {
    return (
      <div>
        <Title>Hello Base</Title>
        <Button />
      </div>
    )
  }
}

export default App
