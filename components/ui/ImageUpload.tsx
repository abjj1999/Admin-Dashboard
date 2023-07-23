"use client";

import { useState, useEffect } from "react";
import { Button } from "./button";
import { ImagePlus, Trash } from "lucide-react";
import  Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";
interface ImageUploadProps {
    disabled?: boolean;
    onChange: (value: string) => void;
    onRemove: (value: string) => void;
    value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    disabled,
    onChange,
    onRemove,
    value,
}) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    
    const onUpload = async (result: any) => {
        onChange(result.info.secure_url);
    }

    if(!mounted) return null;
    return ( 
        <div className="">
            <div className="mb-4 flex items-center gap-4">
                {value.map((url, index) => (
                    <div className="relative w-[200px] h-[200px] rounded-md overflow-hidden" key={url}>
                        <div className="z-10 absolute top-2 right-2">
                            <Button type="button" onClick={() => onRemove(url)} variant="destructive" size="icon">
                                <Trash className="h-4 w-4" />
                            </Button>
                        </div>
                        <Image
                            fill
                            className="cover"
                            alt="image"
                            src={url}
                        />
                    </div>
                ))}
            </div>
            <CldUploadWidget onUpload={onUpload} uploadPreset="tbr9zboh">

                    {
                        ({open}) => {
                            const onClick = () => {
                                open();
                            }
                            return (
                                <Button variant="secondary" onClick={onClick} disabled={disabled}>
                                    <ImagePlus className="mr-2 h-4 w-4"  />
                                    Upload Image
                                </Button>
                            )
                        }
                    }
            </CldUploadWidget>
        </div>
     );
}
 
export default ImageUpload;