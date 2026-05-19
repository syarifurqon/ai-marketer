"use client";

import { useState } from "react";
import { ProductInput } from "@/lib/types/marketing";

interface ProductFormProps {
  onSubmit: (data: ProductInput) => void;
}

export default function ProductForm({ onSubmit }: ProductFormProps) {
  const [formData, setFormData] = useState<ProductInput>({
    productName: "",
    category: "",
    productType: "digital",
    price: "",
    targetAudience: "",
    usp: "",
    problemSolved: "",
    websiteUrl: "",
    campaignGoal: "",
  });
  const [competitorText, setCompetitorText] = useState("");

  const [errors, setErrors] = useState<Partial<Record<keyof ProductInput, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name as keyof ProductInput]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ProductInput, string>> = {};
    if (!formData.productName.trim()) newErrors.productName = "Product Name is required";
    if (!formData.category.trim()) newErrors.category = "Category is required";
    if (!formData.targetAudience.trim()) newErrors.targetAudience = "Target Audience is required";
    if (!formData.usp.trim()) newErrors.usp = "USP is required";
    if (!formData.problemSolved.trim()) newErrors.problemSolved = "Problem Solved is required";
    if (!formData.campaignGoal.trim()) newErrors.campaignGoal = "Campaign Goal is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const urls = competitorText
        .split(/\r?\n/)
        .map((url) => url.trim())
        .filter((url) => url.length > 0);

      onSubmit({
        ...formData,
        competitorUrls: urls,
      });
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 w-full">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Details</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Product Name */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Product Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              placeholder="e.g. AI Marketing Assistant"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${errors.productName ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.productName && <p className="text-red-500 text-xs">{errors.productName}</p>}
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Category <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="e.g. SaaS, E-commerce, Services"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${errors.category ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.category && <p className="text-red-500 text-xs">{errors.category}</p>}
          </div>

          {/* Product Type */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Product Type</label>
            <select
              name="productType"
              value={formData.productType}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
            >
              <option value="digital">Digital Product / SaaS</option>
              <option value="jasa">Service / Jasa</option>
              <option value="fisik">Physical Product</option>
            </select>
          </div>

          {/* Price */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="e.g. $29/mo, Rp 500.000"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>
        </div>

        {/* Target Audience */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Target Audience <span className="text-red-500">*</span></label>
          <textarea
            name="targetAudience"
            value={formData.targetAudience}
            onChange={handleChange}
            placeholder="Who is this product for? Describe their demographics and interests."
            rows={2}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none ${errors.targetAudience ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.targetAudience && <p className="text-red-500 text-xs">{errors.targetAudience}</p>}
        </div>

        {/* Problem Solved */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Problem Solved <span className="text-red-500">*</span></label>
          <textarea
            name="problemSolved"
            value={formData.problemSolved}
            onChange={handleChange}
            placeholder="What exact problem does your product solve for them?"
            rows={2}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none ${errors.problemSolved ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.problemSolved && <p className="text-red-500 text-xs">{errors.problemSolved}</p>}
        </div>

        {/* USP */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Unique Selling Proposition (USP) <span className="text-red-500">*</span></label>
          <textarea
            name="usp"
            value={formData.usp}
            onChange={handleChange}
            placeholder="Why is your product better than alternatives? What makes it unique?"
            rows={2}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none ${errors.usp ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.usp && <p className="text-red-500 text-xs">{errors.usp}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Campaign Goal */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Campaign Goal <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="campaignGoal"
              value={formData.campaignGoal}
              onChange={handleChange}
              placeholder="e.g. Increase Brand Awareness, Generate Leads"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${errors.campaignGoal ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.campaignGoal && <p className="text-red-500 text-xs">{errors.campaignGoal}</p>}
          </div>

          {/* Website URL */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Website URL <span className="text-gray-400 font-normal">(Optional)</span></label>
            <input
              type="url"
              name="websiteUrl"
              value={formData.websiteUrl}
              onChange={handleChange}
              placeholder="https://example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>
        </div>

        {/* Competitor URLs */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Competitor URLs <span className="text-gray-400 font-normal">(Optional, one URL per line, max 3)</span></label>
          <textarea
            name="competitorUrls"
            value={competitorText}
            onChange={(e) => setCompetitorText(e.target.value)}
            placeholder="https://competitor1.com&#10;https://competitor2.com"
            rows={2}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-all"
          >
            Generate Marketing Report
          </button>
        </div>
      </form>
    </div>
  );
}
