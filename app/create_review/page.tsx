"use client";
import { ChangeEvent, FormEvent, useState } from "react";

interface FormData {
  professor: string;
  reviewer: string;
  subject: string;
  description: string;
  stars: number;
}

export default function CreateReviewForm() {
  const initialFormData = {
    professor: "",
    reviewer: "",
    subject: "",
    description: "",
    stars: 1,
  };
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const subjects = [
    "Arabic",
    "English",
    "French",
    "Spanish",
    "History",
    "Geography",
    "Philosophy",
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "Geology",
  ];

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    let { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/create_review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess("Review submitted successfully!");
        setFormData(initialFormData);
      } else {
        setError(result.error || "Failed to submit review");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="grow flex flex-col items-center w-full p-4 border text-center rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Submit a Review</h2>
      {error && (
        <div className="bg-red-200 text-red-800 p-2 mb-4 rounded">{error}</div>
      )}
      {success && (
        <div className="bg-green-200 text-green-800 p-2 mb-4 rounded">
          {success}
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="w-[80%] md:w-1/2 flex flex-col items-center space-y-4"
      >
        <div className="w-full">
          <label className="font-medium text-gray-700" htmlFor="professor">
            Professor
          </label>
          <input
            id="professor"
            name="professor"
            type="text"
            value={formData.professor}
            onChange={handleChange}
            required
            className="mt-1 p-1 w-full border-gray-300 rounded-md shadow-sm text-center focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div className="w-full">
          <label className="font-medium text-gray-700" htmlFor="reviewer">
            Reviewer
          </label>
          <input
            id="reviewer"
            name="reviewer"
            type="text"
            value={formData.reviewer}
            onChange={handleChange}
            required
            className="mt-1 p-1 w-full border-gray-300 rounded-md shadow-sm text-center focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div className="w-full">
          <label className="font-medium text-gray-700" htmlFor="subject">
            Subject
          </label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="mt-1 p-1 w-full border-gray-300 rounded-md shadow-sm text-center focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="" disabled>
              Select a subject
            </option>
            {subjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full">
          <label className="font-medium text-gray-700" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full h-[5rem] border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700">
            Stars
          </label>
          <div className="flex items-center justify-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                onClick={() =>
                  setFormData((prevData) => ({
                    ...prevData,
                    stars: star,
                  }))
                }
                className={`w-6 h-6 cursor-pointer ${formData.stars >= star ? "text-amber-400" : "text-white"}`}
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21z" />
              </svg>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
}
