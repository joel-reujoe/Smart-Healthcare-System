const MasterFunctions7=require('../dependencies/masterfunctions')
const ctrl_patient_class=require('../controllers/ctrl-patient')

class patient_switch{
    public switch_controller=async(req,res,next)=>{
        var action=req.query.action;
        var ctrl_patient_object=new ctrl_patient_class()
        switch(action){
            case "registerPatient":
            ctrl_patient_object.registerPatient(req,res,next);
            break;

            case "loginPatient":
            ctrl_patient_object.loginPatient(req,res,next)
            break;

            case "getDoctors":
            ctrl_patient_object.getDoctors(req,res,next)
            break;
<<<<<<< HEAD
=======

            case "getAvaibableTimeSlots":
            ctrl_patient_object.getAvailableTimeSlots(req,res,next);
            break;

            case "bookAppointment":
            ctrl_patient_object.bookAppointment(req,res,next)
            break;

            case "getReportList":
            ctrl_patient_object.getReportList(req,res,next);
            break;
>>>>>>> shs-joelbranch
        }
    }
}

module.exports=patient_switch