const dfs = (node, target) => {
  if (node.id === target.id) {
    return node;
  }
  if (!node.children) {
    return null;
  }
  let matched = null;
  const subs = node.children;
  for (let i = 0, len = subs.length; i < len; i += 1) {
    const sub = subs[i];
    matched = dfs(sub, target);
    if (matched) {
      break;
    }
  }
  return matched;
};

export {
  dfs,
};
export default dfs;
