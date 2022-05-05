const express = require('express')
const multer  = require('multer')
const { execSync } = require('child_process');
const fs = require("fs")

let storage = multer.diskStorage({   
    destination: function(req, file, cb) { 
       cb(null, './uploads');    
    }, 
    filename: function (req, file, cb) { 
       cb(null , file.originalname);   
    }
 });

const upload = multer({storage: storage})

const app = express()
const port = process.env.PORT || 5000

app.get('/health', (req, res) => {
  res.send('ONLINE')
})

app.post('/upload', upload.single('file'), (req, res) => {
    let accessToken = req.body.accessToken

    if(accessToken === process.env.ACCESS_TOKEN){

      let file = req.file
      let directory = req.body.directory

      execSync('sh ./scripts/clone-bucket.sh')

      if(!fs.existsSync(`./bucket/${directory}`)){
        fs.mkdirSync(`./bucket/${directory}`)
      }

      fs.renameSync(file.path, `./bucket/${directory}/${file.filename}`)
      execSync('sh ./scripts/deploy.sh')

      res.send({
        filename: file.filename,
        fullPath: `https://savvasstephanides.github.io/bucket/${directory}/${file.filename}`
      })
    }
    else{
      res.send("Cannot send")
    }
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})