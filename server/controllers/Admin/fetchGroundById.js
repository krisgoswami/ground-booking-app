import { Ground } from "../../models/groundModel";

//*************** fetch ground by id ***************//
export const fetchGroundById = async (req, res) => {
    try {
        const groundId = req.params.id;
        const ground = await GroundfindById(groundId);
        res.status(201).send({
            success: true,
            ground,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            message: "ground not found",
            success: false,
            error,
        });
    }
}