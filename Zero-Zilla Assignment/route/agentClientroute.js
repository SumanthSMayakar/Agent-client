const agentClientroute = require('express').Router();
const agentClientcontroller = require('../controller/agentClientcontroller')

agentClientroute.post('/create', agentClientcontroller.create);

agentClientroute.post('/createClient/:id', agentClientcontroller.CreateClient)

agentClientroute.get('/getAll', agentClientcontroller.getAll)

agentClientroute.get('/single/:id', agentClientcontroller.getSingle)

agentClientroute.patch('/update/:id', agentClientcontroller.UpdateAgency)

agentClientroute.patch('/ClientUpdate/:id', agentClientcontroller.updateClient)

agentClientroute.delete('/agencydelete/:id', agentClientcontroller.deleteAgency)

agentClientroute.delete('/delete/:id', agentClientcontroller.deleteClient)

module.exports = agentClientroute