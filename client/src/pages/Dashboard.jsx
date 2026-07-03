import { useEffect, useState } from "react";
import Loader from "../components/Loader";

import API from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import StatsCard from "../components/StatsCard";
import PerformanceChart from "../components/PerformanceChart";

const Dashboard = () => {

  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const res = await API.get("/dashboard");
      setDashboard(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!dashboard) {
    return (
      <div className="text-center mt-20">
       <Loader/>
      </div>
    );
  }

  return (
    <div className="flex bg-slate-100">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <div className="p-8">

          <h1 className="text-4xl font-bold mb-8">
            Dashboard
          </h1>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">

            <StatsCard
              title="Total Interviews"
              value={dashboard.totalInterviews}
              color="blue"
            />

            <StatsCard
              title="Average Score"
              value={dashboard.averageScore}
              color="green"
            />

          </div>

          <div className="grid md:grid-cols-3 gap-5 mt-8">

              <div className="bg-white rounded-xl shadow p-6">

                <h3 className="font-semibold">
                  Highest Score
                </h3>

                <h1 className="text-4xl font-bold text-green-600 mt-3">
                  {
                    Math.max(
                      ...dashboard.recentInterviews.map(
                        (i) => i.totalScore
                      ),
                      0
                    )
                  }
                </h1>

              </div>

              <div className="bg-white rounded-xl shadow p-6">

                <h3>
                  Completed Interviews
                </h3>

                <h1 className="text-4xl font-bold mt-3">
                  {dashboard.totalInterviews}
                </h1>

              </div>

              <div className="bg-white rounded-xl shadow p-6">

                <h3>
                  Average Score
                </h3>

                <h1 className="text-4xl font-bold text-blue-600 mt-3">
                  {dashboard.averageScore}
                </h1>

              </div>

            </div>

          <div className="bg-white rounded-xl shadow p-6 mt-10">

            <h2 className="text-2xl font-bold mb-6">
              Recent Interviews
            </h2>

            {dashboard.recentInterviews.length === 0 ? (
              <p>No Interview Found</p>
            ) : (
              dashboard.recentInterviews.map((item) => (
                <div
                  key={item._id}
                  className="border rounded-lg p-4 mb-4"
                >
                  <h3 className="font-bold">
                    {item.role}
                  </h3>

                  <p>
                    Difficulty : {item.difficulty}
                  </p>

                  <p>
                    Score : {item.totalScore}
                  </p>
                </div>
              ))
            )}

          </div>

<div className="mt-10">

<PerformanceChart

history={dashboard.recentInterviews}

/>

</div>


        </div>

      </div>

    </div>
  );
};

export default Dashboard;