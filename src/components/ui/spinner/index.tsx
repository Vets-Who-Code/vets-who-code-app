const Spinner = () => {
    return (
        <div className="tw-mx-auto tw-my-10 tw-h-10 tw-w-10 tw-animate-[rotatePlane_1.2s_infinite_ease-in-out] tw-bg-primary">
            <img
                src="https://res.cloudinary.com/vetswhocode/image/upload/v1627489505/vwc_kym0qt.gif"
                alt="Loading"
                className="tw-h-full tw-w-full"
            />
        </div>
    );
};

export default Spinner;
