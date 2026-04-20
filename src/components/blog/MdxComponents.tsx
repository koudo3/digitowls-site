import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h2: (props) => <h2 className="text-2xl font-heading font-bold mt-8 mb-4 text-primary" {...props} />,
  h3: (props) => <h3 className="text-xl font-heading font-bold mt-6 mb-3 text-primary" {...props} />,
  p: (props) => <p className="text-ink-dim leading-relaxed mb-4" {...props} />,
  ul: (props) => <ul className="list-disc list-inside space-y-2 mb-4 text-ink-dim" {...props} />,
  ol: (props) => <ol className="list-decimal list-inside space-y-2 mb-4 text-ink-dim" {...props} />,
  li: (props) => <li className="leading-relaxed" {...props} />,
  strong: (props) => <strong className="text-primary font-bold" {...props} />,
  a: (props) => <a className="text-secondary hover:underline" target="_blank" rel="noopener noreferrer" {...props} />,
  code: (props) => <code className="bg-surface-2 px-2 py-1 rounded text-sm" {...props} />,
  table: (props) => <div className="overflow-x-auto mb-4"><table className="w-full text-sm text-ink-dim border-collapse" {...props} /></div>,
  th: (props) => <th className="text-left text-primary font-semibold border-b border-border px-3 py-2" {...props} />,
  td: (props) => <td className="border-b border-border px-3 py-2" {...props} />,
  hr: () => <hr className="border-border my-8" />,
};
