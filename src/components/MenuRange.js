import React, { forwardRef } from 'react'
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { Button, Box, Typography } from '@material-ui/core';
import { func, object } from 'prop-types'
import FieldRange from './FieldRange'

const MenuRange = forwardRef(({ rgbColor, submitRgb, close, changeObjRgb }, ref) => {
  const { handleSubmit, reset, control } = useForm({
    defaultValues: {
      rgb: Object.keys(rgbColor).map(el=>({value: rgbColor[el], name: el}))
    }
  });
  const { fields } = useFieldArray({
    control,
    name: "rgb"
  });

  return (
    <form
      ref={ref}
      onSubmit={
        handleSubmit(submitRgb)
      }
    >
     {
      fields.map((item, index) =>
        <Box display="flex" key={item.id}>
          <Typography
            gutterBottom
            display="block" 
            variant="overline" 
            classes={{root: 'mr-15'}}
          >
            {item.name}
          </Typography>
          <Box width="100%">
            <Controller
              name={`rgb[${index}].value`}
              control={control}
              render={
                ({ value, onChange }) =>
                  <FieldRange
                    options={{
                      value,
                      min: 0,
                      valueLabelDisplay: "auto",
                      max: 255,
                      onChange: (_e, valueTarget) => {
                        changeObjRgb({name: item.name, value: valueTarget})
                        onChange(valueTarget)
                      }
                    }}
                    colorIndex={index}
                />}
              /> 
            </Box>
          </Box>
        )
      }
      <Box display="flex">
        <Button 
          variant="contained" 
          classes={{ root: 'mr-15' }} 
          onClick={() => {
            reset()
            close()
          }}
        >
          Cancel
        </Button>
        <Button 
          variant="contained" 
          color="primary" 
          type="submit"
        >
          Ok
        </Button>
      </Box> 
    </form>
  )
})

MenuRange.propTypes = {
  rgbColor: object,
  submitRgb: func
}
MenuRange.defaultProps = {
  rgbColor: {}
}

export default MenuRange
