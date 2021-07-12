const Tree = require('./tree');

let str = "/home/user1/dir1/abc.txt\n/home/user1/dir2/abc.txt\n/home/user1/dir3\n/home/user2/dir1/abc.txt\n/home/user2/dir2\n/home/user3/dir1/abc.txt\n/home/user1\n/home";
let tree = new Tree('/');
let paths = str.split('\n');
paths.forEach(path => {
    path = path.slice(1);
    console.log(path);
    elements = path.split('/');
    tree._addNode(elements[0], '/');
    for(let i=1; i<elements.length;i++) {
        tree._addNode(elements[i], elements[i-1]);
    }
});

let bfs = tree._traverseBFS();
console.log(bfs);