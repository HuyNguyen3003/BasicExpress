import express, { Router } from "express";
import apiController from '../controller/apiController'


let router = express.Router();

const initapiroute = (app) => {


    router.get('/users', apiController.getAlluser)
    router.post('/creatUserapi', apiController.creatUserapi)
    router.put('/updateuserapi', apiController.updateapi)
    router.delete('/deleteuserapi/:id', apiController.deleteapi)



    return app.use('/api/v1/', router)

}

export default initapiroute;