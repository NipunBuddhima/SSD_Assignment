import { pool } from "../database/database.js";

let FeedbackService = {};

/////////////////////////////////////// Add a feedback ////////////////////////////////////////////////

FeedbackService.addFeedback = async (
    nic,
    rating,
    message
) => {
    let query = `
    INSERT INTO clientFeedback (clientNic, rating, message)
    VALUE (?, ?, ?)
      `;

    try {
        const [rows] = await pool.query(query, [
            nic,
            rating,
            message
        ]);
    } catch (e) {
        console.error(e);
        throw e;
    }
};


//Get all feedback(Query is not complete)

FeedbackService.getAllFeedback = async() => {
    let query = `
    SELECT * FROM clientFeedback
    `;

    try{
        const [rows] = await pool.query(query);
        return rows;
    } catch(e) {
        console.error(e);
        throw e;
    }
};

//Get feedback by NIC

FeedbackService.getFeedbackByNic = async(nic) => {
    let query = `
    SELECT * FROM clientFeedback
    WHERE clientNic = ?
    `;

    try{
        const [rows] = await pool.query(query, [nic]);
        return rows;
    } catch(e) {
        console.error(e);
        throw e;
    }
}

//Delete feedback

FeedbackService.deleteFeedback = async(id) => {
    let query = `
    DELETE FROM clientFeedback
    WHERE feedbackId = ?
    `;

    try{
        await pool.query(query, [id]);
    }
    catch(e){
        console.error(e);
        throw e;
    }
}

//Update feedback

FeedbackService.updateFeedback = async(
    id,
    nic,
    rating,
    message
) => {
    let query = `
    UPDATE clientFeedback
    SET clientNic = ?, rating = ?, message = ?
    WHERE feedbackId = ?
    `;

    try{
        const [rows] = await pool.query(query, [nic, rating, message, id]);
    }
    catch(e){
        console.error(e);
        throw e;
    }
}

export default FeedbackService;