import {useCallback, useState} from "react";
import{useDropzone} from "react-dropzone";

/**
 * Formats a file size in bytes to a human-readable string (KB, MB, GB)
 * @param bytes - The file size in bytes
 * @returns A formatted string representing the file size
 */
const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

interface FileUploaderProps {
    onFileSelect?: (file: File | null) => void;
}

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0] || null;

        onFileSelect?.(file);
        }, [onFileSelect]);

    const maxFileSize =  20 * 1024 * 1024;

    const {getRootProps, getInputProps, isDragActive, acceptedFiles} = useDropzone({
        onDrop,
        multiple: false,
        accept: { 'application/pdf' : ['.pdf']},
        maxSize: maxFileSize
    })

    const file = acceptedFiles[0] || null;



    return (

        <div className={"w-full gradient-border"}>
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                <div className={"space-y-4 cursor-pointer"}>
                    {file ? (
                        <div className={"uploader-selected-file"} onClick={(e) => e.stopPropagation()}>
                            <img src="/images/pdf.png" alt={"pdf"} className={"size-10"}/>
                            <div className="flex items-center space-x-3">
                                <div>
                                    <p className="text-sm font-medium text-gray-700 truncate mac-w-xs">{file.name}</p>
                                    <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                                </div>
                            </div>
                            <button className={"p-2 cursor-pointer"} onClick={(e) =>
                            onFileSelect?.(null)}>
                                <img src="/icons/cross.svg" alt="remove" className={"w-4 h-4"}/>
                            </button>
                        </div>
                    ) : (
                        <div>
                            <div className={"mx-auto w-16 h-16 flex items-center mb-2 justify-center"}>
                                <img src={"/icons/info.svg"} alt={"upload"} className={"size-20 "}/>
                            </div>
                            <p className={"text-lg text-gray-500 "}>
                                <span className={"font-semibold "}>
                                    Click to upload
                                </span> or drag and dro
                            </p>
                            <p className={"text-lg text-gray-500 "}>
                                PDF (max {formatFileSize(maxFileSize)})
                            </p>

                        </div>
                    )}
                </div>
            </div>
        </div>

    );
};

export default FileUploader;