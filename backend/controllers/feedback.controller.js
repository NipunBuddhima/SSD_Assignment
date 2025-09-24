import FeedbackService from "../services/feedback.service.js";

let FeedbackController = {};

/////////////////////////////////////// Add a route ////////////////////////////////////////////////

FeedbackController.addFeedback = async (req, res) => {

    try {
        const {
            nic,
            rating,
            message
        } = req.body;


        await FeedbackService.addFeedback(
            nic,
            rating,
            message
        );

        res.status(201).send({ message: "Feedback added successfully" });

    } catch (e) {
        console.error(e);
        res.status(500).send({ error: "Internal Server Error" });
    }
};

//Get all Feedback
FeedbackController.getAllFeedback = async (req, res) => {
    try{
        let data = await FeedbackService.getAllFeedback();
        res.status(200).send(data);
    }
    catch(e)
    {
        res.status(500).send({error : "Internal Server Error"});
    }
};

//Get Feedback by NIC

FeedbackController.getFeedbackByNic = async (req, res) => {
    try{
        let data = await FeedbackService.getFeedbackByNic(req.params.nic);
        res.status(200).send(data);
    }
    catch(e)
    {
        res.status(500).send({error : "Internal Server Error"});
    }
}

//Delete Feedback

FeedbackController.deleteFeedback = async (req, res) => {
    try{
        await FeedbackService.deleteFeedback(req.params.id);
        res.status(200).send({message : "Feedback deleted successfully"});
    }
    catch(e)
    {
        res.status(500).send({error : "Internal Server Error"});
    }
}

//Update Feedback

FeedbackController.updateFeedback = async (req, res) => {
    try{
        const {
            nic,
            rating,
            message
        } = req.body;

        await FeedbackService.updateFeedback(
            req.params.id,
            nic,
            rating,
            message
        );

        res.status(200).send({message : "Feedback updated successfully"});
    }
    catch(e)
    {
        res.status(500).send({error : "Internal Server Error"});
    }
}


export default FeedbackController;