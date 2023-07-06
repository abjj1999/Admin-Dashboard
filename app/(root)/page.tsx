"use client";

import {Modal} from "@/components/ui/Modal";

export default function SetupPage() {
  return (
    <div className="p-4">
        <Modal
            title="Modal Title"
            description="Modal Description"
            isOpen={true}
            onClose={() => {}}
        />
        
    </div>
  );
}
