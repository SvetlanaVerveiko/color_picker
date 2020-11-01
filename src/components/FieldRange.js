import React from 'react'
import { Slider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { object, number } from 'prop-types'
import style from './MenuRange.module.scss'

const useStyles = makeStyles({
  thumb: ({color}) => ({
    backgroundColor: `rgb(${color})`,
  }),
});

const FieldRange = ({ options, colorIndex }) => {

  const backgroundSlider = () => {
    const initialArray = Array(3).fill(0)
    initialArray[colorIndex] = 255
    return initialArray.join(',')
  } 

  const classes = useStyles({color: backgroundSlider(colorIndex)});

  return (
    <Slider
      {...options}
      style={{
        color: 'transparent',
        background: `linear-gradient(90deg, rgb(0,0,0) 0%, rgb(${backgroundSlider()}) 100%)`
      }}
      classes={{
        root: style.sliderRange,
        thumb: classes.thumb,
        valueLabel: style.valueLabel
      }}
    />
  )
}

FieldRange.propTypes = {
  options: object,
  colorIndex: number,
}
FieldRange.defaultProps = {
  options: {},
  colorIndex: 255
}

export default FieldRange