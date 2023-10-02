import { ascend } from "../../cmp";

export interface BinarySearchNode<T> {
	value: T;
	left?: BinarySearchNode<T>;
	right?: BinarySearchNode<T>;
}

/**
 * ## Binary Search Tree
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
export class BST<T> {
	protected root?: BinarySearchNode<T>;
	#size = 0;

	constructor(readonly compare = ascend) {}

	static from<T>(values: T[]) {
		const bst = new BST<T>();
		for (const value of values) bst.insert(value);
		return bst;
	}

	get size() {
		return this.#size;
	}

	min() {
		let { root: node } = this;
		while (node?.left) node = node.left;
		return node?.value;
	}

	max() {
		let { root: node } = this;
		while (node?.right) node = node.right;
		return node?.value;
	}

	has(value: T) {
		let { root: node, compare } = this;
		while (node) {
			const comparison = compare(value, node.value);
			if (!comparison) return true;
			node = comparison < 0 ? node.left : node.right;
		}

		return false;
	}

	insert(value: T) {
		const { root, compare } = this;
		const node: BinarySearchNode<T> = { value };
		if (root) {
			let parent = root;
			while (parent) {
				const comparison = compare(value, parent.value);
				const { left, right } = parent;
				if (comparison < 0) {
					if (left) parent = left;
					else {
						parent.left = node;
						this.#size++;
						return true;
					}
				} else if (right) parent = right;
				else {
					parent.right = node;
					this.#size++;
					return true;
				}
			}

			return false;
		}

		this.root = node;
		this.#size++;
		return true;
	}

	remove(value: T) {
		const { root, compare } = this;
		let parent: BinarySearchNode<T> | undefined;
		let node = root;
		while (node) {
			const comparison = compare(value, node.value);
			if (!comparison) break;
			parent = node;
			node = comparison < 0 ? node.left : node.right;
		}

		if (!node) return;
		this.#size--;
		if (!node.left && !node.right) {
			if (!parent) this.root = undefined;
			else if (parent.left === node) parent.left = undefined;
			else parent.right = undefined;
		} else if (!node.left) {
			if (!parent) this.root = node.right;
			else if (parent.left === node) parent.left = node.right;
			else parent.right = node.right;
		} else if (node.right) {
			let parent = node;
			let child = node.right;
			while (child.left) {
				parent = child;
				child = child.left;
			}

			node.value = child.value;
			if (parent === node) parent.right = child.right;
			else parent.left = child.right;
		} else if (!parent) this.root = node.left;
		else if (parent.left === node) parent.left = node.left;
		else parent.right = node.left;
	}

	/**
	 * Returns an iterator that uses in-order (LNR) tree traversal for
	 * retrieving values from the binary search tree.
	 */
	*lnrValues(): IterableIterator<T> {
		const nodes: Array<BinarySearchNode<T>> = [];
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
	*rnlValues(): IterableIterator<T> {
		const nodes: Array<BinarySearchNode<T>> = [];
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
	*nlrValues(): IterableIterator<T> {
		const nodes: Array<BinarySearchNode<T>> = [];
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
	*lrnValues(): IterableIterator<T> {
		const nodes: Array<BinarySearchNode<T>> = [];
		let node = this.root;
		let lastNodeVisited: BinarySearchNode<T> | undefined;
		while (nodes.length || node) {
			if (node) {
				nodes.push(node);
				node = node.left;
			} else {
				const lastNode: BinarySearchNode<T> = nodes.at(-1)!;
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
	*lvlValues(): IterableIterator<T> {
		const children: Array<BinarySearchNode<T>> = [];
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
	*[Symbol.iterator](): IterableIterator<T> {
		yield* this.lnrValues();
	}
}
