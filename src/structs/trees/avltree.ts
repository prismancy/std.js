import { type Compare } from "../../cmp";
import {
	BinarySearchTree,
	type BinaryNode,
	type BinaryNodeDirection,
} from "./bst";

export interface AvlNode<T> extends BinaryNode<T> {
	parent?: AvlNode<T>;
	left?: AvlNode<T>;
	right?: AvlNode<T>;
	bf: number;
}

/**
 * ## AVL Tree
 * A self-balancing binary tree
 *
 * | Method        | Average Case | Worst Case |
 * | ------------- | ------------ | ---------- |
 * | has(value)    | O(log n)     | O(n)       |
 * | insert(value) | O(log n)     | O(n)       |
 * | remove(value) | O(log n)     | O(n)       |
 *
 * @see https://en.wikipedia.org/wiki/AVL_tree
 * @unstable
 */
export class AvlTree<T> extends BinarySearchTree<T> {
	protected declare root?: AvlNode<T>;

	static override from<T>(values: Iterable<T>, compare?: Compare<T>) {
		const tree = new AvlTree<T>(compare);
		for (const value of values) tree.insert(value);
		return tree;
	}

	override insert(value: T): boolean {
		const node = this.insertNode({ value, bf: 0 });
		if (!node) return false;
		this.rebalance(node);
		return true;
	}

	protected override insertNode(node: AvlNode<T>): AvlNode<T> | undefined {
		return super.insertNode(node) as AvlNode<T> | undefined;
	}

	override remove(value: T): boolean {
		const node = this.findNode(value) as AvlNode<T> | undefined;
		if (!node) return false;

		this.removeNode(node);
		this.rebalance(node);
		return true;
	}

	protected rebalance(node: AvlNode<T>) {
		const { parent } = node;
		if (!parent) return;
		const parentDirection: BinaryNodeDirection =
			node === parent.left ? "left" : "right";

		if (parentDirection === "left") {
			if (node.bf <= 0) this.rotate(node, "left");
			else if (node.bf > 0) {
				this.rotate(node.right!, "right");
				this.rotate(node, "left");
			}
		} else if (node.bf >= 0) this.rotate(node, "right");
		else if (node.bf < 0) {
			this.rotate(node.left!, "left");
			this.rotate(node, "right");
		}
	}

	protected override rotate(
		node: AvlNode<any>,
		direction: BinaryNodeDirection,
	): boolean {
		if (!super.rotate(node, direction)) return false;

		const replacementDirection: BinaryNodeDirection =
			direction === "left" ? "right" : "left";
		const replacement = node[replacementDirection];
		if (!replacement) return false;

		if (replacement.bf === 0) {
			node.bf = 1;
			replacement.bf = -1;
		} else {
			node.bf = 0;
			replacement.bf = 0;
		}

		return true;
	}
}
