import * as React from "react";

const Logo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 105" {...props}>
    <defs>
      <style>
        {
          "\n      .blue-fill { fill: #003A8F; }\n      .green-fill { fill: #00B050; }\n      .text-adena {\n        font-family: 'Palatino Linotype', 'Palatino', 'Book Antiqua', 'Georgia', serif;\n        font-weight: 700;\n        font-size: 60px;\n        font-style: italic;\n        letter-spacing: -0.5px;\n      }\n      .text-sub {\n        font-family: 'Arial Narrow', 'Arial', sans-serif;\n        font-weight: 800;\n        font-size: 13px;\n        letter-spacing: 2px;\n      }\n    "
        }
      </style>
    </defs>
    <g transform="translate(5, 25)">
      <rect
        x={22.465}
        y={8.8}
        width={20}
        height={60}
        rx={10}
        className="green-fill"
      />
      <rect
        x={2.465}
        y={30.8}
        width={60}
        height={20}
        rx={10}
        className="green-fill"
      />
      <rect
        x={75}
        y={30}
        width={22}
        height={50}
        rx={12}
        className="green-fill"
        transform="rotate(-30, 81, 35)"
      />
      <rect
        x={65}
        y={4}
        width={22}
        height={65}
        rx={12}
        className="blue-fill"
        transform="rotate(30, 61, 42.015)"
      />
    </g>
    <g transform="translate(125, 10)">
      <text y={62} className="blue-fill text-adena">
        {"Adena"}
      </text>
      <text x={100} y={79} textAnchor="middle" className="green-fill text-sub">
        {"OCCUPATIONAL HEALTH"}
      </text>
      <text x={100} y={94} textAnchor="middle" className="green-fill text-sub">
        {"AND SAFETY CENTER"}
      </text>
    </g>
  </svg>
);

export default Logo;
