import api from "./api";

export const getEvents =
  async () => {

    const response =
      await api.get("/events");

    return response.data;
  };

export const createEvent =
  async (data: any) => {

    const response =
      await api.post(
        "/events",
        data
      );

    return response.data;
  };

export const deleteEvent =
  async (id: number) => {

    const response =
      await api.delete(
        `/events/${id}`
      );

    return response.data;
  };