function LinkedList() {
  this.head = null;
  this.tail = null;
  this.size = 0;
}

function Node(val, index) {
  this.value = val;
  this.next = null;
  this.index = index;
}

LinkedList.prototype.append = function(x) {
  if (x == undefined || x.length == 1) return;
  const node = x instanceof Node 
    ? x 
    : new Node(x, this.size);
  this.size++;
  if (this.head == null) {
    this.head = node;
    this.tail = node;
  } else {
    this.head.append(node);
    this.tail = node;
  }
}

Node.prototype.append = function(x) {
  if (this.next == null) {
    this.next = x;
  } else {
    this.next.append(x);
  }
}

Node.prototype.applyToChildren = function(mapping) {
  if (this.next == null) {
    return;
  }
  this.next = mapping(next);
  this.next.applyToChildren(mapping);
}

LinkedList.prototype.getNodeAtIndex = function(index) {
  if (index >= this.size - 1) return undefined
  if (index == 0) {
    return this.head
  }
  let i = 0
  let node = this.head
  while (i < index) {
    i++
    node = node.next
  }
  return node
}

LinkedList.prototype.detach = function(index) {
  this.size--;
  if (index == 0) {
    const val = this.head.value;
    this.head = this.head.next;
    this.tail = !this.head ? null : this.tail;
    return val;
  }
  if (index == this.size) {
    const newTail = this.getNodeAtIndex(index - 1)
    const val = this.tail.value
    this.tail = newTail
    return val;
  }
  const parent = this.getNodeAtIndex(index - 1)
  const node = this.getNodeAtIndex(index)
  const val = node.value
  parent.next = node.next
  parent.applyToChildren(x => {
    x.index--
    return x;
  })
  return val;
}

LinkedList.prototype.pop = function() {
  return this.detach(this.size - 1)
}

LinkedList.prototype.shift = function() {
  return this.detach(0);
}

export {
  LinkedList,
  Node
}
