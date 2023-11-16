import { type uint } from "../types";

interface Node<T> {
	value: T;
	next?: Node<T>;
	prev?: Node<T>;
}

export class DoublyLinkedList<T> implements Iterable<T> {
	private head?: Node<T>;
	private tail?: Node<T>;
	private size = 0;

	static from<T>(values: Iterable<T>): DoublyLinkedList<T> {
		const list = new DoublyLinkedList<T>();
		for (const value of values) {
			list.push(value);
		}

		return list;
	}

	get length() {
		return this.size;
	}

	*[Symbol.iterator]() {
		let current = this.head;
		while (current) {
			yield current.value;
			current = current.next;
		}
	}

	getNode(index: uint): Node<T> | undefined {
		let current = this.head;
		let i = 0;
		while (current) {
			if (i === index) return current;
			current = current.next;
			i++;
		}

		return undefined;
	}

	get(index: uint): T | undefined {
		return this.getNode(index)?.value;
	}

	set(index: uint, value: T): T | undefined {
		const node = this.getNode(index);
		if (!node) return undefined;

		const { value: oldValue } = node;
		node.value = value;

		return oldValue;
	}

	push(value: T) {
		const node: Node<T> = { value };

		if (this.tail) {
			this.tail.next = node;
			this.tail = node;
		} else {
			this.head = node;
			this.tail = node;
		}

		return ++this.size;
	}

	pop(): T | undefined {
		if (!this.tail) return undefined;

		const { value } = this.tail;
		this.tail = this.tail.prev;

		if (!this.tail) this.head = undefined;

		this.size--;

		return value;
	}

	unshift(value: T) {
		const node: Node<T> = { value };

		if (this.head) {
			this.head.prev = node;
			this.head = node;
		} else {
			this.head = node;
			this.tail = node;
		}

		return ++this.size;
	}

	shift(): T | undefined {
		if (!this.head) return undefined;

		const { value } = this.head;
		this.head = this.head.next;

		if (!this.head) this.tail = undefined;

		this.size--;

		return value;
	}

	reverse() {
		let current = this.head;
		let previous: Node<T> | undefined;
		let next: Node<T> | undefined;

		while (current) {
			next = current.next;
			current.next = previous;
			current.prev = next;
			previous = current;
			current = next;
		}

		this.tail = this.head;
		this.head = previous;

		return this;
	}

	remove(index: uint): T | undefined {
		const node = this.getNode(index);
		if (!node) return undefined;

		if (node.prev) node.prev.next = node.next;
		if (node.next) node.next.prev = node.prev;

		if (node === this.head) this.head = node.next;
		if (node === this.tail) this.tail = node.prev;

		this.size--;

		return node.value;
	}

	splice(index: uint, count: uint, ...values: T[]): T[] {
		const removed = [];
		for (let i = 0; i < count; i++) {
			const value = this.remove(index);
			if (value) removed.push(value);
		}

		for (const value of values) {
			this.set(index, value);
		}

		return removed;
	}
}
