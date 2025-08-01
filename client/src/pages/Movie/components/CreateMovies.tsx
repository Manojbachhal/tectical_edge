import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
import toast from "react-hot-toast";
import { BiDownload } from "react-icons/bi";
function CreateMovies() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [apiError, setApiError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setApiError("");
    if (!image || !title || !year) {
      setApiError("All fields are required.");
      return;
    }

    const formData = new FormData();
    formData.append("file", image);
    formData.append("title", title);
    formData.append("year", year);

    try {
      const token = localStorage.getItem("token");
      await axios.post(BASE_URL + "/auth/movies/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Movie uploaded successfully!");
      navigate("/");
    } catch (error: any) {
      const message = error?.response?.data?.message || "Upload failed";
      setApiError(message);
      toast.error(message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="defaultTheme mx-auto flex flex-col gap-6 p-6 bg-[#093545] rounded shadow-lg "
    >
      {/* Title aligned beside image */}
      <h2 className="text-white text-3xl font-semibold text-center md:text-left w-full">
        Create a new movie
      </h2>
      <div className="flex">
        {/* Wider Image Drop Section */}

        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => fileInputRef.current?.click()}
          className="w-full md:w-2/5 h-[360px] border-2 border-dashed border-gray-400 flex items-center justify-center cursor-pointer rounded"
        >
          {preview ? (
            <img src={preview} alt="Preview" className="w-full h-full object-cover rounded" />
          ) : (
            <div className="flex flex-col items-center justify-center">
              <BiDownload size={30} className="text-white" />
              <span className="text-white text-center">Drop an image here</span>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        {/* Form Inputs */}
        <div className="flex flex-col gap-4 max-w-xl w-full mx-auto">
          <input
            type="text"
            placeholder="Title"
            className="bg-[#224957] rounded text-white placeholder-gray-300 text-sm p-3 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="number"
            placeholder="Publishing year"
            className="bg-[#224957] rounded text-white placeholder-gray-300 text-sm p-3 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
          <div className="flex justify-center gap-4 mt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded"
            >
              Cancel
            </button>
            <button type="submit" className="bg-[#2BD17E] text-white px-6 py-2 rounded">
              Submit
            </button>
          </div>
        </div>
      </div>

      {apiError && <div className="text-red-400 text-center">{apiError}</div>}
    </form>
  );
}

export default CreateMovies;
