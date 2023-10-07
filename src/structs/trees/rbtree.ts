import { type Compare } from "../../cmp";
import { BinarySearchTree, type BinaryNode } from "./bst";

export interface RedBlackNode<T> extends BinaryNode<T> {
	red: boolean;
}

/**
 * ## Red-Black Tree
 * A balanced binary tree
 *
 * | Method        | Average Case | Worst Case |
 * | ------------- | ------------ | ---------- |
 * | has(value)    | O(log n)     | O(n)       |
 * | insert(value) | O(log n)     | O(n)       |
 * | remove(value) | O(log n)     | O(n)       |
 *
 * @see https://en.wikipedia.org/wiki/Red%E2%80%93black_tree
 * @unstable
 */
export class RedBlackTree<T> extends BinarySearchTree<T> {
	protected declare root?: RedBlackNode<T>;

	static override from<T>(values: Iterable<T>, compare?: Compare<T>) {
		const rbtree = new RedBlackTree<T>(compare);
		for (const value of values) rbtree.insert(value);
		return rbtree;
	}
}
