// get all property
// based on id

import Property from "../Models/propertyModel.js";
import {APIFeatures} from "../utils/APIFeatures.js";
import imagekit from "../utils/ImagekitIO.js";

// get all properties
const getProperties = async (req, res) => {
    try {
        const features = new APIFeatures(Property.find(), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();
        const allProperties = await Property.find();
        
        const doc = await features.query;

        res.status(200).json({
            status: "success",
            no_of_responses: doc.length,
            data: doc
        })

    }catch (error) {
        console.error("Error fetching properties:", error);
        res.status(400).json({error: "Internal Server error"})
    }
}

const getPropertyById = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        res.status(200).json({
            status: "success",
            data: property
        })

    
    }catch (error) {
        res.status(404).json({
            status: "fail",
            error: "Internal Server error"})

    }
        
}
export {getProperties, getPropertyById};