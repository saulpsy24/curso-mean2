'use strict'
var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');
var Evento = require('../models/event');
var Sala = require('../models/sala');
var Dossiere = require('../models/dossiere');
var Eventos = require('../models/event');
var Espacio = require('../models/espacio');
var Asist = require('../models/assistant');
var Turno = require('../models/turno');
var Cliente = require('../models/cliente')
var ObjectId = require('mongodb').ObjectId;


//metodo para obtener 1 canción
function getAsist(req, res) {
    var idAsist = req.params.id;

    Asist.findById(idAsist).populate({
        path: 'turno'
    }
    ).populate({
        path: 'cliente'
    }).exec((err, asistencia) => {
        if (err) {
            res.status(500).send({
                message: 'error en la peticion'
            });
        } else {
            if (!asistencia) {
                res.status(404).send({
                    message: 'No existe asistencia'
                });
            } else {
                res.status(200).send({
                    asistencia
                });
            }
        }
    });
}
//metodo para guardar una cancion
function saveAsist(req, res) {
    var asist = new Asist();
    var params = req.body;
    var aforo2 = new Turno();
    asist.cliente = params.cliente;
    asist.turno = params.turno;

    Asist.findOne({
        'cliente': asist.cliente
    }, function (err, elements) {

        if (err) {
            res.status(500).json({
                error: false,
                message: err.message
            });
        }
        if (!elements) {
            var turnoasistencia = function (turno, callback) {
                Turno.find().where('_id', ObjectId(asist.turno)).
                    exec(function (err, turnosconeseid) {
                        // docs contains an array of MongooseJS Documents
                        // so you can return that...
                        // reverse does an in-place modification, so there's no reason
                        // to assign to something else ...
                        turnosconeseid.reverse();
                        callback(err, turnosconeseid);
                    });
            };

            turnoasistencia(asist.turno, function (err, turnos) {
                if (err) {
                    return;
                } else {
                    var aforo = new Turno();
                    aforo = turnos;
                    aforo2 = aforo[0];
                    if (aforo2.aforo > 0) {

                        var turno = asist.turno;
                        var update = {
                            $inc: {
                                aforo: -1
                            }
                        }
                        Turno.findByIdAndUpdate(turno, update, (err, turnoUpdated) => {
                            if (err) {
                                res.status(500).send({
                                    message: 'No se logro actualizar turno'
                                });
                            } else {
                                if (!turnoUpdated) {
                                    res.status(404).send({
                                        message: 'No se encuentra el turno'
                                    });
                                } else {
                                    asist.save((err, asistSaved) => {
                                        if (err) {
                                            res.status(500).send({
                                                message: 'Error en el Servidor'
                                            });

                                        } else {
                                            if (!asistSaved) {
                                                res.status(404).send({
                                                    message: 'Error guardando asistencia'
                                                });
                                            } else {
                                                res.status(200).send({
                                                    asistSaved,
                                                    turnoUpdated



                                                });
                                            }
                                        }
                                    });


                                }
                            }

                        });


                    }

                    else {
                        res.status(404).send({ message: 'Ya no hay mas cupos' });
                    }

                }
            });
        } else {
            res.status(200).send({message:'Ya te has inscrito al evento anteriormente'});

        }
    });
    
}



function getAsistencias(req, res) {
    var turnoId = req.params.id;
    if (!turnoId) {
        //sacar todos los albums de la DB
        var find = Asist.find({}).sort('name');
    } else {
        //mostrar solamente los albums de ese artista
        var find = Asist.find({
            turno: turnoId
        }).sort('name');
    }
    find.populate({
        path: 'turno',


    }).populate({
        path: 'cliente'
    }).exec((err, asistencias) => {
        if (err) {
            res.status(500).send({
                message: 'error'
            });
        } else {
            if (!asistencias) {
                res.status(404).send({
                    message: 'no hay asistencias  asociadas'
                });
            } else {
                res.status(200).send({
                    asist: asistencias
                });
            }
        }
    })
}


//Metodo para borrar canciones.
function deleteAsist(req, res) {
    var asist = new Asist();
    var params = req.body;
    var aforo2 = new Turno();
    asist.cliente = params.cliente;
    asist.turno = params.turno;

    var turnoasistencia = function (turno, callback) {
        Turno.find().where('_id', ObjectId(asist.turno)).
            exec(function (err, turnosconeseid) {
                // docs contains an array of MongooseJS Documents
                // so you can return that...
                // reverse does an in-place modification, so there's no reason
                // to assign to something else ...
                turnosconeseid.reverse();
                callback(err, turnosconeseid);
            });
    };

    turnoasistencia(asist.turno, function (err, turnos) {
        if (err) {
            return;
        } else {
            var aforo = new Turno();
            aforo = turnos;
            aforo2 = aforo[0];
            if (aforo2.aforo >= 0) {

                var turno = asist.turno;
                var update = {
                    $inc: {
                        aforo: 1
                    }
                }
                Turno.findByIdAndUpdate(turno, update, (err, turnoUpdated) => {
                    if (err) {
                        res.status(500).send({
                            message: 'No se logro actualizar turno'
                        });
                    } else {
                        if (!turnoUpdated) {
                            res.status(404).send({
                                message: 'No se encuentra el turno'
                            });
                        } else {
                            asist.save((err, asistSaved) => {
                                if (err) {
                                    res.status(500).send({
                                        message: 'Error en el Servidor'
                                    });

                                } else {
                                    if (!asistSaved) {
                                        res.status(404).send({
                                            message: 'Error guardando asistencia'
                                        });
                                    } else {
                                        res.status(200).send({
                                            asistSaved,
                                            turnoUpdated



                                        });
                                    }
                                }
                            });


                        }
                    }

                });


            }

            else {
                res.status(404).send({ message: 'Ya no hay mas cupos' });
            }

        }
    });
}


module.exports = {
    getAsist,
    saveAsist,
    getAsistencias,
    deleteAsist

}
