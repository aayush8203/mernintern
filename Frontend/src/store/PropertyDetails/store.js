import {configureStore} from '@reduxjs/toolkit';
import propertySlice from './Property/property-slice';
import propertyDetailsSlice from './PropertyDetails/propertyDetails-slice'; 


const store = configureStore({
    reducer:{
        properties: propertySlice.reducer,
        propertyDetails: propertyDetailsSlice.reducer
    }
})

export default store;