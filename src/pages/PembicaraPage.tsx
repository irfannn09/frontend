import {
  useEffect,
  useState,
} from "react";

import MainLayout from "../layouts/MainLayout";

import {
  getSpeakers,
  createSpeaker,
  deleteSpeaker,
} from "../services/speakerService";

type Speaker = {
  id: number;
  name: string;
  role: string;
  image: string;
};

const PembicaraPage = () => {

  const [speakers,
    setSpeakers] = useState<Speaker[]>([]);

  const [name,
    setName] = useState("");

  const [role,
    setRole] = useState("");

  const [image,
    setImage] = useState("");

  const [openModal,
    setOpenModal] = useState(false);

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
    fetchSpeakers();
  }, []);

  const handleCreate =
    async () => {

      try {

        await createSpeaker({
          name,
          role,
          image,
        });

        setName("");
        setRole("");
        setImage("");

        setOpenModal(false);

        fetchSpeakers();

      } catch (error) {

        console.log(error);

      }
    };

  const handleDelete =
    async (id: number) => {

      const confirmDelete =
        confirm(
          "Yakin hapus speaker?"
        );

      if (!confirmDelete) return;

      try {

        await deleteSpeaker(id);

        fetchSpeakers();

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
            Pembicara
          </h1>

          <button
            onClick={() =>
              setOpenModal(true)
            }
            className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded-xl"
          >
            Tambah Pembicara
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
                  Image
                </th>

                <th className="p-4 text-left">
                  Name
                </th>

                <th className="p-4 text-left">
                  Role
                </th>

                <th className="p-4 text-left">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {speakers.map(
                (item, index) => (

                  <tr
                    key={item.id}
                    className="border-b"
                  >

                    <td className="p-4">
                      {index + 1}
                    </td>

                    <td className="p-4">

                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />

                    </td>

                    <td className="p-4">
                      {item.name}
                    </td>

                    <td className="p-4">
                      {item.role}
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

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

          <div className="bg-white p-6 rounded-xl w-400px">

            <h1 className="text-2xl font-bold mb-5">
              Tambah Pembicara
            </h1>

            <input
              type="text"
              placeholder="Nama pembicara"
              className="w-full border p-3 rounded-lg mb-4"
              onChange={(e) =>
                setName(
                  e.target.value
                )
              }
            />

            <input
              type="text"
              placeholder="Role pembicara"
              className="w-full border p-3 rounded-lg mb-4"
              onChange={(e) =>
                setRole(
                  e.target.value
                )
              }
            />

            <input
              type="text"
              placeholder="Image URL"
              className="w-full border p-3 rounded-lg mb-5"
              onChange={(e) =>
                setImage(
                  e.target.value
                )
              }
            />

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

export default PembicaraPage;