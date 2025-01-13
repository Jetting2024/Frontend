import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { centerState, markersState } from "../../recoil/mapState";

const NAVER_MAP_CLIENT_ID = "2kvq7ux5qa";

const NaverMap: React.FC = () => {
  const center = useRecoilValue(centerState);
  const markers = useRecoilValue(markersState);

  useEffect(() => {
    const initializeMap = () => {
      const map = new naver.maps.Map("map", {
        center: new naver.maps.LatLng(center.lat, center.lng),
        zoom: 10,
      });

      markers.forEach((marker) => {
        new naver.maps.Marker({
          position: new naver.maps.LatLng(marker.lat, marker.lng),
          map,
          title: marker.title,
        });
      });
    };

    const script = document.createElement("script");
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${NAVER_MAP_CLIENT_ID}`;
    script.async = true;
    script.onload = initializeMap;
    document.head.appendChild(script);

    return () => {
      const scriptTag = document.querySelector(
        `script[src*="openapi.map.naver.com"]`
      );
      if (scriptTag) scriptTag.remove();
    };
  }, [center, markers]);

  return <div id="map" style={{ width: "100%", height: "100%" }} />;
};

export default NaverMap;
