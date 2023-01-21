const Application = require('../models/Application')

const getApplication = async(req,res) => {
    const applications = await Application({applicant: req.params.eventId})
    res.send(applications);
}

const postApplication = async (req,res) => {
    const applicant = req.user;
    if (!applicant) {
        return res.status(401).send({ error:'Unauthorized' });
    }
    console.log(applicant)
    const event = req.params.eventId;
    try {
        const newApplication = new Application({
            message: req.body.message,
            applicant,
            event
        })
        await newApplication.save();
        return res.status(201).send(newApplication);

    } catch (error) {
        console.log(error);
        res.status(400).send("Application saving failed")
    }
}

exports.getApplication = getApplication;
exports.postApplication = postApplication;