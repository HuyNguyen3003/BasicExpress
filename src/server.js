//const express = require('express')
import express from "express";
import configViewEngine from './configs/ViewsEngine';
import 'dotenv/config'
import initWebRouter from './route/web'
import initapiroute from "./route/api";
import { render } from "ejs";
var morgan = require('morgan')

const app = express()
const port = process.env.PORT || 3000
app.use(morgan('combined'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// setup wiew engine
configViewEngine(app)

// init webRouter
initWebRouter(app)
// init api
initapiroute(app)
// 404 
app.use((req, res) => {
  return res.render('404.ejs')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})