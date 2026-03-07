import { useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import "aos/dist/aos.css";
import "../../index.css";

import Projects from "../project/Projects";
import Carousel from "../../components/Carousel";
import ProjectLocationMap from "./ProjectLocationMap";
import { IoCloseOutline } from "react-icons/io5";
import {
  MdExplore,
  MdAddRoad,
  MdStraighten,
  MdAspectRatio,
  MdApartment,
  MdLocalParking,
  MdLayers,
  MdDateRange,
  MdElevator,
  MdStairs,
  MdDomain,
  MdLocationOn,
  MdWeekend,
  MdFitnessCenter,
  MdPool,
  MdOutdoorGrill,
  MdWater,
  MdChildCare,
  MdGroups,
  MdDoorbell,
} from "react-icons/md";


export default function ProjectDetails() {
  const buttons = ["Basement", "Ground Floor", "Typical Floor", "Roof Floor"];
  const { state } = useLocation();
  const { project } = state || {};

  if (!project) return <p>Card not found</p>;

  const [selectedFeature, setSelectedFeature] = useState(null);

  const [keyPlanOpen, setKeyPlanOpen] = useState(false);
  const [selectedKey, setSelectedKey] = useState(null);
  const [open, setOpen] = useState(false);
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  const handleKeyPlanOpen = (keyPhotos) => {
    setSelectedKey(keyPhotos);
    setKeyPlanOpen(true);
  };

  const handleKeyPlanClose = () => {
    setSelectedKey(false);
    setSelectedFeature(null);
  };
  // use image array from card
  const images = project.image || [];
  const maps = project.maps || [];
  const desc = project.description || {}; // single object
  const projectSpecs = project.specs || {};

  const specIcons = {
    orientation: <MdExplore />,
    frontRoad: <MdAddRoad />,
    landSize: <MdStraighten />,
    apartmentSize: <MdAspectRatio />,
    apartments: <MdApartment />,
    parking: <MdLocalParking />,
    floors: <MdLayers />,
    handover: <MdDateRange />,
    lifts: <MdElevator />,
    stairs: <MdStairs />,
    buildingType: <MdDomain />,
    address: <MdLocationOn />,
  };

  const slideImages = project.slideImage.filter(Boolean) || [];
  const keyPhotos = project.keyPhotos
    ? [
        project.keyPhotos.basement,
        project.keyPhotos.groundFloor,
        project.keyPhotos.typicalFloor,
        project.keyPhotos.roofFloor,
      ].filter(Boolean)
    : [];

  const photos = [...images, ...slideImages]; // combine all images
  const [current, setCurrent] = useState(0);

  const [galleryIndex, setGalleryIndex] = useState(0);

  const handleOpen = (index) => {
    setGalleryIndex(index);
    setSelectedFeature(photos[index]);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedFeature(null);
  };
  const handlePrev = () => {
    const newIndex = (galleryIndex - 1 + photos.length) % photos.length;
    setGalleryIndex(newIndex);
    setSelectedFeature(photos[newIndex]);
  };
  const handleNext = () => {
    const newIndex = (galleryIndex + 1) % photos.length;
    setGalleryIndex(newIndex);
    setSelectedFeature(photos[newIndex]);
  };

  const ref = useRef();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.remove("reveal");
          void el.offsetWidth;
          el.classList.add("reveal");
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full h-full">
      <div className="relative w-full">
        <Carousel images={slideImages} />
        <h1
          className="fade-scroll absolute inset-0 flex items-center justify-center 
             text-white text-2xl md:text-4xl lg:text-6xl font-bold 
             text-center px-8 py-6 md:px-16 md:py-10"
        >
          Welcome to {project.title} – Where Comfort Meets Luxury
        </h1>

        <div
          className="
  absolute 
  bottom-3 left-3                
  md:bottom-6 md:left-6         
  text-white 
  max-w-xs md:max-w-sm 
  space-y-2 md:space-y-3
"
        >
          <p className="text-xs md:text-sm lg:text-xl py-1 md:py-4">
            Spacious apartments with state-of-the-art amenities in the heart of
            Dhaka.
          </p>

          <button
            className="
    px-4 py-1 text-sm              
    md:px-6 md:py-2 md:text-base
    border-2 border-white 
    text-white font-semibold 
    rounded-md shadow-lg 
    hover:bg-green-700 transition
  "
          >
            Click Here
          </button>
        </div>
      </div>

      {/* SECTION 1 */}
      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 py-20 px-6">
        {/* LEFT TEXT */}
        <div
          className="flex flex-col justify-center"
          data-aos="fade-right"
          data-aos-duration="1000"
        >
          <h2 className="slide-title text-3xl md:text-4xl lg:text-5xl font-bold text-center lg:text-left">
            Features & Amenities
          </h2>

          <b className="py-4">GENERAL FEATURES</b>
          <p className="text-gray-700 text-lg leading-8 mt-6 text-center lg:text-left">
            {desc.generalFeature}
          </p>

          <b className="py-4">ELEVATOR</b>
          <p className="text-gray-700 text-lg leading-8 mt-2">
            {desc.elevator}
          </p>
        </div>

        {/* RIGHT IMAGE */}
        {images[4] && (
          <div
            className="flex justify-center"
            data-aos="fade-left"
            data-aos-duration="1000"
          >
            <img
              src={images[4]}
              alt="Project"
              className="rounded-xl w-full h-[80vh] object-contain"
            />
          </div>
        )}
      </div>

      {/* SECTION 2 */}
      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 px-6 pb-20">
        {/* IMAGE LEFT */}
        {images[2] && (
          <div className="flex" data-aos="fade-right" data-aos-duration="1000">
            <img
              src={images[2]}
              alt="Building"
              className="rounded-xl w-full h-[80vh] object-contain"
            />
          </div>
        )}

        {/* TEXT RIGHT */}
        <div
          className="flex flex-col justify-center"
          data-aos="fade-left"
          data-aos-duration="1000"
        >
          <b className="py-4">BATHROOM FEATURES</b>
          <p className="text-gray-700 text-lg leading-8 mt-6">
            {desc.bathroomFeature}
          </p>

          <b className="py-4">KITCHEN DOOR</b>
          <p className="text-gray-700 text-lg leading-8 mt-2">
            {desc.kitchenDoor}
          </p>

          <b className="py-4">MAIDS TOILET (IF ANY)</b>
          <p className="text-gray-700 text-lg leading-8 mt-2">
            {desc.maidsToilet}
          </p>
        </div>
      </div>

      {/* MAIN SECTION */}
      <section
        data-aos="fade-up"
        data-aos-duration="1000"
        className="w-full bg-gradient-to-br from-gray-50 to-white py-16"
      >
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-12 items-stretch">
          {/* LEFT: IMAGE SLIDER */}
          <div className="lg:w-1/2 w-full flex flex-col gap-4">
            <div className="relative w-full rounded-2xl overflow-hidden shadow-xl bg-white border border-gray-100 flex-1">
              <img
                src={images[current]}
                alt="project"
                className="w-full h-full object-cover duration-700"
              />
              {/* Image counter badge */}
              <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-3 py-1 rounded-full">
                {current + 1} / {images.length}
              </div>
            </div>

            {/* THUMBNAILS */}
            <div className="flex flex-wrap gap-2 justify-center">
              {images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  onClick={() => setCurrent(i)}
                  className={`w-14 h-14 object-cover rounded-lg cursor-pointer transition-all duration-200 border-2 ${
                    current === i
                      ? "border-green-500 scale-105 shadow-md"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* RIGHT: SPECIFICATION */}
          <div className="lg:w-1/2 w-full flex flex-col">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1.5 h-10 bg-green-500 rounded-full"></div>
                <h2 className="text-3xl font-bold text-gray-800 tracking-wide">
                  SPECIFICATION
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(projectSpecs).map(([key, value]) => (
                  <Specs
                    key={key}
                    icon={specIcons[key]}
                    label={
                      key
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase())
                    }
                    value={value}
                  />
                ))}
              </div>

              <button
                onClick={() => setEnquiryOpen(true)}
                className="bg-green-500 text-white font-semibold px-4 py-2 rounded-sm shadow-lg animate-bounce hover:scale-110 transition duration-300 ease-in-out mt-6"
              >
                Download Brochure
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* MAP SECTION - hidden for now, uncomment to use
      <div className="py-8">
        <ProjectLocationMap project={project} brochureUrl={project.brochure} projectTitle={project.title} />
      </div>
      */}

      {/* FEATURES & AMENITIES */}
      <section
        data-aos="fade-up"
        data-aos-duration="1000"
        className="w-full bg-gradient-to-br from-gray-50 to-white py-20 px-6"
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col items-center mb-14">
            <p className="text-green-600 text-sm font-semibold uppercase tracking-widest mb-2">What We Offer</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center">
              Features &amp; Amenities
            </h2>
            <div className="w-16 h-1 bg-green-500 rounded-full mt-4" />
            <p className="text-gray-500 mt-4 text-center max-w-xl text-sm">
              Experience world-class facilities designed for modern living.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
            {[
              { icon: <MdWeekend />, label: "Grand Waiting Lounge" },
              { icon: <MdFitnessCenter />, label: "Gymnasium" },
              { icon: <MdPool />, label: "Rooftop Infinity Pool" },
              { icon: <MdOutdoorGrill />, label: "BBQ Station" },
              { icon: <MdWater />, label: "Water Body" },
              { icon: <MdChildCare />, label: "Children Play Area" },
              { icon: <MdGroups />, label: "Community Space" },
              { icon: <MdDoorbell />, label: "Reception Area" },
            ].map((item, i) => (
              <div
                key={i}
                className="group flex flex-col items-center gap-4 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-green-200 hover:-translate-y-1 transition-all duration-300 cursor-default"
              >
                <div className="w-16 h-16 rounded-2xl bg-green-50 group-hover:bg-green-500 flex items-center justify-center text-4xl text-green-500 group-hover:text-white transition-all duration-300 shadow-sm">
                  {item.icon}
                </div>
                <p className="text-gray-700 group-hover:text-green-700 font-semibold text-sm text-center leading-tight transition-colors duration-300">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="bg-gradient-to-r from-green-50 to-green-100 py-16 mt-15">
        {/* Title */}
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-10 animate-fadeInDown">
          Key Plan
        </h2>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-6">
          {buttons.map((btn, index) => (
            <button
              key={index}
              onClick={() => handleKeyPlanOpen(keyPhotos[index])} // pass the correct image
              className={`bg-green-500 text-white font-semibold px-6 py-3 rounded-lg shadow-lg
                       transform transition-all duration-500 hover:scale-110 hover:bg-gradient-to-r hover:from-green-200 hover:to-green-600
        hover:shadow-green-500/50
                       animate-bounceAnimation`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {btn}
            </button>
          ))}
        </div>
        {/* Modal */}
        {keyPlanOpen && selectedKey && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full relative">
              {/* Close Button */}
              <button
                onClick={handleKeyPlanClose}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-4xl"
              >
                <IoCloseOutline />
              </button>

              {/* Modal Photo */}
              <img
                src={selectedKey} // use selectedFeature directly
                alt="Selected"
                className="w-full h-[70dvh] object-contain rounded-lg"
              />
            </div>
          </div>
        )}
      </div>
     
      <div className="w-full bg-white py-16">
        {/* Header */}
        <div className="flex flex-col items-center mb-10">
          <h2 className="text-4xl font-bold text-gray-900 tracking-widest uppercase">
            Photo Gallery
          </h2>
          <div className="w-20 h-1 bg-green-500 rounded-full mt-3"></div>
          <p className="text-gray-400 mt-2 text-sm">{photos.length} photos</p>
        </div>

        <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-1">
          {photos.map((photo, i) => (
            <div
              onClick={() => handleOpen(i)}
              key={i}
              className="relative group overflow-hidden cursor-pointer aspect-square"
            >
              <img
                src={photo}
                className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                <div className="text-white text-3xl opacity-80">⊕</div>
              </div>
              {/* Index badge */}
              <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition">
                {i + 1}
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {open && selectedFeature && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
            {/* Close */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-white hover:text-gray-300 text-5xl z-10"
            >
              <IoCloseOutline />
            </button>

            {/* Counter */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-4 py-1 rounded-full">
              {galleryIndex + 1} / {photos.length}
            </div>

            {/* Prev Button */}
            <button
              onClick={handlePrev}
              className="absolute left-4 text-white text-5xl bg-black/40 hover:bg-black/70 w-12 h-12 rounded-full flex items-center justify-center transition"
            >
              ‹
            </button>

            {/* Image */}
            <img
              src={selectedFeature}
              alt="Selected"
              className="max-h-[85vh] max-w-[85vw] object-contain rounded-lg shadow-2xl"
            />

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="absolute right-4 text-white text-5xl bg-black/40 hover:bg-black/70 w-12 h-12 rounded-full flex items-center justify-center transition"
            >
              ›
            </button>

            {/* Thumbnail strip */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-[90vw] px-2">
              {photos.map((p, i) => (
                <img
                  key={i}
                  src={p}
                  onClick={() => { setGalleryIndex(i); setSelectedFeature(photos[i]); }}
                  className={`w-12 h-12 object-cover rounded cursor-pointer border-2 shrink-0 transition ${
                    i === galleryIndex ? "border-green-400 scale-110" : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <Projects />

      {/* ENQUIRY MODAL (from SPECIFICATION button) */}
      {enquiryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full relative h-screen overflow-auto scrollbar-hide">
            <button
              onClick={() => setEnquiryOpen(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-800 text-4xl"
            >
              <IoCloseOutline />
            </button>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 py-16 px-4">
              <div className="w-full max-w-xl bg-white shadow-2xl rounded-2xl p-8 animate-fadeIn">
                <h2 className="text-3xl font-bold text-center text-green-700 mb-8">
                  Enquiry Form <br />
                  <span className="text-gray-700 text-lg">For North South Duplex Home</span>
                </h2>
                <form className="space-y-6" onSubmit={(e) => {
                  e.preventDefault();
                  const link = document.createElement("a");
                  link.href = project.brochure || "/nspdf.pdf";
                  link.download = `${project.title || "Brochure"}.pdf`;
                  link.target = "_blank";
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                  setEnquiryOpen(false);
                }}>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">Full Name</label>
                    <input type="text" placeholder="Enter your full name" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-400 focus:outline-none transition" />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">Email Address</label>
                    <input type="email" placeholder="Enter your email address" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-400 focus:outline-none transition" />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">Contact Address</label>
                    <textarea placeholder="Enter your contact address" rows="3" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-400 focus:outline-none transition"></textarea>
                  </div>
                  <div className="text-center">
                    <button type="submit" className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg shadow-lg transform transition hover:bg-green-700 hover:scale-105">
                      Submit Enquiry
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Specs({ label, value, icon }) {
  return (
    <div className="flex items-center gap-4 bg-gray-50 hover:bg-green-50 border border-gray-100 hover:border-green-200 rounded-xl px-4 py-3 transition-all duration-200">
      <div className="text-3xl text-green-500 shrink-0">{icon}</div>
      <div>
        <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">{label}</p>
        <p className="text-gray-800 font-semibold text-sm mt-0.5">{value}</p>
      </div>
    </div>
  );
}
