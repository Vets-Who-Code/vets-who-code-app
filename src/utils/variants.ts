import { Variants } from "motion/react";

/* Upgraded scroll animation — subtle, purposeful entrance
   16px translate, 0.5s duration. Content arrives with purpose, not spectacle. */
export const scrollUpVariants: Variants = {
    offscreen: {
        opacity: 0,
        y: 16,
    },
    onscreen: {
        opacity: 1,
        y: 0,
        transition: {
            type: "tween",
            ease: "easeOut",
            duration: 0.5,
        },
    },
};

/* Staggered children — for applying delay across grid items */
export const staggerContainer: Variants = {
    offscreen: {},
    onscreen: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
        },
    },
};

export const scrollLeftVariants: Variants = {
    offscreen: {
        opacity: 0,
        x: -60,
    },
    onscreen: {
        opacity: 1,
        x: 0,
        transition: {
            type: "tween",
            ease: "easeOut",
            duration: 0.5,
        },
    },
};

export const scrollRightVariants: Variants = {
    offscreen: {
        opacity: 0,
        x: 60,
    },
    onscreen: {
        opacity: 1,
        x: 0,
        transition: {
            type: "tween",
            ease: "easeOut",
            duration: 0.5,
        },
    },
};

export const fadeIn: Variants = {
    hidden: {
        y: "-100vh",
        opacity: 0,
    },
    visible: {
        y: "0",
        opacity: 1,
        transition: {
            duration: 0.8,
            type: "tween",
        },
    },
    exit: {
        y: "-100vh",
        opacity: 0,
        transition: {
            duration: 0.4,
            type: "tween",
        },
    },
};

export const fadeInUp: Variants = {
    hidden: {
        y: "100%",
        opacity: 0,
    },
    visible: {
        y: "0",
        opacity: 1,
        transition: {
            duration: 0.5,
            type: "tween",
        },
    },
    exit: {
        y: "100%",
        opacity: 0,
        transition: {
            duration: 0.5,
            type: "tween",
        },
    },
};

export const fadeInLeft: Variants = {
    hidden: {
        x: "100%",
        opacity: 0,
    },
    visible: {
        x: "0",
        opacity: 1,
        transition: {
            duration: 0.5,
            type: "tween",
        },
    },
    exit: {
        x: "100%",
        opacity: 0,
        transition: {
            duration: 0.5,
            type: "tween",
        },
    },
};

export const fadeIn02: Variants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.4,
            type: "spring",
        },
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.4,
            type: "spring",
        },
    },
};

export const flyoutSearch01: Variants = {
    visible: {
        opacity: 1,
        top: "60px",
        transition: {
            duration: 0.5,
            type: "tween",
        },
    },
    hidden: {
        opacity: 0,
        top: "80px",
        transition: {
            duration: 0.5,
            type: "tween",
        },
    },
};

export const flyoutSearch01Inner: Variants = {
    visible: {
        opacity: 1,
        transition: {
            delay: 0.3,
            duration: 0.3,
        },
    },
    hidden: {
        opacity: 0,
        transition: {
            duration: 0.2,
        },
    },
};

export const flyoutSearch02: Variants = {
    hidden: {
        opacity: 0,
        transition: {
            duration: 0.5,
            type: "tween",
            when: "afterChildren",
        },
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.4,
            type: "tween",
            when: "beforeChildren",
        },
    },
};

export const flyoutSearch02Inner: Variants = {
    hidden: {
        opacity: 0,
        y: 50,
        transition: {
            duration: 0.4,
            type: "tween",
        },
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            type: "tween",
        },
    },
};
