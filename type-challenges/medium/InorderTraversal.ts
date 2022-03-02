{
  interface TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
  }

  type InorderTraversal<T extends TreeNode | null> = T extends TreeNode
    ? T['left'] extends TreeNode
      ? [
          ...InorderTraversal<T['left']>,
          T['val'],
          ...InorderTraversal<T['right']>
        ]
      : T['right'] extends TreeNode
      ? [T['val'], ...InorderTraversal<T['right']>]
      : [T['val']]
    : [];

  const tree1 = {
    val: 1,
    left: null,
    right: {
      val: 2,
      left: {
        val: 3,
        left: null,
        right: null,
      },
      right: null,
    },
  } as const;

  type A = InorderTraversal<typeof tree1>; // [1, 3, 2]
}
