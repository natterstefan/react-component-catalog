/* eslint-disable no-console */
import React, { FunctionComponent } from 'react'

type ButtonProps = {
  text?: string
}

const Button: FunctionComponent<ButtonProps> = ({ text = 'Hey it is me' }) => (
  <button type="button" onClick={() => console.log('Hey :)')}>
    {text}
  </button>
)

export default Button
