import React from 'react';

const Templates = () => {
  const resumeTemplates = [
    {
      id: 1,
      name: "Professional",
      description: "Clean and professional template perfect for corporate roles",
      image: "https://placehold.co/300x400/e2e8f0/475569",
      isDefault: true
    },
    {
      id: 2,
      name: "Creative",
      description: "Modern design ideal for creative and design positions",
      image: "https://placehold.co/300x400/e2e8f0/475569",
      comingSoon: true
    },
    {
      id: 3,
      name: "Technical",
      description: "Focused template for technical and engineering roles",
      image: "https://placehold.co/300x400/e2e8f0/475569",
      comingSoon: true
    },
    {
      id: 4,
      name: "Executive",
      description: "Elegant template for senior management positions",
      image: "https://placehold.co/300x400/e2e8f0/475569",
      comingSoon: true
    }
  ];

  return (
    <section id="templates" className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Resume Templates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {resumeTemplates.map((template) => (
            <div key={template.id} className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="relative">
                <img 
                  src={template.image} 
                  alt={template.name} 
                  className="w-full h-auto"
                />
                {template.comingSoon && (
                  <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
                    <span className="bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Coming Soon
                    </span>
                  </div>
                )}
                {template.isDefault && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                      Active
                    </span>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{template.name}</h3>
                <p className="text-gray-600 mb-4">{template.description}</p>
                <button 
                  className={`w-full py-2 px-4 rounded-lg font-medium ${
                    template.comingSoon 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                  disabled={template.comingSoon}
                >
                  {template.comingSoon ? 'Coming Soon' : 'Use Template'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Templates; 