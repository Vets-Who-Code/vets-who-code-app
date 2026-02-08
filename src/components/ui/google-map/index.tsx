import { Status, Wrapper } from "@googlemaps/react-wrapper";
import GoogleMap from "./map";
import Marker from "./marker";

const render = (status: Status) => {
    return <h1>{status}</h1>;
};

type MapProps = google.maps.MapOptions;

const MyMap: React.FC<MapProps> = ({ ...options }) => {
    return (
        <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || ""} render={render}>
            <GoogleMap {...options}>
                {options.center && <Marker position={options.center} />}
            </GoogleMap>
        </Wrapper>
    );
};

export default MyMap;
