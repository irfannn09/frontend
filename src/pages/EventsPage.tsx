import {
  useEffect,
  useState,
} from "react";

import MainLayout from "../layouts/MainLayout";

import {
  getEvents,
  createEvent,
  deleteEvent,
} from "../services/eventService";

import {
  getCategories,
} from "../services/categoryService";

import {
  getSpeakers,
} from "../services/speakerService";

type Category = {
  id: number;
  name: string;
};

type Speaker = {
  id: number;
  name: string;
};

type EventType = {
  id: number;
  name: string;
  location: string;
  dateEvent: string;
  description: string;

  category: {
    name: string;
  };

  speaker: {
    name: string;
  };
};

const EventsPage = () => {

  const [events,
    setEvents] =
    useState<EventType[]>([]);

  const [categories,
    setCategories] =
    useState<Category[]>([]);

  const [speakers,
    setSpeakers] =
    useState<Speaker[]>([]);

  const [name,
    setName] = useState("");

  const [location,
    setLocation] = useState("");

  const [dateEvent,
    setDateEvent] = useState("");

  const [description,
    setDescription] = useState("");

  const [categoryId,
    setCategoryId] = useState(0);

  const [speakerId,
    setSpeakerId] = useState(0);

  const [openModal,
    setOpenModal] = useState(false);

  // FETCH EVENTS

  const fetchEvents =
    async () => {

      try {

        const data =
          await getEvents();

        setEvents(data);

      } catch (error) {

        console.log(error);

      }
    };

  // FETCH CATEGORIES

  const fetchCategories =
    async () => {

      try {

        const data =
          await getCategories();

        setCategories(data);

      } catch (error) {

        console.log(error);

      }
    };

  // FETCH SPEAKERS

  const fetchSpeakers =
    async () => {

      try {

        const data =
          await getSpeakers();

        setSpeakers(data);

      } catch (error) {

        console.log(error);

      }
    };

  useEffect(() => {

    fetchEvents();

    fetchCategories();

    fetchSpeakers();

  }, []);

  // CREATE EVENT

  const handleCreate =
    async () => {

      try {

        await createEvent({
          name,
          location,
          dateEvent,
          description,
          categoryId,
          speakerId,
        });

        setName("");
        setLocation("");
        setDateEvent("");
        setDescription("");

        setOpenModal(false);

        fetchEvents();

      } catch (error) {

        console.log(error);

      }
    };

  // DELETE EVENT

  const handleDelete =
    async (id: number) => {

      const confirmDelete =
        confirm(
          "Yakin hapus event?"
        );

      if (!confirmDelete) return;

      try {

        await deleteEvent(id);

        fetchEvents();

      } catch (error) {

        console.log(error);

      }
    };

  return (

    <MainLayout>

      <div className="bg-white p-6 rounded-xl shadow-lg">

        {/* HEADER */}

        <div className="flex justify-between items-center mb-6">

          <h1 className="text-3xl font-bold">
            Events
          </h1>

          <button
            onClick={() =>
              setOpenModal(true)
            }
            className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded-xl"
          >
            Tambah Event
          </button>

        </div>

        {/* TABLE */}

        <div className="overflow-x-auto">

          <table className="w-full border-collapse">

            <thead>

              <tr className="bg-gray-100">

                <th className="p-4 text-left">
                  No
                </th>

                <th className="p-4 text-left">
                  Event
                </th>

                <th className="p-4 text-left">
                  Category
                </th>

                <th className="p-4 text-left">
                  Speaker
                </th>

                <th className="p-4 text-left">
                  Location
                </th>

                <th className="p-4 text-left">
                  Date
                </th>

                <th className="p-4 text-left">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {events.map(
                (item, index) => (

                  <tr
                    key={item.id}
                    className="border-b"
                  >

                    <td className="p-4">
                      {index + 1}
                    </td>

                    <td className="p-4">
                      {item.name}
                    </td>

                    <td className="p-4">
                      {item.category.name}
                    </td>

                    <td className="p-4">
                      {item.speaker.name}
                    </td>

                    <td className="p-4">
                      {item.location}
                    </td>

                    <td className="p-4">
                      {item.dateEvent}
                    </td>

                    <td className="p-4">

                      <button
                        onClick={() =>
                          handleDelete(
                            item.id
                          )
                        }
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                      >
                        Delete
                      </button>

                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* MODAL */}

      {openModal && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center overflow-auto p-5">

          <div className="bg-white p-6 rounded-xl w-500px">

            <h1 className="text-2xl font-bold mb-5">
              Tambah Event
            </h1>

            {/* EVENT NAME */}

            <input
              type="text"
              placeholder="Nama Event"
              className="w-full border p-3 rounded-lg mb-4"
              onChange={(e) =>
                setName(
                  e.target.value
                )
              }
            />

            {/* CATEGORY */}

            <select
              className="w-full border p-3 rounded-lg mb-4"
              onChange={(e) =>
                setCategoryId(
                  Number(
                    e.target.value
                  )
                )
              }
            >

              <option value="">
                Pilih Category
              </option>

              {categories.map(
                (item) => (

                  <option
                    key={item.id}
                    value={item.id}
                  >
                    {item.name}
                  </option>
                )
              )}

            </select>

            {/* SPEAKER */}

            <select
              className="w-full border p-3 rounded-lg mb-4"
              onChange={(e) =>
                setSpeakerId(
                  Number(
                    e.target.value
                  )
                )
              }
            >

              <option value="">
                Pilih Speaker
              </option>

              {speakers.map(
                (item) => (

                  <option
                    key={item.id}
                    value={item.id}
                  >
                    {item.name}
                  </option>
                )
              )}

            </select>

            {/* LOCATION */}

            <input
              type="text"
              placeholder="Location"
              className="w-full border p-3 rounded-lg mb-4"
              onChange={(e) =>
                setLocation(
                  e.target.value
                )
              }
            />

            {/* DATE */}

            <input
              type="date"
              className="w-full border p-3 rounded-lg mb-4"
              onChange={(e) =>
                setDateEvent(
                  e.target.value
                )
              }
            />

            {/* DESCRIPTION */}

            <textarea
              placeholder="Description"
              className="w-full border p-3 rounded-lg mb-5"
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
            />

            {/* BUTTON */}

            <div className="flex justify-end gap-3">

              <button
                onClick={() =>
                  setOpenModal(false)
                }
                className="bg-gray-300 px-5 py-2 rounded-lg"
              >
                Batal
              </button>

              <button
                onClick={handleCreate}
                className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg"
              >
                Simpan
              </button>

            </div>

          </div>

        </div>
      )}

    </MainLayout>
  );
};

export default EventsPage;