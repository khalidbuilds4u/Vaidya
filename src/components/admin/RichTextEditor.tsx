"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import { Bold, Italic, List, ListOrdered, Heading2, Heading3, Link as LinkIcon, Unlink } from 'lucide-react';
import { useState } from 'react';

interface RichTextEditorProps {
  name: string;
  defaultValue?: string | null;
  placeholder?: string;
}

export function RichTextEditor({ name, defaultValue, placeholder }: RichTextEditorProps) {
  const [content, setContent] = useState(defaultValue || '');

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-primary underline underline-offset-4',
        },
      }),
    ],
    content: defaultValue || '',
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose-base max-w-none focus:outline-none min-h-[200px] p-4 bg-white',
      },
    },
  });

  const setLink = () => {
    const previousUrl = editor?.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);
    
    if (url === null) return;
    
    if (url === '') {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    
    editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  if (!editor) {
    return <div className="h-48 w-full bg-slate-50 border border-slate-200 rounded-xl animate-pulse"></div>;
  }

  const ToolbarButton = ({ onClick, isActive, icon: Icon }: { onClick: () => void, isActive: boolean, icon: any }) => (
    <button
      type="button"
      onClick={onClick}
      className={`p-2 rounded-lg transition-colors ${
        isActive 
          ? 'bg-primary/10 text-primary font-bold' 
          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
      }`}
    >
      <Icon className="w-4 h-4" />
    </button>
  );

  return (
    <div className="relative w-full rounded-xl border border-slate-200 overflow-hidden focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
      <input type="hidden" name={name} value={content} />
      
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 bg-slate-50 border-b border-slate-200 p-2">
        <ToolbarButton 
          onClick={() => editor.chain().focus().toggleBold().run()} 
          isActive={editor.isActive('bold')} 
          icon={Bold} 
        />
        <ToolbarButton 
          onClick={() => editor.chain().focus().toggleItalic().run()} 
          isActive={editor.isActive('italic')} 
          icon={Italic} 
        />
        <div className="w-px h-6 bg-slate-300 mx-1" />
        <ToolbarButton 
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} 
          isActive={editor.isActive('heading', { level: 2 })} 
          icon={Heading2} 
        />
        <ToolbarButton 
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} 
          isActive={editor.isActive('heading', { level: 3 })} 
          icon={Heading3} 
        />
        <div className="w-px h-6 bg-slate-300 mx-1" />
        <ToolbarButton 
          onClick={() => editor.chain().focus().toggleBulletList().run()} 
          isActive={editor.isActive('bulletList')} 
          icon={List} 
        />
        <ToolbarButton 
          onClick={() => editor.chain().focus().toggleOrderedList().run()} 
          isActive={editor.isActive('orderedList')} 
          icon={ListOrdered} 
        />
        <div className="w-px h-6 bg-slate-300 mx-1" />
        <ToolbarButton 
          onClick={setLink} 
          isActive={editor.isActive('link')} 
          icon={LinkIcon} 
        />
        <ToolbarButton 
          onClick={() => editor.chain().focus().unsetLink().run()} 
          isActive={false} 
          icon={Unlink} 
        />
      </div>

      {/* Editor Area */}
      <EditorContent editor={editor} className="bg-white [&_.ProseMirror]:min-h-[200px]" />
    </div>
  );
}
