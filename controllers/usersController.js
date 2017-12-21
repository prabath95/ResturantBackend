'user strict'

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var modelUser = require('../models/users');

router.use(bodyParser.json());

//--------------------------------------------ADD USER---------------------------------------------------------------
router.post('/user/new', function(req, res) {
    var user = new modelUser();
    user.firstName = req.body.firstName;
    user.lastname = req.body.lastname;
    user.Email = req.body.Email;
    user.contact = req.body.contact;
    user.password = req.body.password;
    console.log(user);
    modelUser.findOne({Email:req.body.Email},function(error,UserRet){
        if(error){
            res.json({
                success:false,
                msg:'Unknown Error'});
        }
        else if(UserRet == null || UserRet == undefined){
            user.save(function(err) {
                if (err) {
                res.send(err);
                }
                res.json({
                    success:true,
                    msg:'User Created successful'});
            });
        }else{
            res.json({
                success:false,
                msg:'Email Already Exist'
            });
        }
    });
  });


//--------------------------------------------LOGIN USER------------------------------------------------------------
  router.post('/user/login',function(req,res){
      modelUser.findOne({Email:req.body.Email},function(err,user){
          if(err){
              res.json({
                  success:false,
                  msg:'Invalid user Name'
              });
              return;
          }
          else if (user == null || user == undefined){
            res.json({
                success:false,
                msg:'Invalid user Name'
            });
          }
          else if(req.body.password == user.password){
            res.json({
                success:true,
                msg:'Sucessfully logged in',
                user:user.Email
            });
          }else{
              res.json({
                success:false,
                msg:'Invalid Password'
              });
          }
      });
  });
  
//--------------------------------------------DELETE USER------------------------------------------------------------
  router.delete('/user/delete',function(req,res){
    modelUser.findOne({Email:req.body.Email},function(err,user){
        if(err){
            res.json({
                success:false,
                msg:'User Does Not Exist'
            });
        }
        else if(user != null || user != undefined){
            modelUser.remove({_id : user._id},function(error,obj){
                if(error){
                    res.json({
                        success:false,
                        msg:'Invalid user'
                    });
                }else{
                    res.json({
                        success:true,
                        msg:'user Deleted'
                    });
                }
            });
        }
    });
  });
  
  module.exports = router;