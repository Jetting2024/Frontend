declare namespace naver.maps {
  class Map {
    constructor(container: string | HTMLElement, options: MapOptions);
    getCenter(): LatLng;
    getZoom(): number;
    panTo(center: LatLng, options?: { duration: number }): void;
    setZoom(zoom: number, animate?: boolean): void;
  }

  class LatLng {
    constructor(lat: number, lng: number);
  }

  interface MapOptions {
    center: LatLng;
    zoom: number;
    mapTypeId?: string;
    zoomControl?: boolean;
    zoomControlOptions?: {
      position: keyof typeof Position;
    };
    mapDataControl?: boolean;
    mapTypeControl?: boolean;
  }

  class Marker {
    constructor(options: MarkerOptions);
  }

  interface MarkerOptions {
    position: LatLng;
    map: Map;
    title?: string;
  }

  namespace Event {
    function addListener(
      instance: Map | Marker | object,
      eventName: string,
      listener: (event: any) => void
    ): void;
    function removeListener(
      instance: Map | Marker | object,
      eventName: string
    ): void;
    function trigger(
      instance: Map | Marker | object,
      eventName: string,
      ...args: any[]
    ): void;
  }

  namespace Service {
    function geocode(
      options: { query: string },
      callback: (status: keyof typeof Status, response: GeocodeResponse) => void
    ): void;

    function search(
      options: { query: string },
      callback: (status: keyof typeof Status, response: SearchResponse) => void
    ): void;

    interface GeocodeResponse {
      v2: {
        status: string;
        meta: {
          totalCount: number;
          count: number;
        };
        addresses: Array<{
          roadAddress: string;
          jibunAddress: string;
          x: string;
          y: string;
        }>;
      };
    }

    interface SearchResponse {
      items: Array<{
        title: string;
        address: string;
        mapx: string;
        mapy: string;
        category: string;
        link: string;
      }>;
    }

    const Status: {
      OK: "OK";
      ERROR: "ERROR";
    };
  }

  const Position: {
    TOP_LEFT: "top_left";
    TOP_RIGHT: "top_right";
    BOTTOM_LEFT: "bottom_left";
    BOTTOM_RIGHT: "bottom_right";
  };
}
