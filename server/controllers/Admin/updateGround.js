import { Ground } from "../../models/groundModel";

//*************** update ground details ***************//
export const updateGround = async (req, res) => {
    try {
        let updateGround;
        updateGround = await Ground.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true },
        );
        if (!updateGround) {
            return res.status(404).send({
                message: "ground not found",
                success: false,
            });
        }
        res.status(201).send({
            message: "Ground updated",
            success: true,
            ground: updateGround,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "error updating",
            success: false,
            error,
        });
    }
}