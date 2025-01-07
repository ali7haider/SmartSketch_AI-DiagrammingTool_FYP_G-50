"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretRight,
  faCaretDown,
  faFont,
  faHeading,
} from "@fortawesome/free-solid-svg-icons";

const SidebarOptionBox: React.FC = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [hoveredShape, setHoveredShape] = useState<{
    icon: JSX.Element;
    label: string;
  } | null>(null);

  const handleToggle = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const sections = [
    {
      title: "General",
      shapes: [
        {
          label: "Rectangle",
          svg: (
            <svg
              style={{
                width: "32px",
                height: "30px",
                display: "block",
                position: "relative",
                pointerEvents: "none",
              }}
            >
              <rect
                x="2"
                y="8"
                width="28"
                height="14"
                fill="#f1f3f4"
                stroke="#000000"
                strokeWidth="1.3"
              />
            </svg>
          ),
        },
        {
          label: "Round Rectangle",
          svg: (
            <svg
              style={{
                width: "32px",
                height: "30px",
                display: "block",
                position: "relative",
                pointerEvents: "none",
              }}
            >
              <rect
                x="2"
                y="8"
                rx="5"
                ry="5"
                width="28"
                height="14"
                fill="#f1f3f4"
                stroke="#000000"
                strokeWidth="1.3"
              />
            </svg>
          ),
        },
        {
          label: "Text",
          svg: (
            <FontAwesomeIcon
              icon={faFont}
              style={{
                fontSize: "24px",
                color: "black",
              }}
            />
          ),
        },
        {
          label: "Heading",
          svg: (
            <FontAwesomeIcon
              icon={faHeading}
              style={{
                fontSize: "24px",
                color: "black",
              }}
            />
          ),
        },
        {
          label: "Ellipse",
          svg: (
            <svg
              style={{
                width: "32px",
                height: "30px",
                display: "block",
                position: "relative",
                pointerEvents: "none",
              }}
            >
              <ellipse
                cx="16"
                cy="15"
                rx="14"
                ry="7"
                fill="#f1f3f4"
                stroke="#000000"
                strokeWidth="1.3"
              />
            </svg>
          ),
        },
      ],
    },
  ];

  return (
    <div className="relative w-full">
      {/* Sidebar Sections */}
      {sections.map((section) => (
        <div key={section.title}>
          {/* Section Header */}
          <div
            className="flex items-center cursor-pointer py-2 px-3 pl-0 hover:bg-gray-100"
            onClick={() => handleToggle(section.title)}
          >
            <FontAwesomeIcon
              icon={openSection === section.title ? faCaretDown : faCaretRight}
              className="text-gray-600 text-lg mr-2"
            />
            <span className="font-medium text-gray-800">{section.title}</span>
          </div>

          {/* Section Shapes */}
          {openSection === section.title && (
            <div className="grid grid-cols-5 gap-2 pl-2 py-2">
              {section.shapes.map((shape, index) => (
                <div
                  key={index}
                  className="geItem flex items-center justify-centercursor-pointer p-1 hover:bg-gray-100 relative"
                  style={{ width: "40px", height: "32px" }}
                  onMouseEnter={() => {
                    if (!hoveredShape || hoveredShape.label !== shape.label) {
                      setHoveredShape({
                        icon: shape.svg,
                        label: shape.label,
                      });
                    }
                  }}
                  onMouseLeave={() => setHoveredShape(null)}
                >
                  {shape.svg}
                </div>
              ))}
            </div>
          )}

          {/* Horizontal Line */}
          <hr className="border-gray-300 mx-1" />
        </div>
      ))}

      {/* Hover Popup */}
      {hoveredShape && (
        <div
          className="absolute p-2 bg-white border border-gray-300 rounded shadow-lg z-50" // Increased z-index for proper stacking
          style={{
            top: "50%",
            left: "calc(100% + 10px)", // Positioned outside the sidebar with a small gap
            transform: "translateY(-50%)",
            width: "150px",
            textAlign: "center",
          }}
        >
          <div className="flex justify-center items-center mb-2">
            <div
              className="icon-container"
              style={{
                width: "64px",
                height: "64px",
                display: "flex", // Ensures proper alignment
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {React.cloneElement(hoveredShape.icon, {
                style: {
                  width: "100%", // Ensure it scales to fill the container
                  height: "100%", // Maintain aspect ratio
                  maxWidth: "64px", // Set maximum width for scaling
                  maxHeight: "64px", // Set maximum height for scaling
                },
                children: React.Children.map(
                  hoveredShape.icon.props.children,
                  (child) =>
                    React.cloneElement(child, {
                      transform: "scale(2)", // Apply scaling to the rect or ellipse
                    })
                ),
              })}
            </div>
          </div>
          <hr className="border-gray-300 my-2" />
          <span className="text-sm font-medium text-gray-700">
            {hoveredShape.label}
          </span>
        </div>
      )}
    </div>
  );
};

export default SidebarOptionBox;
