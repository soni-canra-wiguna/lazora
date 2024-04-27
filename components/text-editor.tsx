"use client"

import { type Editor, EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Link from "@tiptap/extension-link"
import Text from "@tiptap/extension-text"
import { Toggle } from "./ui/toggle"
import { Bold, Italic, LinkIcon, List, ListOrdered } from "lucide-react"

interface TextEditorProps {
  value: string
  setValue: (value: string) => void
  className?: string
}

const TextEditor = ({ value, setValue, className }: TextEditorProps) => {
  const editor = useEditor({
    content: value,
    editorProps: {
      attributes: {
        class: "outline-none focus:outline-none min-h-[500px] prose",
      },
    },
    extensions: [
      Text,
      StarterKit.configure(),
      Link.configure({
        openOnClick: false,
        autolink: true,
      }),
    ],
    onUpdate({ editor }) {
      setValue(editor.getHTML())
    },
  })

  return (
    <div className="flex flex-col">
      <MenuBar editor={editor} />
      <EditorContent
        editor={editor}
        className="h-[445px] bg-secondary overflow-y-auto border-none p-2"
        placeholder="description product"
      />
    </div>
  )
}

export default TextEditor

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null

  return (
    <div className="flex items-center gap-2 bg-secondary border-b border-b-primary p-2">
      <Toggle
        className="data-[state=on]:bg-muted-foreground/20 hover:bg-muted-foreground/10 hover:text-primary rounded-none"
        size="sm"
        pressed={editor?.isActive("bold")}
        onPressedChange={() => editor?.chain().focus().toggleBold().run()}
      >
        <Bold className="w-4 h-4" />
      </Toggle>
      <Toggle
        className="data-[state=on]:bg-muted-foreground/20 hover:bg-muted-foreground/10 hover:text-primary rounded-none"
        size="sm"
        pressed={editor?.isActive("italic")}
        onPressedChange={() => editor?.chain().focus().toggleItalic().run()}
      >
        <Italic className="w-4 h-4" />
      </Toggle>
      {/* <Toggle
        pressed={editor?.isActive("link")}
        onPressedChange={() => editor?.chain().focus().toggleLink({}).run()}
      >
        <LinkIcon />
      </Toggle> */}

      <Toggle
        className="data-[state=on]:bg-muted-foreground/20 hover:bg-muted-foreground/10 hover:text-primary rounded-none"
        size="sm"
        pressed={editor?.isActive("bulletList")}
        onPressedChange={() => editor?.chain().focus().toggleBulletList().run()}
      >
        <List className="w-4 h-4" />
      </Toggle>

      <Toggle
        className="data-[state=on]:bg-muted-foreground/20 hover:bg-muted-foreground/10 hover:text-primary rounded-none"
        size="sm"
        pressed={editor?.isActive("orderedList")}
        onPressedChange={() =>
          editor?.chain().focus().toggleOrderedList().run()
        }
      >
        <ListOrdered className="w-4 h-4" />
      </Toggle>
    </div>
  )
}
