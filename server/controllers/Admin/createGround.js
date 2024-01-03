import { Ground } from "../../models/groundModel";

//*************** create ground ***************//
export const createGround = async (req, res) => {
    try {
        const newGround = req.body;
        const ground = new Ground(newGround);
        await ground.save();
        res.status(200).send({
            message: "Ground creation successful",
            success: true,
            ground,
            groundId: ground.id,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "error creating ground",
            success: false,
            error,
        });
    }
}