const Spinner = () => {
    return (
        <div className="tw-bg-primary tw-w-10 tw-h-10 tw-my-10 tw-mx-auto tw-animate-[rotatePlane_1.2s_infinite_ease-in-out]">
            <img
                src="https://res.cloudinary.com/vetswhocode/image/upload/v1627489505/vwc_kym0qt.gif"
                alt="Loading"
                className="tw-w-full tw-h-full"
            />
        </div>
    );
};

export default Spinner;
