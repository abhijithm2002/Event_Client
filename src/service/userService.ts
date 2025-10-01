import authInstance from "../api/axiosInstance";

export const refreshAccessToken = async () => {
    const response = await authInstance.post(`api/event/refresh-token`, { withCredentials: true });
    return response.data;
};

// Create Event API
export const createEvent = async (eventData: any, organizerId: any) => {
    console.log('eventData', eventData);
    const body = {eventData, organizerId }; // send both in body
    const response = await authInstance.post(`api/event/createEvent`, body);
    console.log('response from create event', response);
    return response.data;
};


// Fetch All Events
export const getAllEvents = async () => {
    const response = await authInstance.get(`api/event/getAllEvents`);
    console.log('resposne of getAll events', response)
    return response.data;
};

export const getMyEvents = async (organizerId: string) => {
    const response = await authInstance.get(`api/event/getMyEvents`, {
        params: { organizerId }
    });
    console.log('response of getMyEvents', response);
    return response.data;
};

export const getEventById = async (eventId: string) => {
    const response = await authInstance.get(`api/event/getEventById`, {
        params: { eventId }
    });
    console.log('response of getMyEvents', response);
    return response.data;
};
