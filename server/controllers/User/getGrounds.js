import { Ground } from "../../models/groundModel";

//*************** display grounds for the user ***************//
export const getGrounds = async (req, res) => {
    try {
        const grounds = await Ground.find({ published: true });
        res.status(200).send({
            success: true,
            grounds,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            message: "No grounds listed",
            success: false,
            error,
        });
    }
}