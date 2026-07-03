import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Profile = () => {

  const [user, setUser] = useState({
    name: "",
    email: "",
    skills: "",
    github: "",
    linkedin: "",
  });

  const [selectedFile, setSelectedFile] = useState("");

  const [uploading, setUploading] = useState(false);
  const fileRef = useRef();

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await API.get("/auth/profile");
      setUser(res.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const updateProfile = async (e) => {
    e.preventDefault();

    try {
     await API.put("/auth/profile", user);
     toast.success("Profile Updated");
    } catch (error) {
      console.log(error);
    }
  };


const uploadResume = async () => {

  console.log("Selected File:", fileRef.current.files);

  if (!fileRef.current.files[0]) {
    toast.error("Please select a PDF file.");
    return;
  }

  const formData = new FormData();

  formData.append("resume", fileRef.current.files[0]);

   setUploading(true);

  try {

    const res = await API.post(
      "/auth/resume",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(res.data);
    toast.success("Resume Uploaded");

    setSelectedFile("");

        if (fileRef.current) {
          fileRef.current.value = "";
        }

  } catch (error) {

    console.log(error.response?.data);

    toast.error(
  error.response?.data?.message || "Upload Failed"
);

  }
  
   finally {
     setUploading(false);
   }
};

// change end


  return (
    <div className="flex min-h-screen bg-slate-100">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <div className="max-w-4xl mx-auto p-8">

          <div className="bg-white rounded-xl shadow-lg p-8">

            <h1 className="text-3xl font-bold mb-8">
              My Profile
            </h1>

            <form onSubmit={updateProfile}>

              <div className="grid md:grid-cols-2 gap-6">

                <div>

                  <label>Name</label>

                  <input
                    className="w-full border p-3 rounded-lg mt-2"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                  />

                </div>

                <div>

                  <label>Email</label>

                  <input
                    className="w-full border p-3 rounded-lg mt-2"
                    value={user.email}
                    disabled
                  />

                </div>

                <div>

                  <label>Skills</label>

                  <input
                    className="w-full border p-3 rounded-lg mt-2"
                    name="skills"
                    value={user.skills || ""}
                    onChange={handleChange}
                  />

                </div>

                <div>

                  <label>GitHub</label>

                  <input
                    className="w-full border p-3 rounded-lg mt-2"
                    name="github"
                    value={user.github || ""}
                    onChange={handleChange}
                  />

                </div>

                <div className="md:col-span-2">

                  <label>LinkedIn</label>

                  <input
                    className="w-full border p-3 rounded-lg mt-2"
                    name="linkedin"
                    value={user.linkedin || ""}
                    onChange={handleChange}
                  />

                </div>

              </div>

              <button
                className="mt-8 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700"
              >
                Save Profile
              </button>

             <div className="mt-10 border-2 border-dashed border-gray-300 rounded-2xl p-6 bg-gray-50 hover:border-blue-500 transition-all duration-300">

                <h2 className="text-xl font-bold mb-2">
                  📄 Upload Resume (PDF)
                </h2>

                <p className="text-gray-500 mb-6">
                  Upload your latest resume. Only PDF files are allowed.
                </p>

                <div className="flex flex-col md:flex-row items-center justify-between gap-5">

                  <div className="flex items-center">

                    <label
                      htmlFor="resume"
                      className="
                      cursor-pointer
                      bg-slate-800
                      hover:bg-black
                      active:scale-95
                      transition-all
                      duration-200
                      text-white
                      px-6
                      py-3
                      rounded-l-xl
                      font-semibold
                      shadow-md
                      "
                    >
                      📁 Choose File
                    </label>

                    <input
                      id="resume"
                      type="file"
                      accept=".pdf"
                      ref={fileRef}
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files[0]) {
                          setSelectedFile(e.target.files[0].name);
                        }
                      }}
                    />
                    <div className="border border-l-0 bg-white px-5 py-3 rounded-r-xl min-w-57.5 text-gray-600">

                      {selectedFile || "No file chosen"}

                    </div>

                  </div>

                  <button
                    type="button"
                    onClick={uploadResume}
                    className="
                    bg-green-600
                    hover:bg-green-700
                    active:scale-95
                    active:shadow-inner
                    transition-all
                    duration-200
                    text-white
                    font-semibold
                    px-8
                    py-3
                    rounded-xl
                    shadow-lg
                    "
                  >
                    {uploading ? "Uploading..." : "☁ Upload"}
                  </button>

                </div>

                <p className="text-sm text-gray-500 mt-4">
                  Maximum File Size : 5 MB
                </p>

              </div>

            </form>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Profile;