export default function remarkExtractLinks(options = {}) {
  return tree => {
    const links = [];

    function walk(node) {
      if (node.type === 'link' && !node.url.startsWith('#')) {
        links.push({ url: node.url, text: '🔗' });
      }
      if (node.children) {
        for (const child of node.children) {
          walk(child);
        }
      }
    }

    walk(tree);

    if (links.length > 0) {
      tree.children.push({
        type: 'heading',
        depth: 2,
        children: [{ type: 'text', value: options.heading }],
      });

      tree.children.push({
        type: 'list',
        ordered: true,
        children: links.map(link => ({
          type: 'listItem',
          children: [
            {
              type: 'paragraph',
              children: [
                { type: 'text', value: `${link.text}: ` },
                { type: 'link', url: link.url, children: [{ type: 'text', value: link.url }] },
              ],
            },
          ],
        })),
      });
    }
  };
}
