import { useEffect, useState } from "react";

const useMount = () => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    return mounted;
};

export default useMount;
