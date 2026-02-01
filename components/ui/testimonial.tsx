import React from 'react';

interface TestimonialCardProps {
  rating: number; 
  quote: string;
  author: string;
  position: string;
  company: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ 
  rating = 5, 
  quote, 
  author, 
  position, 
  company 
}) => {
  return (
    <div className="max-w-sm p-6 bg-white rounded-lg shadow-md border border-gray-100">
      {/* Rating Stars */}
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-5 h-5 ${i < rating ? 'text-[#C0F333]' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      {/* Quote */}
      <blockquote className="text-gray-600 italic mb-6">
        "{quote}"
      </blockquote>

      {/* Divider */}
      <div className="border-t border-gray-200 my-4"></div>

      {/* Author Info */}
      <div className="flex items-center">
        <div className="bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center mr-3">
          <span className="text-gray-500 font-medium text-sm">
            {author.charAt(0)}
          </span>
        </div>
        <div>
          <h4 className="font-semibold text-gray-800">{author}</h4>
          <p className="text-sm text-gray-500">
            {position}, {company}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;