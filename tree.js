const Node = require('./node');
const Queue = require('./queue');

class Tree {
    constructor(root) {
        this._root = new Node(root);
    }

    _traverse(callback) {
        const self = this;
        function goThrough(node) {
          callback(node);
          node.children.forEach((child) => {
            goThrough(child);
          });
        }
        goThrough(self._root);
      }

    _traverseBFS() {
        //if there is no root, return false
        if (!this._root) {
            return false;
        }

        //start a new Queue
        const queue = new Queue();
        //keep a tally of all values in the tree
        const treeValues = [];
        //add root to queue
        queue.enqueue(this._root);
        //while queue is not empty
        while (queue.size !== 0) {
            //get TreeNode Children
            const nodeChildren = queue.first.value.children;
            //if node has children, loop and add each to queue
            if (nodeChildren.length !== 0) {
                nodeChildren.forEach(child => queue.enqueue(child));
            }
            //push the first item in the queue to the tree values
            treeValues.push(queue.first.value);
            //remove first node from queue
            queue.dequeue();
        }
        //return values, should be all TreeNodes
        return treeValues;
    }

    _traverseDFS(type) {
        //if there is no root, return false
        if (!this._root) {
          return false;
        }
        //make a variable for tree values
        const treeValues = [];
        //current values always starts at root
        let current = this._root;

        //helper methods for order choice
        const preOrderHelper = node => {
            //push value onto array FIRST
            treeValues.push(node.value);
            //recursively call function on all node children
            if (node.children.length !== 0) {
                node.children.forEach(child => {
                    preOrderHelper(child);
                });
            }
            return true;
        };

        const postOrderHelper = node => {
            //recursively call function on all node children FIRST
            if (node.children.length !== 0) {
                node.children.forEach(child => {
                    postOrderHelper(child);
                });
            }
            //push value onto array
            treeValues.push(node.value);
            return true;
        };

        const inOrderHelper = node => {
            //if node had children, split nodes into left and right halves in case tree is not binary FIRST
            if (node.children.length !== 0) {
                //get halfway point
                const halfway = Math.floor(node.children.length / 2);
                //recursively call function on all node children left of halfway point
                for (let i = 0; i < halfway; i++) {
                    inOrderHelper(node.children[i]);
                }
                // push parent node value to array
                treeValues.push(node.value);
                //recursively call function on all node children right of halfway point
                for (let i = halfway; i < node.children.length; i++) {
                    inOrderHelper(node.children[i]);
                }
                // else push value into array
            } else {
                treeValues.push(node.value);
            }
            return true;
          };
        
        //switch statement to select proper order and start recursive function calls
        switch (type) {
          case "pre":
            preOrderHelper(current);
            break;
          case "post":
            postOrderHelper(current);
            break;
          case "in":
            inOrderHelper(current);
            break;
        }
        //return array
        return treeValues;
    }

    _search(value) {
        let returnNode = 'Not Found';
        this._traverse((node) => {
            if (node.value === value) {
                returnNode = node;
            }
        });
        return returnNode;
    }

    _addNode(value, parentValue) {
        const newNode = new Node(value, [])

        if (this._root === null) {
            this._root = newNode;
            return;
        }

        this._traverse((node) => {
            if(typeof this._search(value) === 'object') {
                return;
            }
            if (node.value === parentValue) {
                if(!node.children.includes(value)) {
                    node.children.push(newNode);
                    newNode.setParent(node);
                    newNode.setLevel(node.level + 1);
                } else {
                    console.log(`Node with value ${value} exists in the path`);
                }
            }
        });
    }

}



// let str = "/home/user1/dir1/abc.txt\n/home/user1/dir2/abc.txt\n/home/user1/dir3\n/home/user2/dir1/abc.txt\n/home/user2/dir2\n/home/user3/dir1/abc.txt\n/home/user1\n/home";
// let tree = new Tree('/');
// tree._addNode(elements[0], '/');
// let paths = str.split('\n');
// paths.forEach(path => {
//     path = path.slice(1);
//     console.log(path);
//     elements = path.split('/');
//     //console.log(elements);
//     let i = 1;
//     for(i = 1; i<elements.length ;i++) {
//         tree._addNode(elements[i], elements[i-1].value);
//     }
// });

// let bfs = tree._traverseBFS();
// console.log(bfs);

module.exports = Tree;