const Agency = require('../model/agentModel');
const Client = require('../model/clientModel');

const AgencyClient = {

    // Create a new agency and client in a single request       
    create : async(req,res) => {
        const {  Name,  Address_1, Address_2, State, City, Phone_Number, clientName, email, clientPhone, Total_bill, Client_Id,  } = req.body;

        if (!Name || !Address_1 || !State || !City || !Phone_Number || !clientName || !email || !clientPhone || !Total_bill || !Client_Id) {
            return res.status(400).send('Missing required fields');
        }

        try {
            const agency = await Agency.create({
                Name,
                Address_1,
                Address_2: req.body.address2 || '',
                State,
                City,
                Phone_Number
            });
        
            const client = await Client.create({
                agencyId: agency._id,
                Client_Id,
                Name: clientName,
                email,
                Phone_Number: clientPhone,
                Total_bill
            });
        
            agency.clients.push(client._id);
            await agency.save();
        
            res.status(201).json({ agency, client });
        } catch (err) {
            console.error(err);
            res.status(500).send(err.message);
        }
    },
    //create a new client and add it to agency
    CreateClient : async (req,res) => {
        const {Client_Id, clientName, email, clientPhone, Total_bill } = req.body;
        if (!Client_Id || !clientName || !email || !clientPhone || !Total_bill) {
            return res.status(400).send('Missing required fields');
        }
        
        try {
            const agency = await Agency.findByIdAndUpdate( {_id : req.params.id },req.body);
            
            const client = await Client.create({
                agencyId: agency._id,
                Client_Id,
                Name: clientName,
                email,
                Phone_Number: clientPhone,
                Total_bill
            });
        
            agency.clients.push(client._id);
            await agency.save();
        
            res.status(201).json({ agency, client });
        } catch (err) {
            console.error(err);
            res.status(500).send(err.message);
        }
    },
    getAll : async(req,res) => {
        try {
            const agencies = await Agency.find().populate('clients');
            res.json(agencies);
          } catch (err) {
            console.error(err);
            res.status(500).send(err.message);
          }
    },
    getSingle: async(req,res) => {
        try {
            const agency = await Agency.findById(req.params.id).populate('clients');
                if (!agency) {
                    return res.status(404).send('Agency not found');
                }
                let topClients = agency.clients.sort((a, b) => b.Total_bill - a.Total_bill).slice(0);
                topClients = topClients.map(client => ({
                    clientName: client.Name,
                    Total_bill: client.Total_bill
                }));
                res.json({
                    agencyName: agency.Name,
                    topClients
                });
          } catch (err) {
            console.error(err);
            res.status(500).send(err.message);
          }
    },

    UpdateAgency : async(req,res) => {
        try {
            let data = await Agency.findById({ _id: req.params.id })
                if(!data)
                return res.status(404).json({ msg: "Agency doesn't exists."})
    
            const agency = await Agency.findByIdAndUpdate( {_id : req.params.id },req.body);
                res.status(200).json({ msg: "Agency updated successfully", agency: agency })
          
        } catch (err) {
            return  res.status(500).json({ msg: err.message })
        }
    },
    updateClient : async(req,res) => {
        try {
            let data = await Client.findById({ _id: req.params.id })
                if(!data)
                return res.status(404).json({ msg: "Client doesn't exists."})
    
            const ClientUpdate = await Client.findByIdAndUpdate( {_id : req.params.id },req.body);
                res.status(200).json({ msg: "ClientUpdate successfully", ClientUpdate: ClientUpdate })
          
        } catch (err) {
            return  res.status(500).json({ msg: err.message })
        }
    },
    deleteAgency : async(req,res) => {
        try {
            let data = await Agency.findByIdAndDelete({ _id: req.params.id})
                if(!data)
                return res.status(404).json({ msg: "Agency doesn't exists."})

                res.status(200).json({ msg: "Agency Deleted successfully"})
        } catch (err) {
            return  res.status(500).json({ msg: err.message })
        }
    },
    deleteClient : async(req,res) => {
        try {
            let data = await Client.findByIdAndDelete({ _id: req.params.id})
                if(!data)
                return res.status(404).json({ msg: "Client doesn't exists."})

                res.status(200).json({ msg: "Agency Deleted successfully"})
        } catch (err) {
            return  res.status(500).json({ msg: err.message })
        }
    }
}

module.exports = AgencyClient