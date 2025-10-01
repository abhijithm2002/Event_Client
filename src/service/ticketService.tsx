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
  const { data } = await authInstance.get(`api/ticket/${userId}`);
  return data;
};

export const cancelTicket = async (ticketId: string) => {
  const { data } = await authInstance.put(`/api/${ticketId}/cancel`);
  return data;
};