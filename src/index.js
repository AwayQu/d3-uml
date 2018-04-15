import _ from 'lodash';
import './style.css';
import Icon from './favicon.ico';
import printMe from './print.js';
import * as dagreD3 from "dagre-d3";
import {d3} from "./uml/d3"


function component() {
    var element = document.createElement('div');
    var btn = document.createElement('button');

    // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.classList.add('hello');
    // 将图像添加到我们现有的 div。
    var myIcon = new Image();
    myIcon.src = Icon;

    element.appendChild(myIcon
    );


    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = printMe;

    element.appendChild(btn);


    return element;
}


function component1() {
    var element = document.createElement('div');
    var btn = document.createElement('button');
    var g = new dagreD3.graphlib.Graph()
        .setGraph({})
        .setDefaultEdgeLabel(function () {
            return {};
        });
    console.log(g)

// Here we"re setting nodeclass, which is used by our custom drawNodes function
// below.
    g.setNode(0, {label: "TOP", class: "type-TOP"});
    g.setNode(1, {label: "S", class: "type-S"});
    g.setNode(2, {label: "NP", class: "type-NP"});
    g.setNode(3, {label: "DT", class: "type-DT"});
    g.setNode(4, {label: "This", class: "type-TK"});
    g.setNode(5, {label: "VP", class: "type-VP"});
    g.setNode(6, {label: "VBZ", class: "type-VBZ"});
    g.setNode(7, {label: "is", class: "type-TK"});
    g.setNode(8, {label: "NP", class: "type-NP"});
    g.setNode(9, {label: "DT", class: "type-DT"});
    g.setNode(10, {label: "an", class: "type-TK"});
    g.setNode(11, {label: "NN", class: "type-NN"});
    g.setNode(12, {label: "example", class: "type-TK"});
    g.setNode(13, {label: ".", class: "type-."});
    g.setNode(14, {label: "sentence", class: "type-TK"});

    g.nodes().forEach(function (v) {
        var node = g.node(v);
        // Round the corners of the nodes
        node.rx = node.ry = 5;
    });

// Set up edges, no special attributes.
    g.setEdge(3, 4);
    g.setEdge(2, 3);
    g.setEdge(1, 2);
    g.setEdge(6, 7);
    g.setEdge(5, 6);
    g.setEdge(9, 10);
    g.setEdge(8, 9);
    g.setEdge(11, 12);
    g.setEdge(8, 11);
    g.setEdge(5, 8);
    g.setEdge(1, 5);
    g.setEdge(13, 14);
    g.setEdge(1, 13);
    g.setEdge(0, 1)

// Create the renderer
    var render = new dagreD3.render();

// Set up an SVG group so that we can translate the final graph.
    var svg = d3.select("svg"),
        svgGroup = svg.append("g");

// Run the renderer. This is what draws the final graph.
    render(d3.select("svg g"), g);

// Center the graph
    var xCenterOffset = (svg.attr("width") - g.graph().width) / 2;
    svgGroup.attr("transform", "translate(" + xCenterOffset + ", 20)");
    svg.attr("height", g.graph().height + 40);


}

// document.body.appendChild(component())
// var svg1 = document.createElementNS("http://www.w3.org/2000/svg", "svg")
// svg1.setAttribute("height", "509")
// svg1.setAttribute("width", "960")
// document.body.appendChild(svg1)
// // document.body.appendChild(document.createElement("svg"));
// component1();

// var svg2 = document.createElementNS("http://www.w3.org/2000/svg", "svg")
// document.body.appendChild(svg2)
// svg2.setAttribute("id", "d3-class-diagram")

var svg3 = document.createElementNS("http://www.w3.org/2000/svg", "svg")
document.body.appendChild(svg3)
svg3.setAttribute("height", "240")
svg3.setAttribute("width", "940")
svg3.setAttribute("id", "diagram")

var svg = d3.select("#diagram")
const classDiagram = new d3.ClassDiagram(d3, svg);

classDiagram.addMarkers(svg.append('defs'));

var classes = [
    {
        x: 240, y: 20, width: 260,
        classname: 'User',
        attributes: [
            'microposts: Array[Micropost]',
            'relationships: Array[Relationship]',
            'followed_users: Array[User]',
            'reversed_relationships: Array[Relationship]',
            'followers: Array[User]',
        ]
    },
    {
        x: 560, y: 20, width: 140,
        classname: 'Micropost',
        attributes: [
            'user: User',
            'content: string',
            'id: integer'
        ],
        methods: [
            'hello: int'
        ]
    },
    {
        x: 40, y: 20, width: 160,
        classname: 'Relationship',
        attributes: [
            'follower : User',
            'followed : User'
        ]
    }
];

var boxes = classDiagram.createClasses(classes);
svg.selectAll('text').attr('font-family', 'Noto Sans Japanese');

var connectors = [
    {
        points: [
            {x: boxes.User.rightX(), y: boxes.Micropost.midY()},
            {x: boxes.Micropost.x, y: boxes.Micropost.midY()}
        ],
        markerEnd: 'arrowhead'
    },
    {
        points: [
            {x: boxes.Relationship.rightX(), y: boxes.User.midY()},
            {x: boxes.User.x, y: boxes.User.midY()}
        ],
        markerEnd: 'filledDiamond'
    },
    {
        points: [
            {x: boxes.User.x, y: boxes.User.bottomY() - 20},
            {x: boxes.User.x - 20, y: boxes.User.bottomY() - 20},
            {x: boxes.User.x - 20, y: boxes.User.bottomY() + 20},
            {x: boxes.User.x + 20, y: boxes.User.bottomY() + 20},
            {x: boxes.User.x + 20, y: boxes.User.bottomY()}
        ],
        markerEnd: 'diamond'
    },
    {
        points: [
            {x: boxes.User.rightX(), y: boxes.User.bottomY() - 20},
            {x: boxes.User.rightX() + 20, y: boxes.User.bottomY() - 20},
            {x: boxes.User.rightX() + 20, y: boxes.User.bottomY() + 20},
            {x: boxes.User.rightX() - 20, y: boxes.User.bottomY() + 20},
            {x: boxes.User.rightX() - 20, y: boxes.User.bottomY()}
        ],
        markerEnd: 'diamond'
    }
];

classDiagram.createConnectors(connectors);


if (module.hot) {
    module.hot.accept('./print.js', function () {
        console.log('Accepting the updated printMe module!');
        printMe();
    })
}