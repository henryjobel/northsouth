import React, { useState } from "react";
import { useProjectStore } from "../../../store/project/projectStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa"; 

const CreateProject = () => {
   const navigate = useNavigate();
  const { addProject,loadProjects,isLoading } = useProjectStore();
const [loading, setLoading] = useState(false); // new loading state
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("Upcoming");
  const [images, setImages] = useState([]);
  const [slideImages, setSlideImages] = useState([]);
  const [basementFile, setBasementFile] = useState(null);
const [groundFloorFile, setGroundFloorFile] = useState(null);
const [typicalFloorFile, setTypicalFloorFile] = useState(null);
const [roofFloorFile, setRoofFloorFile] = useState(null);
const [brochureFile, setBrochureFile] = useState(null);

  const [mapLocations, setMapLocations] = useState([]);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("location", location);
    formData.append("status", status);

    // Append multiple images
    images.forEach((img) => formData.append("image", img));
    slideImages.forEach((img) => formData.append("slideImage", img));
    mapLocations.forEach((img) => formData.append("mapLocation", img));

    // key photos
formData.append("basement", basementFile);
formData.append("groundFloor", groundFloorFile);
formData.append("typicalFloor", typicalFloorFile);
formData.append("roofFloor", roofFloorFile);
if (brochureFile) formData.append("brochure", brochureFile);

    // Append description fields
    Object.keys(description).forEach((key) =>
      formData.append(`description[${key}]`, description[key])
    );

    // Append specs fields
    Object.keys(specs).forEach((key) => formData.append(`specs[${key}]`, specs[key]));

    try {
      
      await addProject(formData); // Zustand store handles API call & toast
      toast.success("Project added successfully!");
  
  // Reload the project list in store
  await loadProjects(); 
  navigate("/adminDashboard/viewProjects"); // go to project list
    } catch (err) {

      toast.error(err || "failed");
    }
    
  };


  return (
    <div className="bg-gray-100">
   <form onSubmit={handleSubmit} className="p-4 space-y-6">
<h2 className="w-full flex justify-center items-center text-3xl font-bold underline">Create Project</h2>
  {/* Project Title */}
  <div className="space-y-1">
    <label className="font-semibold">Project Title</label>
    <input
      type="text"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      className="border p-2 w-full rounded"
      required
    />
  </div>

  {/* First Row → Location + Status */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {/* Location */}
    <div className="space-y-1">
      <label className="font-semibold">Location</label>
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="border p-2 w-full rounded"
      />
    </div>

    {/* Status */}
    <div className="space-y-1">
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

  {/* Images */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    
    <div className="space-y-1">
      <label className="font-semibold">Project Images</label>
      <input
        type="file"
        multiple
        onChange={(e) => setImages([...e.target.files])}
        className="border p-2 w-full"
      />
    </div>

    <div className="space-y-1">
      <label className="font-semibold">Slide Images</label>
      <input
        type="file"
        multiple
        onChange={(e) => setSlideImages([...e.target.files])}
        className="border p-2 w-full"
      />
    </div>

    <div className="space-y-1 md:col-span-2">
      <label className="font-semibold">Map Location Images</label>
      <input
        type="file"
        multiple
        onChange={(e) => setMapLocations([...e.target.files])}
        className="border p-2 w-full"
      />
    </div>
<div className="space-y-1 md:col-span-2">
    <label className="font-semibold">Basement</label>
    <input className="border p-2 w-full" type="file" onChange={e => setBasementFile(e.target.files[0])} />
  </div>

  <div className="space-y-1 md:col-span-2">
    <label className="font-semibold">Ground Floor</label>
    <input className="border p-2 w-full" type="file" onChange={e => setGroundFloorFile(e.target.files[0])} />
  </div>

  <div className="space-y-1 md:col-span-2">
    <label className="font-semibold">Typical Floor</label>
    <input className="border p-2 w-full" type="file" onChange={e => setTypicalFloorFile(e.target.files[0])} />
  </div>

  <div className="space-y-1 md:col-span-2">
    <label className="font-semibold">Roof Floor</label>
    <input className="border p-2 w-full" type="file" onChange={e => setRoofFloorFile(e.target.files[0])} />
  </div>

  <div className="space-y-1 md:col-span-2">
    <label className="font-semibold">Brochure (PDF)</label>
    <input className="border p-2 w-full" type="file" accept="application/pdf" onChange={e => setBrochureFile(e.target.files[0])} />
  </div>
  </div>
  


  {/* Description Section */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

    <div className="space-y-1">
      <label className="font-semibold">General Feature</label>
      <textarea
        value={description.generalFeature}
        onChange={(e) =>
          setDescription({ ...description, generalFeature: e.target.value })
        }
        className="border p-2 w-full rounded"
      />
    </div>

    <div className="space-y-1">
      <label className="font-semibold">Elevator</label>
      <textarea
        value={description.elevator}
        onChange={(e) =>
          setDescription({ ...description, elevator: e.target.value })
        }
        className="border p-2 w-full rounded"
      />
    </div>

    <div className="space-y-1">
      <label className="font-semibold">Bathroom Features</label>
      <textarea
        value={description.bathroomFeature}
        onChange={(e) =>
          setDescription({ ...description, bathroomFeature: e.target.value })
        }
        className="border p-2 w-full rounded"
      />
    </div>

    <div className="space-y-1">
      <label className="font-semibold">Kitchen Door</label>
      <textarea
        value={description.kitchenDoor}
        onChange={(e) =>
          setDescription({ ...description, kitchenDoor: e.target.value })
        }
        className="border p-2 w-full rounded"
      />
    </div>

    <div className="space-y-1 md:col-span-2">
      <label className="font-semibold">Maid's Toilet</label>
      <textarea
        value={description.maidsToilet}
        onChange={(e) =>
          setDescription({ ...description, maidsToilet: e.target.value })
        }
        className="border p-2 w-full rounded"
      />
    </div>

  </div>

  {/* Specs Section – Two Inputs Per Row */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {Object.keys(specs).map((key) => (
      <div key={key} className="space-y-1">
        <label className="font-semibold capitalize">{key.split(/(?=[A-Z])/).join(" ")}</label>
        <input
          type="text"
          placeholder={key}
          value={specs[key]}
          onChange={(e) => setSpecs({ ...specs, [key]: e.target.value })}
          className="border p-2 w-full rounded"
        />
      </div>
    ))}
  </div>
<div className="w-full flex justify-center items-center">
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
             {isLoading ? "Creating..." : "Create"}
           </button>
  </div>
</form>
</div>
  );
};

export default CreateProject;
