var express=require('express');
var bodyParser=require('body-parser')
var switch_patient=require('../switch/patient-switch')
var switch_patient_object=new switch_patient() 
var MasterFunction=require('../dependencies/masterfunctions')
var router=express.Router()
router.get('/',MasterFunction.catchErrors(switch_patient_object.switch_controller))
router.post('/',MasterFunction.catchErrors(switch_patient_object.switch_controller))
module.exports=router