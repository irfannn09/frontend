import api from "./api";

export const getSpeakers =
  async () => {

    const response =
      await api.get("/speakers");

    return response.data;
  };

export const createSpeaker =
  async (data: {
    name: string;
    role: string;
    image: string;
  }) => {

    const response =
      await api.post(
        "/speakers",
        data
      );

    return response.data;
  };

export const deleteSpeaker =
  async (id: number) => {

    const response =
      await api.delete(
        `/speakers/${id}`
      );

    return response.data;
  };