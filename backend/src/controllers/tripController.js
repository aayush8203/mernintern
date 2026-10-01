import property from "../Models/propertyModel.js"
import {planTrip} from "../ai/tripPlanner.js"
import {generateDescription} from "../ai/generateDescription.js"

const cleancity = (text) => text.toLowerCase().replaceAll(" ","")

const createTripPlan = async (req, res) => {
    try{
        const {destination, budget, days,people,interests} = req.body

        if(!destination || !budget || !days || !people){
            return res.status(400).json({error: "Please provide all required fields"})
        }

        const plan = await planTrip({destination, budget, days, people, interests : interests || []})

        const perNight = Number(budget) / Number(days);
        const city = cleancity(destination);

        const properties = await property.find({
            $or: [
                {"address.city": city},
                {"address.area": city},
                {"address.state": city}

            ],
            price: {$lte: perNight},
            maximumGuests: {$gte: Number(people)}
        }).limit(6);

        res.status(200).json({
            status: "success",
            data:{plan, properties,perNight}
        })

    }catch(error){
        res.status(500).json({
            status: "fail",
            message:"please try again later",
        })

    }
}

const writeDescription = async (req, res) => {
    try{
            const description = await generateDescription(req.body);
    res.status(200).json({ status: "success", data: { description } });
    }catch(error){
        res.status(500).json({
            status: "fail",
            message:"could not generate description, please try again later",
        })
    }
  
}
export {createTripPlan, writeDescription};