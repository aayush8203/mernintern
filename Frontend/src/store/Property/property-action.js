import { propertyAction } from "./property-slice";
import { axiosInstance } from "../../utils/axios";

export const getAllProperties = () => async(dispatch,getState) => {
    try {
        console.log("API call started");
        dispatch(propertyAction.getRequest());
        const { searchParams } = getState().properties;
       
        const response = await axiosInstance.get("v1/rent/listing", { params: searchParams });

        if(!response){
            throw new Error("could not fetch properties");
        }

        const{data} = response;

        dispatch(propertyAction.getProperties(data));
    } catch (error) {
        console.error("Error fetching properties:", error);
    }
};
