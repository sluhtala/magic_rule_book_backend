const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

PORT= process.env.PORT || 3001;

app.use(cors());

app.get('/rules.txt',async (req, res)=>{
  if (process.argv[2] === 'dev')
  {
    // Using a file for local development
    console.log('reading file')
    const file = fs.readFileSync('rules.txt')
    if (!file)
      res.status(400).send({error: 'no rules.txt file'})
    res.send(file);
    return ;
  }
  else
  {
    const file = await axios.get('https://media.wizards.com/2021/downloads/MagicCompRules%2020210419.txt');
    res.send(file.data);
  }
})

app.use(express.static(__dirname + '/build'))

app.get('/app',(req, res)=>{
  res.sendFile(path.join(__dirname, 'build', 'index.html'),(e)=>{
    if (e)
      console.log(e)
  });
})

app.listen(PORT, ()=>{
  console.log(`listening at ${PORT}`)
})
