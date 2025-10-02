import authInstance from "../api/axiosInstance";

export const bookTicket = async (eventId: string, userId: string, quantity: number) => {
  const { data } = await authInstance.post(`api/ticket/bookTicket`, {
    eventId,
    userId,
    quantity
  });
  return data;
};

export const getMyTickets = async (userId: string) => {
  const { data } = await authInstance.get(`api/ticket/getMyTicket/${userId}`);
  console.log('response in fetching tickets', data);
  return data;
};


export const cancelTicket = async (ticketId: string) => {
  const { data } = await authInstance.delete(`api/ticket/cancelTicket/${ticketId}`);
  return data;
};