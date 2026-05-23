import {
  useEffect,
  useState,
} from "react";

import MainLayout from "../layouts/MainLayout";

import { getDashboard } from "../services/dashboardService";

const DashboardPage = () => {

  const [data,
    setData] = useState({
      categories: 0,
      speakers: 0,
      events: 0,
    });

  const fetchDashboard =
    async () => {

      try {

        const res =
          await getDashboard();

        setData(res);

      } catch (error) {

        console.log(error);

      }
    };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (

    <MainLayout>

      <div>

        <h1 className="text-3xl font-bold mb-6">
          Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* CATEGORY */}

          <div className="bg-white p-6 rounded-xl shadow-lg">

            <h2 className="text-gray-500">
              Total Categories
            </h2>

            <p className="text-4xl font-bold mt-3">
              {data.categories}
            </p>

          </div>

          {/* SPEAKER */}

          <div className="bg-white p-6 rounded-xl shadow-lg">

            <h2 className="text-gray-500">
              Total Speakers
            </h2>

            <p className="text-4xl font-bold mt-3">
              {data.speakers}
            </p>

          </div>

          {/* EVENT */}

          <div className="bg-white p-6 rounded-xl shadow-lg">

            <h2 className="text-gray-500">
              Total Events
            </h2>

            <p className="text-4xl font-bold mt-3">
              {data.events}
            </p>

          </div>

        </div>

      </div>

    </MainLayout>
  );
};

export default DashboardPage;