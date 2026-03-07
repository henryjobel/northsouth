import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useProjectStore } from "../../../store/project/projectStore";
import { FaSpinner } from "react-icons/fa"; 

const UpdateProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { projects, updateProject,isLoading } = useProjectStore();

  const [loading, setLoading] = useState(true);

  // Project fields
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("Upcoming");

  // File inputs
  const [images, setImages] = useState([]);
  const [slideImages, setSlideImages] = useState([]);
  const [mapLocations, setMapLocations] = useState([]);

  // Existing images (URLs from DB)
  const [existingImages, setExistingImages] = useState([]);
  const [existingSlideImages, setExistingSlideImages] = useState([]);
  const [existingMapLocations, setExistingMapLocations] = useState([]);
  // Key photos (single image each)
const [keyPhotos, setKeyPhotos] = useState({
  basement: null,
  groundFloor: null,
  typicalFloor: null,
  roofFloor: null,
});
const [brochureFile, setBrochureFile] = useState(null);


  // Nested objects
  const [description, setDescription] = useState({
    generalFeature: "",
    elevator: "",
    bathroomFeature: "",
    kitchenDoor: "",
    maidsToilet: "",
  });

  const [specs, setSpecs] = useState({
    orientation: "",
    frontRoad: "",
    landSize: "",
    apartmentSize: "",
    apartments: "",
    parking: "",
    floors: "",
    handover: "",
    lifts: "",
    stairs: "",
    buildingType: "",
    address: "",
  });

  /* ================= FETCH PROJECT ================= */
  useEffect(() => {
    const project = projects.find((p) => p._id === id);
    if (project) {
      setTitle(project.title);
      setLocation(project.location);
      setStatus(project.status || "Upcoming");
      setDescription(project.description || {});
      setSpecs(project.specs || {});

      // Prefill existing images (to show in UI if needed)
      setExistingImages(project.image || []);
      setExistingSlideImages(project.slideImage || []);
      setExistingMapLocations(project.mapLocation || []);

      setLoading(false);
    } else {
      toast.error("Project not found in store");
      setLoading(false);
    }
  }, [id, projects]);

  /* ================= UPDATE ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
formData.append("title", title);
formData.append("location", location);
formData.append("status", status);

// Only append new files
if (images.length > 0) images.forEach(img => formData.append("image", img));
if (slideImages.length > 0) slideImages.forEach(img => formData.append("slideImage", img));
if (mapLocations.length > 0) mapLocations.forEach(img => formData.append("mapLocation", img));

// 🔹 KEY PHOTOS (IMPORTANT)
  if (keyPhotos.basement) {
    formData.append("basement", keyPhotos.basement);
  }

  if (keyPhotos.groundFloor) {
    formData.append("groundFloor", keyPhotos.groundFloor);
  }

  if (keyPhotos.typicalFloor) {
    formData.append("typicalFloor", keyPhotos.typicalFloor);
  }

  if (keyPhotos.roofFloor) {
    formData.append("roofFloor", keyPhotos.roofFloor);
  }
  if (brochureFile) formData.append("brochure", brochureFile);


// Nested objects as JSON
formData.append("description", JSON.stringify(description));
formData.append("specs", JSON.stringify(specs));


    try {
      await updateProject(id, formData); // Zustand handles API call & state
      toast.success("Project updated successfully!");
      navigate("/adminDashboard/viewProjects");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update project");
    }
  };

  if (loading) return <p className="p-6">Loading project...</p>;

  return (
    <div className="bg-gray-100 min-h-screen">
      <form onSubmit={handleSubmit} className="p-6 space-y-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center underline">Update Project</h2>

        {/* Title */}
        <div>
          <label className="font-semibold">Project Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full rounded"
            required
          />
        </div>

        {/* Location + Status */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="font-semibold">Location</label>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="border p-2 w-full rounded"
            />
          </div>
          <div>
            <label className="font-semibold">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border p-2 w-full rounded"
            >
              <option value="Ready">Ready</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Upcoming">Upcoming</option>
            </select>
          </div>
        </div>

        {/* Images (Optional on Update) */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-1 md:col-span-2">
            <label className="font-semibold">Project Images</label>
            <input
              type="file"
              multiple
              onChange={(e) => setImages([...e.target.files])}
            />
            {existingImages.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {existingImages.map((img, idx) => (
                  <img key={idx} src={img} alt={`existing-${idx}`} className="w-20 h-20 object-cover" />
                ))}
              </div>
            )}
          </div>

          <div className="space-y-1 md:col-span-2">
            <label className="font-semibold">Slide Images</label>
            <input
              type="file"
              multiple
              onChange={(e) => setSlideImages([...e.target.files])}
            />
            {existingSlideImages.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {existingSlideImages.map((img, idx) => (
                  <img key={idx} src={img} alt={`slide-${idx}`} className="w-20 h-20 object-cover" />
                ))}
              </div>
            )}
          </div>

          <div className="space-y-1 md:col-span-2">
            <label className="font-semibold">Map Location Images</label>
            <input
              type="file"
              multiple
              onChange={(e) => setMapLocations([...e.target.files])}
            />
            {existingMapLocations.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {existingMapLocations.map((img, idx) => (
                  <img key={idx} src={img} alt={`map-${idx}`} className="w-20 h-20 object-cover" />
                ))}
              </div>
            )}
          </div>
        </div>
        {/* KEY PHOTOS */}
<div className="grid md:grid-cols-2 gap-4">
  <div>
    <label className="font-semibold">Basement Photo</label>
    <input
      type="file"
      onChange={(e) =>
        setKeyPhotos({ ...keyPhotos, basement: e.target.files[0] })
      }
    />
  </div>

  <div>
    <label className="font-semibold">Ground Floor Photo</label>
    <input
      type="file"
      onChange={(e) =>
        setKeyPhotos({ ...keyPhotos, groundFloor: e.target.files[0] })
      }
    />
  </div>

  <div>
    <label className="font-semibold">Typical Floor Photo</label>
    <input
      type="file"
      onChange={(e) =>
        setKeyPhotos({ ...keyPhotos, typicalFloor: e.target.files[0] })
      }
    />
  </div>

  <div>
    <label className="font-semibold">Roof Floor Photo</label>
    <input
      type="file"
      onChange={(e) =>
        setKeyPhotos({ ...keyPhotos, roofFloor: e.target.files[0] })
      }
    />
  </div>

  <div>
    <label className="font-semibold">Brochure (PDF)</label>
    <input
      type="file"
      accept="application/pdf"
      onChange={(e) => setBrochureFile(e.target.files[0])}
    />
  </div>
</div>


        {/* Description */}
        <div className="grid md:grid-cols-2 gap-4">
          {Object.keys(description).map((key) => (
            <textarea
              key={key}
              value={description[key]}
              placeholder={key}
              onChange={(e) =>
                setDescription({ ...description, [key]: e.target.value })
              }
              className="border p-2 rounded"
            />
          ))}
        </div>

        {/* Specs */}
        <div className="grid md:grid-cols-2 gap-4">
          {Object.keys(specs).map((key) => (
            <input
              key={key}
              value={specs[key]}
              placeholder={key}
              onChange={(e) =>
                setSpecs({ ...specs, [key]: e.target.value })
              }
              className="border p-2 rounded"
            />
          ))}
        </div>

        <div className="flex justify-center">
         
           <button
                       type="submit"
                       className={`px-6 py-2 rounded flex items-center gap-2
                         ${isLoading 
                           ? "bg-gray-400 cursor-not-allowed" // disabled look
                           : "bg-blue-600 hover:bg-blue-700 text-white"}`
                       }
                       disabled={isLoading} // actually disables click
                     >
                       {isLoading && <FaSpinner className="animate-spin" />}
                       {isLoading ? "Updating..." : "Update Project"}
                     </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProject;
