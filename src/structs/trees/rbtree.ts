import { type Compare } from "../../cmp.ts";
import {
	BinarySearchTree,
	type BinaryNode,
	type BinaryNodeDirection,
} from "./bst.ts";

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

	static override from<T>(
		values: Iterable<T>,
		compare?: Compare<T>,
	): RedBlackTree<T> {
		const tree = new RedBlackTree<T>(compare);
		for (const value of values) tree.insert(value);
		return tree;
	}

	override insert(value: T): boolean {
		const node = this.insertNode({ value, red: true });
		if (!node) return false;
		this.rebalance(node);
		return true;
	}

	protected override insertNode(
		node: RedBlackNode<T>,
	): RedBlackNode<T> | undefined {
		return super.insertNode(node) as RedBlackNode<T> | undefined;
	}

	override remove(value: T): boolean {
		const node = this.findNode(value) as RedBlackNode<T> | undefined;
		if (!node) return false;

		this.removeNode(node);
		if (!node.red) this.rebalance(node);
		return true;
	}

	protected rebalance(node: RedBlackNode<T>): void {
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
