class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

class DoublyLinkedList {

    #head = null;
    #tail = null;
    #count = 0;
    #map = new Map();

    get head() {
        return this.#head;
    }
    get tail() {
        return this.#tail;
    }
    get count() {
        return this.#count;
    }
    get map() {
        return this.#map;
    }

    addFirst(value) {
        const newNode = new Node(value);
        if (!this.#head) {
            this.#head = newNode;
            this.#tail = newNode;
        } else {
            newNode.next = this.#head;
            this.#head.prev = newNode;
            this.#head = newNode;
        }
        this.#count++;
        this.#map.set(value, newNode);
    }

    addLast(value) {
        const newNode = new Node(value);
        if (!this.#tail) {
            this.#head = newNode;
            this.#tail = newNode;
        } else {
            newNode.prev = this.#tail;
            this.#tail.next = newNode;
            this.#tail = newNode;
        }
        this.#count++;
        this.#map.set(value, newNode);
    }

    insertBefore(node, value) {
        if (!node) {
            throw new Error('Not valid node. Cannot insert before undefined or null.')
        }
        const newNode = new Node(value);
        if (node === this.#head) {
            newNode.next = this.#head;
            this.#head.prev = newNode;
            this.#head = newNode;
        } else {
            newNode.next = node;
            newNode.prev = node.prev;
            node.prev.next = newNode;
            node.prev = newNode;
        }
        this.#count++;
        this.#map.set(value, newNode);
    }

    insertAfter(node, value) {
        if (!node) {
            throw new Error('Not valid node. Cannot insert after undefined or null.')
        }
        const newNode = new Node(value);
        if (node === this.#tail) {
            newNode.prev = this.#tail;
            this.#tail.next = newNode;
            this.#tail = newNode;
        } else {
            newNode.prev = node;
            newNode.next = node.next;
            node.next.prev = newNode;
            node.next = newNode;
        }
        this.#count++;
        this.#map.set(value, newNode);
    }

    remove(node) {
        if (!this.#head) {
            throw new Error('List is empty. There is nothing to remove.')
        }
        if (!node) {
            throw new Error('Not valid node. Cannot delete node that does not exist.')
        }

        const value = node;

        if (this.#head === node) {
            this.#head = node.next;
            if (this.#head) {
                this.#head.prev = null;
            }
        } else if (this.#tail === node) {
            this.#tail = this.#tail.prev;
            if (this.#tail) {
                this.#tail.next = null;
            }
        } else {
            node.prev.next = node.next;
            node.next.prev = node.prev;
        }

        if (!this.#head || !this.#tail) {
            this.#tail = null;
            this.#head = null;
        }

        this.#count--
        this.#map.delete(node.value);
        return value; // Keep in mind that if you need node reference not the value.
    }

    removeFirst() {
        if (!this.#head) {
            throw new Error('List is empty. There is nothing to remove.')
        }
        const value = this.#head
        this.#head = this.#head.next
        if (!this.#head) {
            this.#tail = null;
        } else {
            this.#head.prev = null;
        }
        this.#count--;
        this.#map.delete(value.value); // same as: this.#head.value;
        return value; // Keep in mind that if you need node reference not the value.
    }

    removeLast() {
        if (!this.#tail) {
            throw new Error('List is empty. There is nothing to remove.')
        }
        const value = this.#tail;
        this.#tail = this.#tail.prev;
        if (!this.#tail) {
            this.#head = null;
        } else {
            this.#tail.next = null;
        }
        this.#count--;
        this.#map.delete(value.value); // same as: this.#tail.value;
        return value; // Keep in mind that if you need node reference not the value.
    }

    find(value) {
        return this.#map.get(value)
    }

    values() {
        const values = [];
        let current = this.#head;
        while (current !== null) {
            values.push(current.value);
            current = current.next;
        }
        return values
    }
}



const LL = new DoublyLinkedList();
LL.addFirst(1);
LL.addLast(2);
LL.remove(LL.find(1))
console.log(LL.find(11));

console.log(LL.count);
// LL.remove(LL.find(11))
console.log(LL.values());