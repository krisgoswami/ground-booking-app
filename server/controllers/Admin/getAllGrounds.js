import { Ground } from "../../models/groundModel";

//*************** get all ground details ***************//
export const getAllGrounds = async (req, res) => {
    try {
        const grounds = await Ground.find({});
        res.status(200).send({
            success: true,
            grounds,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            message: "No grounds added",
            success: false,
            error,
        });
    }
}