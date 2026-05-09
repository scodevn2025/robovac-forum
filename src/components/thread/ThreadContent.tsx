// Renders TipTap JSON content to HTML
interface ThreadContentProps {
  content: string; // JSON string
}

interface TipTapNode {
  type: string;
  text?: string;
  content?: TipTapNode[];
  marks?: Array<{ type: string; attrs?: Record<string, string> }>;
  attrs?: Record<string, string | number>;
}

export function ThreadContent({ content }: ThreadContentProps) {
  let doc: TipTapNode;
  try {
    doc = JSON.parse(content);
  } catch {
    return <div className="prose max-w-none">{content}</div>;
  }

  return <div className="prose max-w-none text-sm leading-relaxed">{renderNode(doc)}</div>;
}

function renderNode(node: TipTapNode, key?: number): React.ReactNode {
  if (!node) return null;

  switch (node.type) {
    case "doc":
      return <div key={key}>{node.content?.map((n, i) => renderNode(n, i))}</div>;

    case "paragraph":
      return (
        <p key={key} className="mb-2">
          {node.content?.map((n, i) => renderNode(n, i))}
        </p>
      );

    case "text": {
      let text: React.ReactNode = node.text ?? "";
      if (node.marks) {
        for (const mark of node.marks) {
          if (mark.type === "bold") text = <strong key={key}>{text}</strong>;
          else if (mark.type === "italic") text = <em key={key}>{text}</em>;
          else if (mark.type === "underline") text = <u key={key}>{text}</u>;
          else if (mark.type === "strike") text = <s key={key}>{text}</s>;
          else if (mark.type === "link") {
            text = (
              <a key={key} href={mark.attrs?.href} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                {text}
              </a>
            );
          }
        }
      }
      return <span key={key}>{text}</span>;
    }

    case "heading": {
      const level = node.attrs?.level ?? 2;
      const Tag = `h${level}` as keyof JSX.IntrinsicElements;
      return (
        <Tag key={key} className="font-bold mb-2 mt-4">
          {node.content?.map((n, i) => renderNode(n, i))}
        </Tag>
      );
    }

    case "bulletList":
      return (
        <ul key={key} className="list-disc pl-5 mb-2 space-y-1">
          {node.content?.map((n, i) => renderNode(n, i))}
        </ul>
      );

    case "orderedList":
      return (
        <ol key={key} className="list-decimal pl-5 mb-2 space-y-1">
          {node.content?.map((n, i) => renderNode(n, i))}
        </ol>
      );

    case "listItem":
      return <li key={key}>{node.content?.map((n, i) => renderNode(n, i))}</li>;

    case "blockquote":
      return (
        <blockquote key={key} className="border-l-4 border-muted pl-4 italic mb-2">
          {node.content?.map((n, i) => renderNode(n, i))}
        </blockquote>
      );

    case "codeBlock":
      return (
        <pre key={key} className="bg-muted rounded p-3 mb-2 overflow-x-auto text-sm">
          <code>{node.content?.[0]?.text}</code>
        </pre>
      );

    case "horizontalRule":
      return <hr key={key} className="my-4" />;

    case "image":
      return (
        <img
          key={key}
          src={node.attrs?.src as string}
          alt={node.attrs?.alt as string ?? ""}
          className="rounded-lg max-w-full my-2"
        />
      );

    default:
      if (node.content) {
        return <div key={key}>{node.content.map((n, i) => renderNode(n, i))}</div>;
      }
      return node.text ? <span key={key}>{node.text}</span> : null;
  }
}
