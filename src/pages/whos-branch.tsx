import React, { useState } from "react";
import Breadcrumb from "@components/breadcrumb";
import Game from "@components/whos-branch";

const WhosBranchPage = () => {
    return (
        <>
            <Breadcrumb pages={[{ path: "/", label: "Home" }]} currentPage="Who's Branch" />
            <Game />
        </>
    );
};

export default WhosBranchPage;
