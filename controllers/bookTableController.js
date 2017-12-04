'user strict'

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var modalTable = require('../models/bookTable');

router.use(bodyParser.json());
//--------------------------------------------ADD Booking---------------------------------------------------------------
router.post('/booktable/new', function (req, res) {
    var table = new modalTable();
    table.tableNO = req.body.tableNo;
    table.peopleCount = req.body.peopleCount;
    table.Date = req.body.Date;
    table.StartTime = req.body.StartTime;
    table.EndTime = req.body.EndTime;
    table.contact = req.body.contact;
    modalTable.find({ Date: req.body.Date }, function (error,TableRet) {
        if (error) {
            res.json({
                success: false,
                msg: 'Unknown Error'
            });
            console.log(TableRet);
        } 
        console.log(TableRet);
        if (TableRet == null || TableRet.length==0 || TableRet == undefined) {
            table.save(function (err) {
                if (err) {
                    res.send(err);
                }
                res.json({
                    success: true,
                    msg: 'Booking Sucessful'
                });
            });
        } else {
            
            if (compareDates(req.body.StartTime, req.body.EndTime, TableRet)) {
                table.save(function (err) {
                    if (err) {
                        res.send(err);
                    }
                    res.json({
                        success: true,
                        msg: 'Booking Sucessful'
                    });
                });
            } else {
                res.json({
                    success: false,
                    msg: 'Alredy Booking Available' 
                });
            }
        }
    });
});

function compareDates(start, end, data) {
    var isCorrect = false;
    for (var i = 0; i < data.length; i++) {
        var date = new Date(start);
        var date2 = new Date(end);
        var date3 = new Date(data[i].StartTime);
        var date4 = new Date(data[i].StartTime);

        if (date3 >= date && date3 <= date2) {
            isCorrect = false;
        } else if (date4 >= date && date4 <= date2) {
            isCorrect = false;
        } else {
            isCorrect = true;
        }
    }
    return isCorrect;
}
//--------------------------------------------GET ALL Booking---------------------------------------------------------------
router.get('/book/getall',function(req,res){
    modalTable.find(function(err,bookings){
        if(err){
            res.json({
                success: true,
                msg: 'Booking Sucessful'
            });
        }else{
            res.json(bookings);
        }
    });
});

//--------------------------------------------DELETE Booking---------------------------------------------------------------
router.delete('/book/delete',function(req,res){
    modalTable.remove({_id:req.body.ID},function(err,response){
        if(err){
            res.json({
                success: true,
                msg: 'Error !!'
            });
        }else {
            res.json({
                success: true,
                msg: response
            });
        }
    });
});

module.exports = router; 