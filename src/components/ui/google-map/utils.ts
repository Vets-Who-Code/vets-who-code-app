/* eslint-disable react-hooks/exhaustive-deps */

import { isLatLngLiteral } from "@googlemaps/typescript-guards";
import { createCustomEqual } from "fast-equals";
import { useEffect, useRef } from "react";

type LatLngInput = google.maps.LatLng | google.maps.LatLngLiteral | { lat: number; lng: number };

export const deepCompareEqualsForMaps = createCustomEqual(
    (deepEqual) => (a: unknown, b: unknown) => {
        if (
            isLatLngLiteral(a) ||
            a instanceof google.maps.LatLng ||
            isLatLngLiteral(b) ||
            b instanceof google.maps.LatLng
        ) {
            try {
                return new google.maps.LatLng(a as LatLngInput).equals(
                    new google.maps.LatLng(b as LatLngInput)
                );
            } catch {
                return false;
            }
        }

        // TODO extend to other types

        // use fast-equals for other objects
        return deepEqual(a, b);
    }
);

function useDeepCompareMemoize<T>(value: T): T {
    const ref = useRef<T>();

    if (!deepCompareEqualsForMaps(value, ref.current)) {
        ref.current = value;
    }

    return ref.current as T;
}

export function useDeepCompareEffectForMaps(
    callback: React.EffectCallback,
    dependencies: Array<unknown>
): void {
    useEffect(() => callback(), [callback, ...dependencies.map(useDeepCompareMemoize)]);
}
