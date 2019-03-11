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
        <p>
          <a href="/client1">Open Client 1</a>
        </p>
      </div>
    )
  }
}

export default App
