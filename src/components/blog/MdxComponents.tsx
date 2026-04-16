import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h2: (props) => <h2 className="text-2xl font-heading font-bold mt-8 mb-4" {...props} />,
  h3: (props) => <h3 className="text-xl font-heading font-bold mt-6 mb-3" {...props} />,
  p: (props) => <p className="text-white/80 leading-relaxed mb-4" {...props} />,
  ul: (props) => <ul className="list-disc list-inside space-y-2 mb-4 text-white/80" {...props} />,
  li: (props) => <li className="leading-relaxed" {...props} />,
  strong: (props) => <strong className="text-white font-bold" {...props} />,
  a: (props) => <a className="text-secondary hover:underline" target="_blank" rel="noopener noreferrer" {...props} />,
  code: (props) => <code className="bg-white/10 px-2 py-1 rounded text-sm" {...props} />,
};
