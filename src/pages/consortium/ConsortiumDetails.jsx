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
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 pointer-events-none" />

        {/* Title + Description + Button — all centered together */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6 gap-5">
          <span className="text-xs md:text-sm uppercase tracking-[0.25em] text-green-400 font-semibold bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-sm border border-white/20">
            Premium Living
          </span>
          <h1 className="fade-scroll text-2xl md:text-4xl lg:text-6xl font-bold leading-tight drop-shadow-lg">
            Welcome to <span className="text-green-400">{project.title}</span>
            <br className="hidden md:block" />
            <span className="font-light"> – Where Comfort Meets Luxury</span>
          </h1>
          <p className="text-xs md:text-sm lg:text-lg max-w-2xl text-white/80 leading-relaxed">
            Spacious apartments with state-of-the-art amenities in the heart of Dhaka.
          </p>
          <button className="mt-2 px-8 py-3 text-sm md:px-10 md:py-3.5 md:text-base bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full shadow-xl shadow-green-500/30 hover:shadow-green-500/50 transition-all duration-300 hover:scale-105 tracking-wide">
            Explore Now
          </button>
        </div>
      </div>

      {/* SECTION 1 */}
      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 py-20 px-6">
        {/* LEFT TEXT */}
        <div
          className="flex flex-col justify-center"
          data-aos="fade-right"
          data-aos-duration="1000"
        >
          <p className="text-green-600 text-xs font-bold uppercase tracking-[0.2em] mb-3">What We Offer</p>
          <h2 className="slide-title text-3xl md:text-4xl lg:text-5xl font-bold text-center lg:text-left mb-8 text-gray-900 leading-tight">
            Features &amp; <span className="text-green-600">Amenities</span>
          </h2>

          <div className="space-y-6">
            <div className="group p-5 rounded-2xl border border-gray-100 hover:border-green-200 hover:bg-green-50/50 transition-all duration-300">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1 h-5 bg-green-500 rounded-full"></div>
                <span className="text-xs font-bold uppercase tracking-widest text-green-700">General Features</span>
              </div>
              <p className="text-gray-600 text-base leading-7 pl-3">
                {desc.generalFeature}
              </p>
            </div>

            <div className="group p-5 rounded-2xl border border-gray-100 hover:border-green-200 hover:bg-green-50/50 transition-all duration-300">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1 h-5 bg-green-500 rounded-full"></div>
                <span className="text-xs font-bold uppercase tracking-widest text-green-700">Elevator</span>
              </div>
              <p className="text-gray-600 text-base leading-7 pl-3">
                {desc.elevator}
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        {images[4] && (
          <div
            className="flex justify-center"
            data-aos="fade-left"
            data-aos-duration="1000"
          >
            <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl shadow-gray-200">
              <img
                src={images[4]}
                alt="Project"
                className="w-full h-[80vh] object-contain"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-3xl pointer-events-none" />
            </div>
          </div>
        )}
      </div>

      {/* SECTION 2 */}
      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 px-6 pb-24">
        {/* IMAGE LEFT */}
        {images[2] && (
          <div className="flex" data-aos="fade-right" data-aos-duration="1000">
            <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl shadow-gray-200">
              <img
                src={images[2]}
                alt="Building"
                className="w-full h-[80vh] object-contain"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-3xl pointer-events-none" />
            </div>
          </div>
        )}

        {/* TEXT RIGHT */}
        <div
          className="flex flex-col justify-center"
          data-aos="fade-left"
          data-aos-duration="1000"
        >
          <div className="space-y-6">
            <div className="group p-5 rounded-2xl border border-gray-100 hover:border-green-200 hover:bg-green-50/50 transition-all duration-300">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1 h-5 bg-green-500 rounded-full"></div>
                <span className="text-xs font-bold uppercase tracking-widest text-green-700">Bathroom Features</span>
              </div>
              <p className="text-gray-600 text-base leading-7 pl-3">{desc.bathroomFeature}</p>
            </div>

            <div className="group p-5 rounded-2xl border border-gray-100 hover:border-green-200 hover:bg-green-50/50 transition-all duration-300">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1 h-5 bg-green-500 rounded-full"></div>
                <span className="text-xs font-bold uppercase tracking-widest text-green-700">Kitchen Door</span>
              </div>
              <p className="text-gray-600 text-base leading-7 pl-3">{desc.kitchenDoor}</p>
            </div>

            <div className="group p-5 rounded-2xl border border-gray-100 hover:border-green-200 hover:bg-green-50/50 transition-all duration-300">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1 h-5 bg-green-500 rounded-full"></div>
                <span className="text-xs font-bold uppercase tracking-widest text-green-700">Maids Toilet (If Any)</span>
              </div>
              <p className="text-gray-600 text-base leading-7 pl-3">{desc.maidsToilet}</p>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN SECTION */}
      <section
        data-aos="fade-up"
        data-aos-duration="1000"
        className="w-full bg-gradient-to-br from-slate-50 via-white to-green-50/30 py-20"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center mb-12">
            <p className="text-green-600 text-xs font-bold uppercase tracking-[0.2em] mb-2">Project Details</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Overview &amp; <span className="text-green-600">Specification</span></h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-green-500 to-transparent mt-4" />
          </div>

          <div className="flex flex-col lg:flex-row gap-10 items-stretch">
          {/* LEFT: IMAGE SLIDER */}
          <div className="lg:w-1/2 w-full flex flex-col gap-4">
            <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl shadow-gray-200/80 bg-white border border-gray-100 flex-1">
              <img
                src={images[current]}
                alt="project"
                className="w-full h-full object-cover duration-700"
              />
              {/* Image counter badge */}
              <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full font-medium">
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
                  className={`w-14 h-14 object-cover rounded-xl cursor-pointer transition-all duration-200 border-2 ${
                    current === i
                      ? "border-green-500 scale-110 shadow-lg shadow-green-200"
                      : "border-transparent opacity-60 hover:opacity-100 hover:scale-105"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* RIGHT: SPECIFICATION */}
          <div className="lg:w-1/2 w-full flex flex-col">
            <div className="bg-white rounded-3xl shadow-2xl shadow-gray-100 border border-gray-100 p-8 flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-100">
                <div className="w-1 h-10 bg-gradient-to-b from-green-400 to-green-600 rounded-full"></div>
                <div>
                  <p className="text-xs text-green-600 font-semibold uppercase tracking-widest">Technical</p>
                  <h2 className="text-2xl font-bold text-gray-900 tracking-wide">
                    Specification
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(projectSpecs).filter(([key]) => key !== 'id' && key !== '_id').map(([key, value]) => (
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
                className="mt-8 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg shadow-green-200 hover:shadow-green-300 hover:scale-[1.02] transition-all duration-300 tracking-wide text-sm"
              >
                ⬇ Download Brochure
              </button>
            </div>
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
        className="w-full bg-white py-24 px-6"
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col items-center mb-16">
            <span className="text-green-600 text-xs font-bold uppercase tracking-[0.25em] mb-3 bg-green-50 px-4 py-1.5 rounded-full border border-green-100">What We Offer</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mt-2">
              Features &amp; <span className="text-green-600">Amenities</span>
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-green-500 to-transparent mt-5" />
            <p className="text-gray-500 mt-4 text-center max-w-xl text-sm leading-relaxed">
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
                className="group relative flex flex-col items-center justify-center gap-4 bg-white border border-gray-100 rounded-3xl p-8 min-h-[220px] shadow-sm hover:shadow-xl hover:shadow-green-100 hover:border-green-200 hover:-translate-y-2 transition-all duration-300 cursor-default overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-50/0 to-green-100/0 group-hover:from-green-50/80 group-hover:to-green-100/40 transition-all duration-500 rounded-3xl" />
                <div className="relative w-16 h-16 rounded-2xl bg-green-50 group-hover:bg-green-500 flex items-center justify-center text-4xl text-green-500 group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-lg group-hover:shadow-green-300 group-hover:scale-110">
                  {item.icon}
                </div>
                <p className="relative text-gray-700 group-hover:text-green-800 font-semibold text-sm text-center leading-snug transition-colors duration-300">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="bg-gradient-to-br from-slate-900 via-green-950 to-slate-900 py-20">
        {/* Title */}
        <div className="flex flex-col items-center mb-12">
          <span className="text-green-400 text-xs font-bold uppercase tracking-[0.25em] mb-3 bg-white/10 px-4 py-1.5 rounded-full border border-white/10">Floor Plans</span>
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white">
            Key <span className="text-green-400">Plan</span>
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent mt-4" />
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          {buttons.map((btn, index) => (
            <button
              key={index}
              onClick={() => handleKeyPlanOpen(keyPhotos[index])}
              className="bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold px-7 py-3.5 rounded-xl shadow-lg hover:bg-green-500 hover:border-green-500 hover:shadow-green-500/30 transform transition-all duration-300 hover:scale-105 tracking-wide text-sm"
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
     
      <div className="w-full bg-white py-20">
        {/* Header */}
        <div className="flex flex-col items-center mb-12">
          <span className="text-green-600 text-xs font-bold uppercase tracking-[0.25em] mb-3 bg-green-50 px-4 py-1.5 rounded-full border border-green-100">Visual Tour</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-1">
            Photo <span className="text-green-600">Gallery</span>
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-green-500 to-transparent mt-4" />
          <p className="text-gray-400 mt-3 text-sm font-medium">{photos.length} photos</p>
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
    <div className="flex items-center gap-3 bg-gray-50/80 hover:bg-green-50 border border-gray-100 hover:border-green-200 rounded-2xl px-4 py-3.5 transition-all duration-200 group">
      <div className="text-2xl text-green-500 group-hover:text-green-600 shrink-0 transition-colors">{icon}</div>
      <div className="min-w-0">
        <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">{label}</p>
        <p className="text-gray-800 font-bold text-sm mt-0.5 truncate">{value}</p>
      </div>
    </div>
  );
}
