import React, { useState, useRef, useEffect } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const buildRegionMap = (regions) => {
  if (!regions || !Array.isArray(regions)) return {};
  const map = {};

  regions.forEach(region => {
    if (!region || !region.value) return;
    const regionItem = { label: region.label, value: region.value };

    if (region.label === 'North America') {
      map.USA = regionItem;
      map.CAN = regionItem;
    } else if (region.label === 'Europe') {
      map.DEU = regionItem;
      map.FRA = regionItem;
      map.GBR = regionItem;
    } else if (region.label === 'APAC') {
      map.IND = regionItem;
      map.CHN = regionItem;
      map.JPN = regionItem;
      map.AUS = regionItem;
    } else if (region.label === 'LATAM') {
      map.BRA = regionItem;
      map.MEX = regionItem;
    } else if (region.label === 'MEA') {
      map.ZAF = regionItem;
    }
  });

  return map;
};

const AudienceMap = ({ regions }) => {
  const [tooltip, setTooltip] = useState({ show: false, content: '', x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const [zoom, setZoom] = useState(100);
  const [center, setCenter] = useState([0, 20]);
  const mapRef = useRef();
  const regionMap = buildRegionMap(regions);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleDoubleClick = (event) => {
    // Get the map container's bounding rect
    const containerRect = mapRef.current.getBoundingClientRect();
    const clickX = event.clientX - containerRect.left;
    const clickY = event.clientY - containerRect.top;

    // Calculate relative position within the map (0 to 1)
    const relX = clickX / containerRect.width;
    const relY = clickY / containerRect.height;

    // Convert from screen coordinates to map coordinates
    // This is approximate - adjust based on your projection
    const mapWidth = 360; // longitude range
    const mapHeight = 180; // latitude range
    
    const newCenterLng = center[0] + (relX - 0.5) * (mapWidth / (zoom / 100));
    const newCenterLat = center[1] + (relY - 0.5) * (mapHeight / (zoom / 100));

    // Zoom in by 50% and center on the clicked point
    setZoom(zoom * 1.5);
    setCenter([newCenterLng, newCenterLat]);
  };

  return (
    <div className="bg-white rounded-[2rem] shadow-xl p-6">
      {/* HEADER */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-slate-900">Audience by Region</h3>
        <p className="text-sm text-slate-500">Global footprint of matched contacts</p>
      </div>

      {/* MAP */}
      <div
        ref={mapRef}
        className="rounded-[2rem] bg-slate-50 p-4 relative w-full h-[280px] min-w-0 cursor-pointer"
        onDoubleClick={handleDoubleClick}
        title="Double-click to zoom in"
      >
        {zoom > 100 && (
          <button
            onClick={() => {
              setZoom(100);
              setCenter([0, 20]);
            }}
            className="absolute top-6 right-6 z-30 bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 shadow-md"
          >
            Reset Zoom
          </button>
        )}
        {isMounted && (
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              scale: zoom,
              center: center,
            }}
            width={800}
            height={400}
            style={{ width: "100%", height: "100%" }}
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const countryCode = geo.properties.ISO_A3;
                  const region = regionMap[countryCode];
                  
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="#cbd5e1"
                      stroke="#ffffff"
                      strokeWidth={0.5}
                      style={{
                        default: { outline: "none", transition: "fill 0.2s" },
                        hover: { outline: "none", fill: "rgb(242,108,30)", cursor: "pointer" },
                        pressed: { outline: "none" },
                      }}
                      onMouseEnter={(event) => {
                        if (region && mapRef.current) {
                          const containerRect = mapRef.current.getBoundingClientRect();
                          setTooltip({
                            show: true,
                            content: `${region.label}: ${region.value}`,
                            x: event.clientX - containerRect.left,
                            y: event.clientY - containerRect.top
                          });
                        }
                      }}
                      onMouseLeave={() => {
                        setTooltip({ show: false, content: '', x: 0, y: 0 });
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ComposableMap>
        )}

        {/* TOOLTIP */}
        {tooltip.show && (
          <div
            className="absolute bg-blue-500 text-white px-2 py-1 rounded shadow-lg pointer-events-none z-20"
            style={{ left: tooltip.x, top: tooltip.y, transform: 'translate(-50%, 10px)' }}
          >
            {tooltip.content}
          </div>
        )}
      </div>

      {/* REGION NAMES LINE BELOW MAP */}
      <div className="mt-4 text-sm text-slate-600 flex flex-wrap justify-center gap-4">
        {regions.map((region) => (
          <div key={region.label} className="flex flex-col items-center whitespace-nowrap">
            <span className="font-semibold text-slate-900">{region.label}</span>
            <span className="text-xs text-slate-500">{region.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AudienceMap;