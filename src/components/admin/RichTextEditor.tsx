"use client";

import dynamic from 'next/dynamic';
import { useState } from 'react';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { 
  ssr: false, 
  loading: () => <div className="h-48 w-full bg-slate-50 border border-slate-200 rounded-xl animate-pulse"></div> 
});

interface RichTextEditorProps {
  name: string;
  defaultValue?: string | null;
  placeholder?: string;
}

export function RichTextEditor({ name, defaultValue, placeholder }: RichTextEditorProps) {
  const [value, setValue] = useState(defaultValue || '');

  const modules = {
    toolbar: [
      [{ 'header': [2, 3, false] }],
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link'],
      ['clean']
    ],
  };

  return (
    <div className="relative w-full">
      {/* Hidden input ensures the form action can read the value just like a normal textarea */}
      <input type="hidden" name={name} value={value} />
      
      <div className="react-quill-wrapper">
        <ReactQuill 
          theme="snow" 
          value={value} 
          onChange={setValue} 
          modules={modules}
          placeholder={placeholder || "Write description here..."}
          className="bg-white rounded-xl"
        />
      </div>
      
      {/* Tailwind override styles for React Quill to match the rest of the Admin UI */}
      <style dangerouslySetInnerHTML={{__html: `
        .react-quill-wrapper .ql-toolbar {
          border-top-left-radius: 0.75rem;
          border-top-right-radius: 0.75rem;
          border-color: #e2e8f0;
          background-color: #f8fafc;
          padding: 10px;
          border-bottom: 1px solid #e2e8f0;
        }
        .react-quill-wrapper .ql-container {
          border-bottom-left-radius: 0.75rem;
          border-bottom-right-radius: 0.75rem;
          border-color: #e2e8f0;
          min-height: 180px;
          font-family: inherit;
          font-size: 0.875rem;
        }
        .react-quill-wrapper .ql-editor {
          min-height: 180px;
          color: #334155;
        }
        .react-quill-wrapper .ql-editor p {
          margin-bottom: 0.5rem;
        }
        /* Hover and focus states to match Tailwind forms */
        .react-quill-wrapper:focus-within .ql-container {
          border-color: #0f766e;
          box-shadow: inset 0 0 0 1px #0f766e;
        }
        .react-quill-wrapper:focus-within .ql-toolbar {
          border-color: #0f766e;
        }
      `}} />
    </div>
  );
}
