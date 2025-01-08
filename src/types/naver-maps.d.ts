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
      instance: object,
      eventName: string,
      listener: (event: any) => void
    ): void;
    function removeListener(instance: object, eventName: string): void;
    function trigger(instance: object, eventName: string, ...args: any[]): void;
  }

  namespace Service {
    function geocode(
      options: { query: string },
      callback: (status: string, response: any) => void
    ): void;

    const Status: {
      OK: string;
      ERROR: string;
    };
  }
}
