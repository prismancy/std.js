import { type uint } from "../types.ts";

interface Node<T> {
	value: T;
	next?: Node<T>;
}

export class LinkedList<T> implements Iterable<T> {
	node?: Node<T>;

	static from<T>(values: Iterable<T>): LinkedList<T> {
		const list = new LinkedList<T>();
		let node: Node<T> | undefined;
		for (const value of values) {
			const child = { value };
			if (node) node.next = child;
			node = child;
		}

		list.node = node;
		return list;
	}

	get length(): uint {
		let { node } = this;
		let length = 0;
		while (node) {
			length++;
			node = node.next;
		}

		return length;
	}

	*[Symbol.iterator](): Iterator<T> {
		let { node } = this;
		while (node) {
			yield node.value;
			node = node.next;
		}
	}

	get tail(): Node<T> | undefined {
		let { node } = this;
		while (node) {
			node = node.next;
		}

		return node;
	}

	getNode(index: uint): Node<T> | undefined {
		let current = this.node;
		let i = 0;
		while (current) {
			if (i === index) return current;
			current = current.next;
			i++;
		}
	}

	get(index: uint): T | undefined {
		return this.getNode(index)?.value;
	}

	set(index: uint, value: T): T | undefined {
		const node = this.getNode(index);
		if (!node) return;

		const { value: oldValue } = node;
		node.value = value;

		return oldValue;
	}

	push(value: T): void {
		const { tail } = this;
		const node: Node<T> = { value };
		if (tail) tail.next = node;
		else this.node = node;
	}

	pop(): Node<T> | undefined {
		let current = this.node;
		let parent: Node<T> | undefined;
		while (current) {
			if (!current.next) {
				delete parent?.next;
				return current;
			}

			parent = current;
			current = current.next;
		}
	}

	unshift(value: T): void {
		const node: Node<T> = { value };
		if (this.node) {
			node.next = this.node;
			this.node = node;
		}

		this.node = node;
	}

	shift(): Node<T> | undefined {
		const { node } = this;
		this.node = node?.next;
		return node;
	}
}
