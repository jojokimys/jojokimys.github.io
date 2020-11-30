// These are our required libraries to make the server work.
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import express from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

import countries from './public/lab_6/countries.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.route('/api')
  .get(async (req, res) => {
    console.log('GET request detected');
    res.send(`Lab 7 for ${process.env.NAME}`);
  })
  .post(async (req, res) => {
    const data = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json');
    const json = await data.json();
    console.log('fetch request data', json);
    res.json(json);
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});


app.route('/sql')  
.get(async (req, res) => {
  console.log('GET request detected');
  res.send(`Lab 7 for ${process.env.NAME}`);
})
.post(async (req, res) => {
  const data = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json');
  const json = await data.json();
  console.log('fetch request data', json);
  res.json(json);
});


const dbSettings = {
	filename: './tmp/database.db',
	driver: sqlite3.Database
};

async function databaseInitialize(dbSettings) {
	try {
		const db = await open(dbSettings);
		console.log("Success");

	}
	catch(e) {
		console.log("Error loading Database");

	}
}