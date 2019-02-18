//import { request } from '../AppData/Local/Microsoft/TypeScript/2.6/node_modules/@types/express';

//import { request } from 'http';
//import { response } from '../AppData/Local/Microsoft/TypeScript/2.6/node_modules/@types/express';

// import { error } from 'util';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extend: false}))

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const DBurl = "mongodb://127.0.0.1:27017/";
const DBname = "siswa";

let dbo = null;

MongoClient.connect(DBurl, (error, db)=>{
    if(error) throw error;
    dbo = db.db(DBname);
});


// endpoint get : mengambil data dari database yg sudah dibuat
app.get('/siswa',(request, response)=>{
    dbo.collection("data_siswa").find().toArray((err, res)=>{
        if(err) throw err;
        response.json(res);
    })
});
//endpoint insert data ke database
app.post('/siswa', (request, response)=>{
    let namaSiswa = request.body.nama;
    let alamatSiswa = request.body.alamat;
    dbo.collection("data_siswa").insertOne({
        nama : namaSiswa,
        alamat : alamatSiswa
    }, (err, res)=>{
        if(!err){
            response.json(res);
            response.end("data berhasil masuk");
        }else{
            throw err;
        }
    })
})
//endpoint delete data 
app.delete('/siswa/:id', (request, response)=>{
    let id = request.params.id;
    let id_object = new ObjectID(id);
    dbo.collection("data_siswa").deleteOne({
        _id : id_object
    },(err,res)=>{
        if(err) throw err;
        response.end("data berhasil dihapus");
    })
})
//endpoint update data
app.put('/siswa/:id', (request, response)=>{
    let id = request.params.id;
    let id_object = new ObjectID(id);
    let namaSiswa = request.body.nama;
    let kelasSiswa = request.body.kelas;
    let jurusanSiswa = request.body.jurusan;
    dbo.collection("data_siswa").updateOne({
        _id : id_object
    }, {$set :{
        nama : namaSiswa,
        kelas : kelasSiswa,
        jurusan : jurusanSiswa
    }},
    (err,res)=>{
        if(err) throw err;
        response.end("data berhasil diupdate");
    })
})

//method get
app.get('/siswa/:nama',(requset,response)=>{
    let namaSiswa = requset.params.nama;
    response.end("menampilkan nama siswa"+ namaSiswa);
});
//method post
app.post('/siswa',(request,response)=>{
    let namaSiswa = request.body.nama;
    let alamat = request.body.alamat;
    response.end('menampilkan siswa baru '+namaSiswa +', yang beralamat di '+alamat);
});

//method get
app.delete('/siswa/:id',(request,response)=>{
    let id = request.params.id;
    let namaSiswa = request.body.nama;
    response.end('id '+id+'telah dihapus, dengan nama: '+namaSiswa);
});

app.put('/siswa/:id', (request, response)=>{
    let id = request.params.id;
    let namaSiswa = request.body.nama;
    let alamat = request.body.alamat;
    response.end('siswa dengan id: '+id+' telah diupdate');
})

//inisialisasi port
app.listen('8080', (e)=>{
    console.log("bisa");
});

