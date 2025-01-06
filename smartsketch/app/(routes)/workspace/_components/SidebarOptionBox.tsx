"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faCaretDown } from "@fortawesome/free-solid-svg-icons";

const SidebarOptionBox: React.FC = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  // Toggle section open/close
  const handleToggle = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const sections = [
    { title: "General", icons: ["Dummy Icon 1", "Dummy Icon 2"] },
    { title: "Misc", icons: ["Dummy Icon 3", "Dummy Icon 4"] },
    { title: "Advanced", icons: ["Dummy Icon 5", "Dummy Icon 6"] },
  ];

  return (
    <div className="w-full">
      {sections.map((section, idx) => (
        <div key={section.title}>
          {/* Section Header */}
          <div
            className="flex items-center cursor-pointer py-2 pl-0 pr-2 hover:bg-gray-100"
            onClick={() => handleToggle(section.title)}
          >
            <FontAwesomeIcon
              icon={openSection === section.title ? faCaretDown : faCaretRight}
              className="text-gray-600 text-lg mr-2"
            />
            <span className="font-medium text-gray-800">{section.title}</span>
          </div>

          {/* Section Icons */}
          {openSection === section.title && (
            <div className="pl-4 py-1">
              {section.icons.map((icon, index) => (
                <div key={index} className="py-1 text-gray-700 text-sm">
                  {icon}
                </div>
              ))}
            </div>
          )}

          {/* Horizontal Line Below Each Section */}
          {idx < sections.length - 1 && <hr className="border-gray-300 mx-1" />}
        </div>
      ))}
    </div>
  );
};

export default SidebarOptionBox;
