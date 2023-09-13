const { Router } = require('express');

const { userModel } = require('../models/user.model')

const router = Router();

router.get('/', async (req, res) => { 
    try {
        let users = await userModel.find();
        res.send({ result: "success", payload: users });
    } catch (error) {
        console.log('error en el usuario', error);
    }
});

router.get('/:uid', async(req, res) => {
    try {
        let paramId = req.params
        let searchById = await userModel.find({ id: paramId.uid })
        res.send({ payload: searchById })
    
    } catch (error) {
        console.error(error)
    }

})
router.post('/', async (req, res) => {
    try {
        let { nombre, apellido, email, id } = req.body;
        
        let result = await userModel.create({ nombre, apellido, email, id });
        
        res.send({ result: "success", payload: result });

    } catch (error) {
        
        console.log ( "error on user", error );

    }
    
})
 


router.put('/:uid', async (req, res) => {
    try {
        let paramId = req.params
        const findDocument = await userModel.findOne({ id: paramId.uid })

        if (findDocument === null) {
            return res.send("user's ID not found")
        }

        let newUserInfo = req.body
        let update = await findDocument.updateOne(newUserInfo)

        res.send({ result: "success on updating", payload: update })
    } catch (error) {
        console.log ("Error in PUT /users/:id ", error )
    }
    })

router.delete('/:uid', async (req, res) => {
    try {
        let uid  = req.params;
        let deleteUser = await userModel.deleteOne({ id: uid.id });
        res.send({ result: "success", payload: deleteUser });

    } catch(error) {
        console.log('ERROR ON DELETE USERS BY UID ', error  )}
    
})


module.exports = router 