const express = require("express");
const mysql = require("myspl");
const logo = require("asciiart-logo");
const config = require("./package.json");

// creates console visual
console.log(logo(config).render());
