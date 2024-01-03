import { Ground } from "../../models/groundModel";

//*************** get ground by id ***************//
export const getGroundById = async (req, res) => {
    try {
        const groundId = req.params.id;
        const ground = await Ground.findById(groundId);
        res.status(200).send({
            success: true,
            ground,
        });
    } catch (error) {
        console.log(error);
        return res.status(404).send({
            message: "ground not found",
            success: false,
            error,
        });
    }
}