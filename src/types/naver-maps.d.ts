declare namespace naver.maps {
  class Map {
    constructor(container: string | HTMLElement, options: MapOptions);
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

  // Event 네임스페이스 추가
  namespace Event {
    function addListener(
      instance: object,
      eventName: string,
      listener: (event: any) => void
    ): void;
    function removeListener(instance: object, eventName: string): void;
    function trigger(instance: object, eventName: string, ...args: any[]): void;
  }
}
