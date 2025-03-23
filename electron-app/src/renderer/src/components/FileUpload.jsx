import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { IconUpload } from "@tabler/icons-react";
import { useDropzone } from "react-dropzone";

function cn(...inputs) {
  return inputs.filter(Boolean).join(" ");
}

const mainVariant = {
  initial: {
    x: 0,
    y: 0,
  },
  animate: {
    x: 20,
    y: -20,
    opacity: 0.9,
  },
};

const secondaryVariant = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};

export const FileUpload = ({ onChange }) => {
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileChange = (newFiles) => {
    const updatedFiles = [...files, ...newFiles];
    setFiles(updatedFiles);
    onChange && onChange(updatedFiles);
  };

  const handleClear = (e) => {
    e.stopPropagation();
    setFiles([]);
    onChange && onChange([]);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const { getRootProps, isDragActive } = useDropzone({
    multiple: false,
    noClick: true,
    onDrop: handleFileChange,
    onDropRejected: (error) => {
      console.log(error);
    },
  });

  return (
    <div className="w-full" {...getRootProps()}>
      <motion.div
        onClick={handleClick}
        whileHover="animate"
        className="p-10 group/file block rounded-lg cursor-pointer w-full relative overflow-hidden"
      >
        <input
          ref={fileInputRef}
          id="file-upload-handle"
          type="file"
          onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
          className="hidden"
        />

        <div className="flex flex-col items-center justify-center">
          <p className="relative z-20 text-lg font-medium text-white mt-2 ">
            Drag or drop your files here or click to scan
          </p>
          <div
            className="relative w-full mt-10 max-w-xl mx-auto "
            style={{
              scrollbarWidth: 'none' /* Firefox */,
              msOverflowStyle: 'none' /* Internet Explorer 10+ */
            }}
          >
            {/* Hide scrollbar for WebKit browsers */}
            <style>
              {`
                .relative::-webkit-scrollbar {
                  display: none;
                }
              `}
            </style>
            {files.length > 0 &&
              files.map((file, idx) => (
                <motion.div
                  key={'file' + idx}
                  layoutId={idx === 0 ? 'file-upload' : 'file-upload-' + idx}
                  className={cn(
                    'relative overflow-hidden z-40 bg-white dark:bg-gray-800 flex flex-col items-start justify-start md:h-24 p-4 mt-4 w-full mx-auto rounded-md',
                    'shadow-sm'
                  )}
                >
                  <div className="flex justify-between w-full items-center gap-4">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="text-base text-neutral-700 dark:text-neutral-300 truncate max-w-xs"
                    >
                      {file.name}
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="rounded-lg px-2 py-1 w-fit flex-shrink-0 text-sm text-neutral-600 dark:bg-neutral-800 dark:text-white shadow-input"
                    >
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </motion.p>
                  </div>

                  <div className="flex text-sm md:flex-row flex-col items-start md:items-center w-full mt-2 justify-between text-neutral-600 dark:text-neutral-400">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-gray-900"
                    >
                      {file.type}
                    </motion.p>

                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} layout>
                      modified {new Date(file.lastModified).toLocaleDateString()}
                    </motion.p>
                  </div>
                </motion.div>
              ))}
            {!files.length && (
              <motion.div
                layoutId="file-upload"
                variants={mainVariant}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 20
                }}
                className={cn(
                  'relative group-hover/file:shadow-2xl z-40 bg-white dark:bg-[#2195f390] flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md',
                  'shadow-[0px_10px_50px_rgba(0,0,0,0.1)]'
                )}
              >
                {isDragActive ? (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-neutral-600 flex flex-col items-center"
                  >
                    Drop it
                    <IconUpload className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
                  </motion.p>
                ) : (
                  <IconUpload className="h-4 w-4 text-neutral-600 dark:text-neutral-300" />
                )}
              </motion.div>
            )}

            {!files.length && (
              <motion.div
                variants={secondaryVariant}
                className="absolute opacity-0 border-2 border-dashed border-sky-400 inset-0 z-30 bg-transparent flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md"
              ></motion.div>
            )}
          </div>
        </div>

        {/* Clear Button (Conditional Rendering) */}
        {files.length > 0 && (
          <motion.button
            onClick={handleClear}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 w-full max-w-[8rem] mx-auto h-10 bg-white text-black font-bold rounded-full shadow-sm hover:bg-red-600 transition-all duration-300"
          >
            Clear
          </motion.button>
        )}
      </motion.div>
    </div>
  )
};