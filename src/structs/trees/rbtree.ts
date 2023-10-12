import { type Compare } from "../../cmp";
import {
	BinarySearchTree,
	type BinaryNode,
	type BinaryNodeDirection,
} from "./bst";

export interface RedBlackNode<T> extends BinaryNode<T> {
	parent?: RedBlackNode<T>;
	left?: RedBlackNode<T>;
	right?: RedBlackNode<T>;
	red: boolean;
}

/**
 * ## Red-Black Tree
 * A self-balancing binary tree
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
		const tree = new RedBlackTree<T>(compare);
		for (const value of values) tree.insert(value);
		return tree;
	}

	override insert(value: T) {
		let node: RedBlackNode<T> = {
			value,
			red: true,
		};
		if (!this.insertNode(node)) return false;

		while (node.parent?.red) {
			let { parent } = node;
			const parentDirection: BinaryNodeDirection =
				node === parent.left ? "left" : "right";
			const uncleDirection: BinaryNodeDirection =
				parentDirection === "left" ? "right" : "left";
			const grandparent = parent.parent!;
			const uncle = grandparent[uncleDirection];
			if (uncle?.red) {
				parent.red = false;
				uncle.red = false;
				grandparent.red = true;
				node = grandparent;
			} else {
				if (node === parent[uncleDirection]) {
					node = parent;
					this.rotate(node, parentDirection);
					parent = node.parent!;
				}

				parent.red = false;
				grandparent.red = true;
				this.rotate(grandparent, uncleDirection);
			}
		}

		this.root!.red = false;
		return true;
	}

	override remove(value: T): boolean {
		const node = this.findNode(value) as RedBlackNode<T> | undefined;
		if (!node) return false;

		this.removeNode(node);
		if (!node.red) this.rebalance(node);
		return true;
	}

	protected rebalance(node: RedBlackNode<T>) {
		let { parent } = node;
		let current = node.left || node.right;
		while (parent && !current?.red) {
			const direction: BinaryNodeDirection =
				parent.left === current ? "left" : "right";
			const siblingDirection: BinaryNodeDirection =
				direction === "right" ? "left" : "right";
			let sibling: RedBlackNode<T> | undefined = parent[siblingDirection];

			if (sibling?.red) {
				sibling.red = false;
				parent.red = true;
				this.rotate(parent, direction);
				sibling = parent[siblingDirection];
			}

			if (sibling) {
				if (!sibling.left?.red && !sibling.right?.red) {
					sibling.red = true;
					current = parent;
					parent = current.parent;
				} else {
					if (!sibling[siblingDirection]?.red) {
						sibling[direction]!.red = false;
						sibling.red = true;
						this.rotate(sibling, siblingDirection);
						sibling = parent[siblingDirection];
					}

					sibling!.red = parent.red;
					parent.red = false;
					sibling![siblingDirection]!.red = false;
					this.rotate(parent, direction);
					current = this.root;
					parent = undefined;
				}
			}
		}

		if (current) current.red = false;
	}
}
