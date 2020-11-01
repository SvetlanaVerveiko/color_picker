import React, { useState, useRef, useEffect } from 'react';
import uuid from 'react-uuid';
import classNames from 'classnames'
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Select, Box, MenuItem, Typography } from '@material-ui/core';
import InputHexColor from '../components/InputHexColor';
import MenuRange from '../components/MenuRange';
import style from './ColorPicker.module.scss';

const useColorsItem = () => {
	return useSelector(
		(state) => ({
      colorsItem: state.color.colors,
    }),
		shallowEqual
	)
} 

const ColorPicker = () => {

  const ref = useRef();
  const dispatch = useDispatch();
  const { colorsItem } = useColorsItem();
  const [rgbColor, setRgbColor] = useState({
    r: 255,
    g: 255,
    b: 255,
  });
  const [colorValue, setColorValue] = useState('ffffff');
  const [ selectOpenRgb, setSelectOpenRgb ] = useState(false);
  const [ selectColorItem, setSelectOpenColorItem ] = useState(false);

  const rgbToHex = (value) => {
    const hexColor = value.map(el => {
      const hex = el.value.toString(16)
      return hex.length === 1 ? '0' + hex : hex
    }).join('');
    return hexColor;
  }

  const hexToRgb = (value) => {
    const grbColor = value.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
      ,(m, r, g, b) => '#' + r + r + g + g + b + b)
      .substring(1).match(/.{2}/g)
      .map(x => parseInt(x, 16));
    return grbColor;
  }

  const handleSubmit = ({ rgb }) => {
    setColorValue(rgbToHex(rgb));
    dispatch({
      type: 'GET_ADD_NEW_COLOR_REQUEST',
      color: rgbToHex(rgb)
    });
    setSelectOpenRgb(!selectOpenRgb);
  }

  const close = () => {
    const colorRgb = hexToRgb(`#${colorValue}`);
    const arrayRgbColor = Object.keys(rgbColor);
    setRgbColor(
      arrayRgbColor.reduce((obj, item, index) =>  
        ({
          ...obj,
          [item]: colorRgb[index]
        }),
      {}));
    setSelectOpenRgb(!selectOpenRgb);
  }

  const changeObjRgb = ({ name, value }) => {
    setRgbColor({ ...rgbColor, [name]: value });
  }


  const valueClickItemChange = (value) => {
    const colorRgb = hexToRgb(value);
    const arrayRgbColor = Object.keys(rgbColor);
    setRgbColor(
      arrayRgbColor.reduce((obj, item, index) =>  
        ({
          ...obj,
          [item]: colorRgb[index]
        }),
      {}));
    setColorValue(value.replace('#', ''));
  }

  const closeItem = () => {
    const someColorItemAndNewColor = colorsItem.some(el => 
      el.requestedHex.indexOf(colorValue) === 1
    )
    if(!someColorItemAndNewColor) {
      setColorValue(rgbToHex(Object.keys(rgbColor).map(el=>({value: rgbColor[el]}))))
    } 
    setSelectOpenColorItem(!selectColorItem)
  }

  useEffect(() => {
    dispatch({
      type: 'GET_ADD_NEW_COLOR_REQUEST',
      color: colorValue
    });
  }, [])

  return (
    <Box 
      border={1}
      display="flex"
      alignItems="center" 
      justifyContent="center"
      className={style.color_picker}
    >
      <InputHexColor
        value={colorValue}
        onBlur={() => {
          if(colorValue.length < 6) {
            setColorValue(
              rgbToHex(Object.keys(rgbColor).map(el=>({value: rgbColor[el]})))
              )
          }
        }}
        onChange={(value) => {
          if(value.replace(/[#_]/g, '').length === 6) {
            setSelectOpenColorItem(true)
          }
          setColorValue(value.replace(/[#_]/g, ''))
        }}
      />
      <Select
        value=""
        open={selectOpenRgb}
        IconComponent={()=>
          <Box
            style={{
              cursor: "pointer"
            }}
			      borderRight={1}
            onClick={() => setSelectOpenRgb(!selectOpenRgb)}
            className={classNames(style.icon_color, 'bc-gray')}
          >
            <Box 
              width="100%" 
              height="100%"
              className="boxS"
              style={{
                backgroundColor:`rgb(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b})`
              }}
            />
          </Box>
        }
        onOpen={() => setSelectOpenRgb(!selectOpenRgb)}
        onClose={() => setSelectOpenRgb(!selectOpenRgb)}
         MenuProps={{
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left"
          },
          transformOrigin: {
            vertical: "top",
            horizontal: "left"
          },
          getContentAnchorEl: null,
          classes: {paper: style.select}
        }}
        classes={{
          root: style.select_color_content,

        }}
      >
        <MenuRange
          ref={ref}
          close={close}
          rgbColor={rgbColor}
          submitRgb={handleSubmit}
          changeObjRgb={changeObjRgb}
        />
      </Select>
      <Select
        value=''
        open={selectColorItem}
        onChange={(e) => valueClickItemChange(e.target.value)}
        onOpen={() => setSelectOpenColorItem(!selectColorItem)}
        onClose={closeItem}
        IconComponent={() =>
          <Box
            display="flex"
            alignItems="center" 
            justifyContent="center"
            style={{
              cursor: 'pointer'
            }}
            onClick={()=> setSelectOpenColorItem(!selectColorItem)}
            className={style.icon_color}
          >
            <Box className={style.icon_color_arrow}/>
          </Box>
        }
        MenuProps={{
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left"
          },
          transformOrigin: {
            vertical: "top",
            horizontal: "left"
          },
          getContentAnchorEl: null,
          classes: {
            paper: style.select_color,
          }
        }}
        classes={{
          root: style.select_color_content
        }}
      >
        {colorsItem
          .sort((a, b) =>
            a.requestedHex.indexOf(colorValue) < b.requestedHex.indexOf(colorValue) ? 1 : -1
          )
          .map((el) => (
          <MenuItem key={uuid()} value={el.requestedHex}>
            <Box 
              width="100%" 
              display="flex" 
              alignItems="center" 
              justifyContent="space-between"
            >
              <Typography classes={{root:'mr-15'}} variant="overline">
                {el.name}
              </Typography>
              <div style={{backgroundColor: el.hex}} className={classNames(style.color_block, 'boxS')} />
            </Box>
          </MenuItem>
        ))}
      </Select>
    </Box>
  )
}
export default ColorPicker