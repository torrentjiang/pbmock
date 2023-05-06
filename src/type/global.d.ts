declare module '*.scss?l' {
    const content: any;
    export default content;
}

declare module '*.scss' {
    const content: any;
    export default content;
}

declare module '*.less' {
    const classes: { [key: string]: string };
    export default classes;
}

declare namespace AMap {
    type MapConf = {
        center: number[];
        zoom?: number,
        [x: string]: any
    };

    type MarkerConf = {
        map: Map,
        position?: number[],
        icon: string,
        offset?: Pixel,
        autoRotation?: boolean
        angle?: number
    }

    type PolylineConf = {
        map: Map,
        path: number[][],
        showDir?: boolean,
        strokeColor: string,
        strokeWeight: number
    }

    type PolygonConf = {
        map: Map,
        zIndex: number,
        path: LngLat[] | LngLat[][]
    }

    export class Map {
        constructor(container: string | HTMLElement, conf: MapConf)
        setCenter(pos: number[]): void
        setFitView(): void
        destroy(): void
    }

    export class Marker {
        constructor(conf: MarkerConf)
        moveAlong(lineArr: number[][], speed: number): void
        pauseMove(): void
        resumeMove(): void
        stopMove(): void
        on(type: 'moving' | string, cb: (event: { type: string, passedPath: number[][] }) => void): void
    }

    export class Pixel {
        constructor(left: number, top: number)
    }

    export class Polyline {
        constructor(conf: PolylineConf)
        setPath(path: number[]): any
    }


    export class Polygon {
        constructor(conf: PolygonConf)
    }

    export class LngLat {
        constructor(conf: { lng: number, lat: number, noAutofix: boolean })
        offset(w: number, s: number): LngLat
        distance(lnglat: LngLat | LngLat[]): number
        getLng(): number
        getLat(): number
        equals(lnglat: LngLat): boolean
        toString(): string
    }
}
