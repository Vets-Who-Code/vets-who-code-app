import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Map from "./map";
import Marker from "./marker";

const render = (status: Status) => {
    return <h1>{status}</h1>;
};

type MapProps = google.maps.MapOptions;

const MyMap: React.FC<MapProps> = ({ ...options }) => {
    return (
        <Wrapper
            apiKey="AIzaSyB3mMuvl8IUlviRZiizBiX7uhsdIqunx94"
            render={render}
        >
            <Map {...options}>
                <Marker position={options.center} />
            </Map>
        </Wrapper>
    );
};

export default MyMap;
