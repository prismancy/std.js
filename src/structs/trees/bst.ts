import { ascend } from "../../cmp";

export interface BinaryNode<T> {
	parent?: BinaryNode<T>;
	value: T;
	left?: BinaryNode<T>;
	right?: BinaryNode<T>;
}

type Direction = "left" | "right";

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

	constructor(readonly compare = ascend) {}

	static from<T>(values: Iterable<T>) {
		const bst = new BinarySearchTree<T>();
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
		return !!this.findNode(value);
	}

	protected findNode(value: T) {
		let { root: node, compare } = this;
		while (node) {
			const comparison = compare(value, node.value);
			if (!comparison) return node;
			node = comparison < 0 ? node.left : node.right;
		}

		return node;
	}

	protected rotate(node: BinaryNode<any>, direction: Direction) {
		const replacementDirection: Direction =
			direction === "left" ? "right" : "left";
		const replacement = node[replacementDirection];
		if (!replacement) return;
		replacement.parent = node.parent;
		node.parent = replacement;
		node[replacementDirection] = replacement[direction];
		const grandchild = replacement[direction];
		if (grandchild) grandchild.parent = node;
		replacement[direction] = node;
		return replacement;
	}

	protected insertNode(node: BinaryNode<T>) {
		const { root, compare } = this;
		if (root) {
			let parent = root;
			const { value } = node;
			while (this) {
				const comparison = compare(value, parent.value);
				if (!comparison) break;
				const direction: Direction = comparison < 0 ? "left" : "right";
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

	protected removeNode(node: BinaryNode<T>) {
		const { parent } = node;
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
		return node;
	}

	/**
	 * Inserts a value into the BST
	 * @param value
	 * @returns the inserted node if it was inserted, otherwise undefined
	 */
	insert(value: T): BinaryNode<T> | undefined {
		return this.insertNode({ value });
	}

	/**
	 * Inserts a value into the BST
	 * @param value
	 * @returns the inserted node if it was inserted, otherwise undefined
	 */
	remove(value: T) {
		const node = this.findNode(value);
		if (!node) return;
		return this.removeNode(node);
	}

	/**
	 * Returns an iterator that uses in-order (LNR) tree traversal for
	 * retrieving values from the binary search tree.
	 */
	*lnrValues(): IterableIterator<T> {
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
	*rnlValues(): IterableIterator<T> {
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
	*nlrValues(): IterableIterator<T> {
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
	*lrnValues(): IterableIterator<T> {
		const nodes: Array<BinaryNode<T>> = [];
		let node = this.root;
		let lastNodeVisited: BinaryNode<T> | undefined;
		while (nodes.length || node) {
			if (node) {
				nodes.push(node);
				node = node.left;
			} else {
				const lastNode: BinaryNode<T> = nodes.at(-1)!;
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
	*[Symbol.iterator](): IterableIterator<T> {
		yield* this.lnrValues();
	}
}
