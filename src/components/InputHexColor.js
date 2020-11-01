import React from 'react'
import { Box } from '@material-ui/core';
import InputMask from 'react-input-mask'
import { string } from 'prop-types'

import style from './MenuRange.module.scss'

const InputHexColor = ({ value, onChange, onBlur }) => {
  return (
    <Box 
      width="200px"
      height="50px"
      className="bc-gray"
      borderRight={1}
    >
      <InputMask 
        mask="#******"
        onChange={(e)=> onChange(e.target.value)}
        onBlur={onBlur}
        value={value}
        className={style.input_color_picker}
      />
    </Box>
  )
}
InputHexColor.propTypes = {
  color: string
}
InputHexColor.defaultProps = {
  color: "ffffff"
}
export default InputHexColor