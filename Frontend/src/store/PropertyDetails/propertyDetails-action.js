import { propertyDetailsActions } from "./propertyDetails-slice";
import {axiosInstance} from "../../utils/axios";


export const getPropertyDetails = (Id) => async (dispatch) => {

    try{
        dispatch(propertyDetailsActions.getListRequest());
        const response = await axiosInstance.get(`/v1/rent/listing/${Id}`);
        if(!response){
            throw new Error('could not fetch data');
        }
        const data = response.data;
        dispatch(propertyDetailsActions.getPropertyDetails(data));
    } catch (error) {
        dispatch(propertyDetailsActions.getErrors(error.response.data.message));
    }

}