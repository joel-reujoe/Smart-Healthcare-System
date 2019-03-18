var express=require('express');
var bodyParser=require('body-parser')
var switch_python=require('../switch/pythonmodule-switch')
var switch_python_object=new switch_python() 
var MasterFunction=require('../dependencies/masterfunctions')
var router=express.Router()
router.get('/',MasterFunction.catchErrors(switch_python_object.switch_controller))
router.post('/',MasterFunction.catchErrors(switch_python_object.switch_controller))
module.exports=router