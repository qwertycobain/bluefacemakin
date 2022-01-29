const express = require('express'); // requerindo biblioteca express
const fs = require('fs'); //requerindo bibilioteca filesystem que opera arquivos do sistema

const app = express(); //declarando app, chamando a função express
const port = process.env.PORT || 4000;

app.get('/', (req, res) => { //arrow function
 //   console.log('foi') //só pra confirmar que foi
    const range = req.headers.range; //range dos headers
    const videoPath = './video/aa.mp4'; // caminho video
    const videoSize = fs.statSync(videoPath).size;   

    const chunkSize = 1e6; //im the one who set this up
    const start = range != undefined ? Number(range.replace(/\D/g, "")) : 0; //analizar principalmente

    const end = Math.min(start + chunkSize, videoSize -1);

    const contentLength = end - start + 1;

    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4"
    }
    res.writeHead(206, headers);

    const stream = fs.createReadStream(videoPath, { start, end })
    stream.pipe(res);
});


app.listen(port,()=>{
    console.log("server rodando na porta "+port);
});

