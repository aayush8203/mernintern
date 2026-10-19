import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    bookings: [],
    bookingDetails: {},
    loading: false,

}

const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {
        setBookingRequest(state) {
            state.loading = true;
        },
        setBookings(state, action) {
            state.bookings = action.payload?.data?.bookings || action.payload?.bookings || (Array.isArray(action.payload) ? action.payload : []);
            state.loading = false;
        },
        addBooking(state, action) {
            state.bookings.push(action.payload);
            state.loading = false;
        },
        setBookingDetails(state, action) {
            state.bookingDetails = action.payload?.data?.bookings || action.payload?.bookings || action.payload || {};
            state.loading = false;
        }
    }
})

export const {setBookings, addBooking, setBookingDetails} = bookingSlice.actions;
export default bookingSlice; 
