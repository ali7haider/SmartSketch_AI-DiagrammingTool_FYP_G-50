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
        {
          label: "Square",
          svg: (
            <svg
              style={{
                width: "32px",
                height: "32px",
                display: "block",
                position: "relative",
                pointerEvents: "none",
              }}
            >
              <g transform="translate(0.5,0.5)">
                <rect
                  x="2.4"
                  y="1.4"
                  width="27.2"
                  height="27.2"
                  fill="#f1f3f4"
                  stroke="#000000"
                  strokeWidth="1.3"
                />
              </g>
            </svg>
          ),
        },
        {
          label: "Circle",
          svg: (
            <svg
              style={{
                width: "32px",
                height: "32px",
                display: "block",
                position: "relative",
                pointerEvents: "none",
              }}
            >
              <g transform="translate(0.5,0.5)">
                <ellipse
                  cx="16"
                  cy="15"
                  rx="13.6"
                  ry="13.6"
                  fill="#f1f3f4"
                  stroke="#000000"
                  strokeWidth="1.3"
                />
              </g>
            </svg>
          ),
        },
        {
          label: "Process",
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
              <g transform="translate(0.5,0.5)">
                <rect
                  x="1.6"
                  y="7.8"
                  width="28.8"
                  height="14.4"
                  fill="#f1f3f4"
                  stroke="#000000"
                  strokeWidth="1.3"
                />
                <path
                  d="M 4.48 7.8 L 4.48 22.2 M 27.52 7.8 L 27.52 22.2"
                  fill="none"
                  stroke="#000000"
                  strokeWidth="1.3"
                  strokeMiterlimit="10"
                />
              </g>
            </svg>
          ),
        },
        {
          label: "Diamond",
          svg: (
            <svg
              style={{
                width: "32px",
                height: "32px",
                display: "block",
                position: "relative",
                pointerEvents: "none",
              }}
            >
              <g transform="translate(0.5,0.5)">
                <path
                  d="M 16 1.4 L 29.6 15 L 16 28.6 L 2.4 15 Z"
                  fill="#f1f3f4"
                  stroke="#000000"
                  strokeWidth="1.3"
                  strokeMiterlimit="10"
                />
              </g>
            </svg>
          ),
        },
        {
          label: "Parallelogram",
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
              <g transform="translate(0.5,0.5)">
                <path
                  d="M 1.6 22.2 L 6.4 7.8 L 30.4 7.8 L 25.6 22.2 Z"
                  fill="#f1f3f4"
                  stroke="#000000"
                  strokeWidth="1.3"
                  strokeMiterlimit="10"
                />
              </g>
            </svg>
          ),
        },
        {
          label: "Dashed Line",
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
              <line
                x1="2"
                y1="28"
                x2="30"
                y2="2"
                stroke="#000000"
                strokeWidth="1.3"
                strokeDasharray="4 4"
              />
            </svg>
          ),
        },
        {
          label: "Dotted Line",
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
              <line
                x1="2"
                y1="28"
                x2="30"
                y2="2"
                stroke="#000000"
                strokeWidth="1.3"
                strokeDasharray="1.5 3"
              />
            </svg>
          ),
        },
        {
          label: "Line",
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
              <line
                x1="2"
                y1="28"
                x2="30"
                y2="2"
                stroke="#000000"
                strokeWidth="1.3"
              />
            </svg>
          ),
        },
        {
          label: "Bidirectional Connector",
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
              <line
                x1="6"
                y1="24"
                x2="26"
                y2="4"
                stroke="#000000"
                strokeWidth="1.3"
              />
              <polygon points="5,25 7,23 6,20 8,21" fill="#000000" />
              <polygon points="27,3 25,5 26,8 24,7" fill="#000000" />
            </svg>
          ),
        },
        {
          label: "Directional Connector",
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
              <line
                x1="5"
                y1="25"
                x2="25"
                y2="5"
                stroke="#000000"
                strokeWidth="1.3"
              />
              <polygon points="26,4 25,6 24,7 27,5" fill="#000000" />
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
                  className="geItem flex items-center justify-centercursor-pointer p-1 hover:bg-gray-200 relative"
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
