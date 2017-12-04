'user strict'

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var modalTable = require('../models/table');

router.use(bodyParser.json());
//--------------------------------------------ADD TABLE---------------------------------------------------------------
router.post('/table/new', function(req, res) {
    var table = new modalTable();
    table.tableNo = req.body.tableNo;
    table.noOfChairs = req.body.noOfChairs;
    modalTable.findOne({tableNo:req.body.tableNo},function(error,TableRet){
        if(error){
            res.json({
                success:false,
                msg:'Unknown Error'
            });
        }
        else if(TableRet == null || TableRet == undefined){
            table.save(function(err) {
                if (err) {
                res.send(err); // comment
                }
                res.json({
                    success:true,
                    msg:'Table Created successful'
                });
            });
        }else{
            res.json({
                success:false,
                msg:'Table Already Exist'
            });
        }
    });
  });


//--------------------------------------------GET ALL TABLES---------------------------------------------------------------
router.get('/table/getall', function(req,res) {
    modalTable.find(function(err,tables){
        if(err){
            res.json({
                success:false,
                msg:'Error when getting tables'
            });
        }
        else {
            res.json(tables);
        }
    });
});

//--------------------------------------------DELETE TABLE---------------------------------------------------------------
router.delete('/table/delete',function(req,res){
    modalTable.findOne({tableNo:req.body.tableNo},function(err,table){
        if(err){
            res.json({
                success:false,
                msg:'Table Does Not Exist'
            });
        }
        else if(table != null || table != undefined){
            modalTable.remove({_id : table._id},function(error,obj){
                if(error){
                    res.json({
                        success:false,
                        msg:'Invalid table'
                    });
                }else{
                    res.json({
                        success:true,
                        msg:'Table Deleted'
                    });
                }
            });
        }
    });
  });

//--------------------------------------------Update TABLE---------------------------------------------------------------

router.put('/table/update',function(req,res){    
    var update = {
        tableNo: req.body.tableNo,
        noOfChairs: req.body.noOfChairs
    }
    modalTable.findOneAndUpdate({_id : req.body.id},update,{},function(err,out){
        if(err){
            res.json({
                success:false,
                msg:'Table Update Fail'
            });
        }else{
            res.json({
                success:true,
                msg:'Table sucessfully Updated'
            });
        }
    });
});

module.exports = router; 