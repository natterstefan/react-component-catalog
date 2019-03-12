import React from 'react'

// base components can be imported without a registry
import Button from '../button'
import Title from '../title'

const App = () => (
  <div>
    <Title>Hello Base</Title>
    <Button />
    <p>
      <a href="/client1">Open Client 1</a>
    </p>
  </div>
)

export default App
