import { Ground } from "../../models/groundModel";

//*************** delete ground details ***************//
export const deleteGround = async (req, res) => {
    try {
        const groundId = req.params.id;
        const ground = await Ground.findByIdAndDelete(groundId);
        if (!ground) {
            return res.status(400).send({
                message: "ground not found",
                success: false,
            });
        }
        res.status(200).send({
            message: "Ground deleted",
            success: true,
            ground,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            message: "Error deleting ground details",
            success: false,
            error,
        });
    }
}