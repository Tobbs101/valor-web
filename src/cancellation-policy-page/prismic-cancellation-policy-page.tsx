"use client";

import { PrismicRichText } from "@prismicio/react";
import {
  RichTextField,
  ImageField,
  KeyTextField,
  DateField,
} from "@prismicio/client";

interface CancellationPolicyPageData {
  title?: KeyTextField;
  company_name?: KeyTextField;
  last_updated?: DateField;
  body?: RichTextField;
  meta_title?: KeyTextField;
  meta_description?: KeyTextField;
  meta_keywords?: KeyTextField;
  og_image?: ImageField;
}

interface PrismicCancellationPolicyPageProps {
  data: CancellationPolicyPageData;
}

/**
 * Prismic Cancellation Policy page component
 * Renders dynamic content from Prismic CMS
 */
const PrismicCancellationPolicyPage = ({
  data,
}: PrismicCancellationPolicyPageProps) => {
  const formatDate = (dateString?: string | null) => {
    if (!dateString) return "February 2026";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#023047] py-20 md:py-32">
        <div className="max-w-[900px] mx-auto px-5 text-center">
          <h1 className="text-[32px] md:text-[42px] font-[700] text-white mb-4">
            {data.title || "Cancellation Policy"}
          </h1>
          <p className="text-[14px] md:text-[16px] text-white/80">
            {data.company_name || "Valorhire Technologies Limited"}
          </p>
          <p className="text-[14px] md:text-[16px] text-white/80">
            Last Updated: {formatDate(data.last_updated)}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[900px] mx-auto px-5 py-12 md:py-16">
        <div className="prose prose-lg max-w-none cancellation-content">
          {data.body && (
            <PrismicRichText
              field={data.body}
              components={{
                heading2: ({ children }) => (
                  <h2 className="text-[20px] md:text-[24px] font-[700] text-primary mb-4 mt-10 first:mt-0">
                    {children}
                  </h2>
                ),
                heading3: ({ children }) => (
                  <h3 className="text-[16px] md:text-[18px] font-[600] text-primary mb-2 mt-6">
                    {children}
                  </h3>
                ),
                paragraph: ({ children }) => (
                  <p className="text-[15px] md:text-[16px] text-[#646464] leading-relaxed mb-4">
                    {children}
                  </p>
                ),
                list: ({ children }) => (
                  <ul className="space-y-3 text-[15px] md:text-[16px] text-[#646464] leading-relaxed mb-6">
                    {children}
                  </ul>
                ),
                listItem: ({ children }) => (
                  <li className="flex gap-2">
                    <span className="text-primary mt-1.5">•</span>
                    <span>{children}</span>
                  </li>
                ),
                oList: ({ children }) => (
                  <ol className="space-y-3 text-[15px] md:text-[16px] text-[#646464] leading-relaxed mb-6 list-decimal list-inside">
                    {children}
                  </ol>
                ),
                oListItem: ({ children }) => (
                  <li className="text-[15px] md:text-[16px] text-[#646464] leading-relaxed">
                    {children}
                  </li>
                ),
                strong: ({ children }) => (
                  <strong className="font-semibold text-primary">
                    {children}
                  </strong>
                ),
                hyperlink: ({ children, node }) => (
                  <a
                    href={node.data.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {children}
                  </a>
                ),
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PrismicCancellationPolicyPage;
