/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import { Box, Button, Typography } from "@mui/material";
import React from "react";
import {NavLink} from "react-router-dom"


const CTABTN = ({link,title}) => {
  return( 
  <Box sx={{my:2}} >
  <NavLink to={link}>
  <Button variant="CTA" sx={{p:2,minWidth:"200px"}}>
  <Typography  variant="navtext" >
  {title}
  </Typography>
  </Button>
  </NavLink>
  </Box>
  );
};

export default CTABTN;
