'use strict'
var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');

var Cliente = require('../models/cliente');
var Respuesta = require('../models/respuesta');
var Consulta =require('../models/consulta');

function getRespuesta(req, res) {
    var idResp = req.params.id;

    Respuesta.findById(idResp).populate({
        
        path: 'cliente'
    }
    ).populate({
        path:'consulta'
    }).exec((err, respuesta) => {
        if (err) {
            res.status(500).send({
                message: 'error en la peticion'
            });
        } else {
            if (!respuesta) {
                res.status(404).send({
                    message: 'No existe respuesta'
                });
            } else {
                res.status(200).send({
                    respuesta
                });
            }
        }
    });
}

function saveRespuesta(req, res) {
    var respuesta = new Respuesta();
    var params = req.body;
    respuesta.body=params.body;
    respuesta.cliente=params.cliente;
    respuesta.consulta=params.consulta;
    respuesta.date=Date();

    respuesta.save((err, respuestaStored) => {
        if (err) {
            res.status(500).send({
                message: 'error al conectar al server'
            });

        } else {
            if (!respuestaStored) {
                res.status(404).send({
                    message: 'No se guardo la respuesta'
                });
            } else {
                res.status(200).send({
                    respuesta: respuestaStored
                });
            }
        }

    });
}

//Metodo para ver artistas por pagina
function getConsultas(req, res) {
    if (req.params.page) {
        var page = req.params.page;
    } else {
        var page = 1;
    }

    var itemsperpage = 10;

    Consulta.find().populate({path:'cliente',Model:'Cliente'
    }).sort('date').paginate(page, itemsperpage, function (err, consultas, total) {
        if (err) {
            res.status(500).send({
                message: 'error en la peticion al server'
            });
        } else {
            if (!consultas) {
                res.status(404).send({
                    message: 'No hay consultas'
                });
            } else {
                return res.status(200).send({
                    pages: total,
                    consultas: consultas
                });
            }
        }

    });
}


//metodo para actualizar artistas
function updateConsulta(req, res) {
    var consultaId = req.params.id;
    var update = req.body;

    Consulta.findByIdAndUpdate(consultaId, update, (err, consultaUpdated) => {
        if (err) {
            res.status(500).send({
                message: 'Error al actualizar checar, servidor'
            });
        } else {
            if (!consultaUpdated) {
                res.status(404).send({
                    message: 'No se pudo actualizar COnsulta'
                });

            } else {
                res.status(200).send({
                    consulta: consultaUpdated
                });

            }
        }
    });
}
//METODO PARA BORRAR albums
function deleteConsulta(req, res) {
    var consultaId = req.params.id;
    Consulta.findByIdAndRemove(consultaId, (err, consultaRemoved) => {
        if (err) {
            res.status(500).send({
                message: 'Error al borrar Consulta'
            });
        } else {
            if (!consultaRemoved) {
                res.status(404).send({
                    message: 'Consulta no  se pudo eliminar'
                });
            } else {
                Respuesta.findOneAndRemove({consulta:consultaRemoved},function(err,preguntaRemovida){
                    if(err){

                    }else{
                        if(!preguntaRemovida){

                        }else{
                            res.status(200).send({message:'Turno Borrado Exitosamente',
                            respuesta:preguntaRemovida,
                            consulta:consultaRemoved,
                            
                        
                            })
                        }
                    }

                });

            }
        }

    });
}





module.exports = {
    getRespuesta,
    getConsultas,
    updateConsulta,   
    saveRespuesta,
    deleteConsulta,

};
