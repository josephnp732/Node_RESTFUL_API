import mongoose from 'mongoose';
import { ContactSchema } from '../models/crmModel';

const Contact = mongoose.model('Contact', ContactSchema);

// Creates a new Contact
export const addNewContact = (req, res) => {
    let newContact = new Contact(req.body);

    newContact.save((err, contact) => {
        if (err) {
            res.send(err);
        }
        res.json(contact);
    });
}

// Retrieves an Existing Contact
export const getAllContacts = (req, res) => {
    Contact.find({}, (err, contacts) => {
        if (err) {
            res.send(err);
        }
        res.json(contacts);
    })
}


// Retrieves Specific Contact
export const getContactWithId = (req, res) => {
    Contact.findById(req.params.contactID, (err, contacts) => {
        if (err) {
            res.send(err);
        }
        res.json(contacts);
    })
}


// Updates Specific Contact
export const updateContact = (req, res) => {
    Contact.findByIdAndUpdate(req.params.contactID, req.body, {new: true, useFindAndModify: false}, (err, contacts) => {
        if (err) {
            res.send(err);
        }
        res.json(contacts);
    })
}


// Removes Specific Contact
export const removeContact = (req, res) => {
    Contact.findByIdAndRemove(req.params.contactID, (err, contacts) => {
        if (err) {
            res.send(err);
        }
        res.json(contacts);
    })
}