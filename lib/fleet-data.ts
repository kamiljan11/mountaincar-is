export type CarSpec = { lk: string; value: string };
export type Car = { name: string; dk: string; img: string; specs: CarSpec[] };

export const cars: Car[] = [
  {
    name: "Renault Master Camper",
    dk: "fleet.d3",
    img: "https://d1yei2z3i6k35z.cloudfront.net/16287944/698b8715bd267_1.jpg",
    specs: [
      { lk: "spec.Seats", value: "5" },
      { lk: "spec.Doors", value: "4" },
      { lk: "spec.Fuel", value: "7.0 l/100km" },
      { lk: "spec.Cargo", value: "1000L" },
      { lk: "spec.Gearbox", value: "Manual" },
      { lk: "spec.AC", value: "Manual" },
    ],
  },
  {
    name: "VW Caddy Beach",
    dk: "fleet.d4",
    img: "/fleet/caddy-beach.jpg",
    specs: [
      { lk: "spec.Seats", value: "5" },
      { lk: "spec.Engine", value: "2.0 TDI" },
      { lk: "spec.Gearbox", value: "Manual" },
      { lk: "spec.Drive", value: "FWD" },
      { lk: "spec.Tent", value: "Rooftop" },
      { lk: "spec.WiFi", value: "Free" },
    ],
  },
  {
    name: "Renault Trafic",
    dk: "fleet.d5",
    img: "/fleet/renault-trafic.jpg",
    specs: [
      { lk: "spec.Seats", value: "9" },
      { lk: "spec.Doors", value: "5" },
      { lk: "spec.Fuel", value: "7.0 l/100km" },
      { lk: "spec.Gearbox", value: "Manual" },
      { lk: "spec.AC", value: "Manual" },
    ],
  },
];

// Single source of truth for the vehicle dropdown in the quote form.
export const vehicleNames = cars.map((c) => c.name);
