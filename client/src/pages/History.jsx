import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const History = () => {
  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const res = await API.get("/interview/history");
      setHistory(res.data.interviews);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredHistory = history.filter((item) => {
  return (
    item.role.toLowerCase().includes(search.toLowerCase()) ||
    item.difficulty.toLowerCase().includes(search.toLowerCase()) ||
    item.totalScore.toString().includes(search) ||
    new Date(item.createdAt)
      .toLocaleDateString()
      .includes(search)
  );
});

  return (
    <div className="flex bg-slate-100 min-h-screen">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <div className="p-8">

          <div className="flex justify-between items-center mb-8">

            <h1 className="text-4xl font-bold">
              Interview History
            </h1>

            <input
              type="text"
              placeholder="Search Interview..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border rounded-lg px-4 py-3 w-80"
            />

          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">

            <table className="w-full">

              <thead className="bg-blue-600 text-white">

                <tr>

                  <th className="p-4 text-left">Role</th>

                  <th className="p-4 text-left">Difficulty</th>

                  <th className="p-4 text-left">Questions</th>

                  <th className="p-4 text-left">Score</th>

                  <th className="p-4 text-left">Date</th>

                  <th className="p-4 text-center">Action</th>

                </tr>

              </thead>

              <tbody>

                {filteredHistory.length === 0 ? (

                  <tr>

                    <td
                      colSpan="6"
                      className="text-center py-8"
                    >
                      No Interview Found
                    </td>

                  </tr>

                ) : (

                  filteredHistory.map((item) => (

                    <tr
                      key={item._id}
                      className="border-b"
                    >

                      <td className="p-4">
                        {item.role}
                      </td>

                      <td className="p-4">
                        {item.difficulty}
                      </td>

                      <td className="p-4">
                        {item.questions.length}
                      </td>

                      <td className="p-4">
                        {item.totalScore}
                      </td>

                      <td className="p-4">
                        {new Date(
                          item.createdAt
                        ).toLocaleDateString()}
                      </td>

                      <td className="p-4 text-center">

                        <button
                          onClick={() =>
                            navigate("/result", {
                              state: {
                                interviewId: item._id,
                              },
                            })
                          }
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                        >
                          View Result
                        </button>

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
};

export default History;