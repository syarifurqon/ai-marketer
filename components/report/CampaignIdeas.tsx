import React from "react";

interface CampaignIdeasProps {
  ideas: string[];
}

export default function CampaignIdeas({ ideas }: CampaignIdeasProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">💡</span>
        <h3 className="text-lg font-bold text-gray-900">Recommended Campaigns</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {ideas.map((idea, idx) => (
          <div key={idx} className="bg-gray-50 border border-gray-100 rounded-xl p-5 flex flex-col justify-between hover:border-blue-150 transition-colors">
            <div>
              <span className="text-xs uppercase font-extrabold tracking-wider text-blue-600 block mb-2">
                Strategy 0{idx + 1}
              </span>
              <p className="text-gray-700 text-sm leading-relaxed">{idea}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
