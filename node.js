class Node {
    constructor(value, children, parent) {
      this.value = value;
      this.children = children || [];
      this.parent = parent || null;
      this.level = (parent ? parent.level + 1 : 0) || 0;
    }

    setParent(parentNode) {
        this.parent = parentNode;
    }

    setChildren(childrenNodes) {
        this.children = childrenNodes;
    }

    setLevel(level) {
        this.level = level;
    }
  }

module.exports = Node;