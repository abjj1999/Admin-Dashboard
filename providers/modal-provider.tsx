// this is used to create a modal provider, so you can open the modal from anywhere in the app
// 

"use client";
import { useState, useEffect } from "react";

import { StoreModal } from "@/components/modals/store-modal";

// we are going to add this mdal provider to our global layout.tsx
// but our Layout.tsx is a server component, meaning we can not add Client components to it
// we have to insure that will nt be any hydration errors
// especially when we are using a modal.
export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);
    // if I am server side, I will not render this component and it will return null, otherwise it will return the modal
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <>
            <StoreModal />
        </>
    );
};