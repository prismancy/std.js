import { ascend, type Compare } from "../../cmp.ts";
import { uint } from "../../types.ts";

export interface BinaryNode<T> {
  parent?: BinaryNode<T>;
  value: T;
  left?: BinaryNode<T>;
  right?: BinaryNode<T>;
}

export type BinaryNodeDirection = "left" | "right";

/**
 * ## Binary Search Tree (BST)
 * An unbalanced binary tree
 *
 * | Method        | Average Case | Worst Case |
 * | ------------- | ------------ | ---------- |
 * | has(value)    | O(log n)     | O(n)       |
 * | insert(value) | O(log n)     | O(n)       |
 * | remove(value) | O(log n)     | O(n)       |
 *
 * @see https://en.wikipedia.org/wiki/Binary_search_tree
 * @unstable
 */
export class BinarySearchTree<T> implements Iterable<T> {
  protected root?: BinaryNode<T>;
  #size = 0;

  constructor(readonly compare: Compare<T> = ascend) {}

  static from<T>(
    values: Iterable<T> | BinarySearchTree<T>,
    compare?: Compare<T>,
  ): BinarySearchTree<T> {
    const tree = new BinarySearchTree<T>(compare);
    if (values instanceof BinarySearchTree) {
      const nodes: Array<BinaryNode<T>> = [];
      if (values.root) {
        tree.root = { ...values.root };
        nodes.push(tree.root);
      }

      while (nodes.length) {
        const node = nodes.pop()!;
        if (node.left) nodes.push({ ...node.left, parent: node });
        if (node.right) nodes.push({ ...node.right, parent: node });
      }
    } else {
      for (const value of values) tree.insert(value);
    }

    return tree;
  }

  get size(): uint {
    return this.#size;
  }

  min(): T | undefined {
    let { root: node } = this;
    while (node?.left) node = node.left;
    return node?.value;
  }

  max(): T | undefined {
    let { root: node } = this;
    while (node?.right) node = node.right;
    return node?.value;
  }

  clear(): void {
    delete this.root;
    this.#size = 0;
  }

  has(value: T): boolean {
    return !!this.findNode(value);
  }

  protected findNode(value: T): BinaryNode<T> | undefined {
    let { root: node, compare } = this;
    while (node) {
      const comparison = compare(value, node.value);
      if (!comparison) return node;
      node = comparison < 0 ? node.left : node.right;
    }

    return node;
  }

  /**
   * Inserts a value into the BST
   * @param value
   * @returns if the value was inserted
   */
  insert(value: T): boolean {
    return !!this.insertNode({ value });
  }

  protected insertNode(node: BinaryNode<T>): BinaryNode<T> | undefined {
    const { root, compare } = this;
    if (root) {
      let parent = root;
      const { value } = node;
      while (this) {
        const comparison = compare(value, parent.value);
        if (!comparison) break;
        const direction: BinaryNodeDirection = comparison < 0
          ? "left"
          : "right";
        const child = parent[direction];
        if (child) {
          parent = child;
        } else {
          node.parent = parent;
          parent[direction] = node;
          this.#size++;
          return node;
        }
      }

      return;
    }

    this.root = node;
    this.#size++;
    return node;
  }

  /**
   * Removes a value into the BST
   * @param value
   * @returns if the value was removed
   */
  remove(value: T): boolean {
    const node = this.findNode(value);
    if (!node) return false;
    this.removeNode(node);
    return true;
  }

  protected removeNode(node: BinaryNode<T>): void {
    // Zero children
    if (!node.left && !node.right) {
      if (node.parent) {
        const direction: BinaryNodeDirection = node.parent.left === node
          ? "left"
          : "right";
        node.parent[direction] = undefined;
      } else {
        this.root = undefined;
      }

      return;
    }

    // One child
    if (!node.left || !node.right) {
      if (node.left) {
        node.value = node.left.value;
        node.left = undefined;
      } else {
        node.value = node.right!.value;
        node.right = undefined;
      }

      return;
    }

    // Two children
    let successor = node.right;
    while (successor?.left) successor = successor.left;
    node.value = successor.value;
    successor.parent![successor === successor.parent!.left ? "left" : "right"] =
      undefined;
  }

  /**
   * Rotates a node in the given direction
   * @param node
   * @param direction which direction to rotate the node
   * @returns if the rotation was successful (the node had a child in the given direction)
   */
  protected rotate(
    node: BinaryNode<T>,
    direction: BinaryNodeDirection,
  ): boolean {
    const replacementDirection: BinaryNodeDirection = direction === "left"
      ? "right"
      : "left";
    const replacement = node[replacementDirection];
    if (!replacement) return false;
    replacement.parent = node.parent;
    node.parent = replacement;
    node[replacementDirection] = replacement[direction];
    const grandchild = replacement[direction];
    if (grandchild) grandchild.parent = node;
    replacement[direction] = node;
    return true;
  }

  /**
   * Returns an iterator that uses in-order (LNR) tree traversal for
   * retrieving values from the binary search tree.
   */
  *lnrValues(): Generator<T> {
    const nodes: Array<BinaryNode<T>> = [];
    let node = this.root;
    while (nodes.length || node) {
      if (node) {
        nodes.push(node);
        node = node.left;
      } else {
        node = nodes.pop()!;
        yield node.value;
        node = node.right;
      }
    }
  }

  /**
   * Returns an iterator that uses reverse in-order (RNL) tree traversal for
   * retrieving values from the binary search tree.
   */
  *rnlValues(): Generator<T> {
    const nodes: Array<BinaryNode<T>> = [];
    let node = this.root;
    while (nodes.length || node) {
      if (node) {
        nodes.push(node);
        node = node.right;
      } else {
        node = nodes.pop()!;
        yield node.value;
        node = node.left;
      }
    }
  }

  /**
   * Returns an iterator that uses pre-order (NLR) tree traversal for
   * retrieving values from the binary search tree.
   */
  *nlrValues(): Generator<T> {
    const nodes: Array<BinaryNode<T>> = [];
    if (this.root) nodes.push(this.root);
    while (nodes.length) {
      const node = nodes.pop()!;
      yield node.value;
      if (node.right) nodes.push(node.right);
      if (node.left) nodes.push(node.left);
    }
  }

  /**
   * Returns an iterator that uses post-order (LRN) tree traversal for
   * retrieving values from the binary search tree.
   */
  *lrnValues(): Generator<T> {
    const nodes: Array<BinaryNode<T>> = [];
    let node = this.root;
    let lastNodeVisited: BinaryNode<T> | undefined;
    while (nodes.length || node) {
      if (node) {
        nodes.push(node);
        node = node.left;
      } else {
        const lastNode = nodes.at(-1)!;
        if (lastNode.right && lastNode.right !== lastNodeVisited) {
          node = lastNode.right;
        } else {
          yield lastNode.value;
          lastNodeVisited = nodes.pop()!;
        }
      }
    }
  }

  /**
   * Returns an iterator that uses level order tree traversal for
   * retrieving values from the binary search tree.
   */
  *lvlValues(): Generator<T> {
    const children: Array<BinaryNode<T>> = [];
    let cursor = this.root;
    while (cursor) {
      yield cursor.value;
      if (cursor.left) children.push(cursor.left);
      if (cursor.right) children.push(cursor.right);
      cursor = children.shift();
    }
  }

  /**
   * Returns an iterator that uses in-order (LNR) tree traversal for
   * retrieving values from the binary search tree.
   */
  *[Symbol.iterator](): Iterator<T> {
    yield* this.lnrValues();
  }
}
