import marked from "marked";
// maybe add this one day
// import DOMPurify from "dompurify";

export default function Markdown({ content, unsafe = false }) {
  let html = marked(content);
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
