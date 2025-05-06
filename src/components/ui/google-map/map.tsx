import { Children, cloneElement, isValidElement, useEffect, useRef, useState } from "react";
import { useDeepCompareEffectForMaps } from "./utils";

interface MapProps extends google.maps.MapOptions {
    children?: React.ReactNode;
    onClick?: (e: google.maps.MapMouseEvent) => void;
}

interface ChildComponentProps {
    map?: google.maps.Map;
}

const Map: React.FC<MapProps> = ({ children, onClick, ...options }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<google.maps.Map>();

    useEffect(() => {
        if (ref.current && !map) {
            setMap(new window.google.maps.Map(ref.current, {}));
        }
    }, [ref, map]);

    // because React does not do deep comparisons, a custom hook is used
    // see discussion in https://github.com/googlemaps/js-samples/issues/946
    useDeepCompareEffectForMaps(() => {
        if (map) {
            map.setOptions(options);
        }
    }, [map, options]);

    useEffect(() => {
        if (map) {
            ["click", "idle"].forEach((eventName) =>
                google.maps.event.clearListeners(map, eventName)
            );

            if (onClick) {
                map.addListener("click", onClick);
            }
        }
    }, [map, onClick]);

    return (
        <>
            <div ref={ref} className="tw-h-full tw-w-full" />
            {Children.map(children, (child) => {
                if (isValidElement(child)) {
                    // set the map prop on the child component
                    return cloneElement(child as React.ReactElement<ChildComponentProps>, { map });
                }
                return null;
            })}
        </>
    );
};

export default Map;
