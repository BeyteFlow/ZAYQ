import React, { useState, useRef } from "react";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../lib/firebase";

const AddProductPage = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    status: "in-stock",
    models: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("Please select an image.");
      return;
    }

    setUploading(true);
    try {
      const storageRef = ref(storage, `products/${selectedFile.name}`);
      await uploadBytes(storageRef, selectedFile);
      const imageUrl = await getDownloadURL(storageRef);

      const productToSave = {
        ...formData,
        price: Number(formData.price),
        models: formData.models.split(",").map((m) => m.trim()),
        imageUrl,
      };

      await addDoc(collection(db, "products"), productToSave);
      alert("Product added successfully!");

      setFormData({
        name: "",
        description: "",
        price: 0,
        status: "in-stock",
        models: "",
      });
      setSelectedFile(null);
      setPreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white p-10">
      <div className="max-w-2xl mx-auto border p-8 rounded-2xl shadow-sm">
        <h1 className="text-2xl font-bold mb-6">Add New ZAYQ Product</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase mb-1">
              Product Name
            </label>
            <input
              type="text"
              placeholder="Midnight Matte Case"
              className="w-full p-3 border rounded-lg"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              value={formData.name}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase mb-1">
              Description
            </label>
            <textarea
              placeholder="Premium silk finish..."
              className="w-full p-3 border rounded-lg"
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              value={formData.description}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase mb-1">
                Price (₹)
              </label>
              <input
                aria-label="Price"
                type="number"
                className="w-full p-3 border rounded-lg"
                onChange={(e) =>
                  setFormData({ ...formData, price: Number(e.target.value) })
                }
                value={formData.price}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase mb-1">
                Status
              </label>
              <select
                className="w-full p-3 border rounded-lg"
                aria-label="Stock"
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                value={formData.status}
              >
                <option value="in-stock">In Stock</option>
                <option value="coming-soon">Coming Soon</option>
                <option value="out-of-stock">Out of Stock</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase mb-1">
              Product Image
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-3 border rounded-lg"
              required
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-3 h-40 object-cover rounded-lg"
              />
            )}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase mb-1">
              Compatible Models (comma separated)
            </label>
            <input
              type="text"
              placeholder="iPhone 15, iPhone 15 Pro"
              className="w-full p-3 border rounded-lg"
              onChange={(e) =>
                setFormData({ ...formData, models: e.target.value })
              }
              value={formData.models}
            />
          </div>

          <button
            type="submit"
            disabled={uploading}
            className="w-full py-4 bg-black text-white font-bold rounded-xl hover:bg-zinc-800 transition-colors disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Upload to Shop"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductPage;
