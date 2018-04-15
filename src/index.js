import _ from 'lodash';
import './style.css';
import Icon from './favicon.ico';
import printMe from './print.js';
import * as dagreD3 from "dagre-d3";
import {d3} from "./uml/d3"
import {ClassDiagram} from "./uml/class-diagram";

import * as d3Selection from "d3-selection-multi"

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


var adjustHeight = function (rects, texts, paddingTop, paddingBottom) {
    var i, rect, text, height;
    for (i = 0; i < rects.length; i++) {
        rect = rects[i];
        text = texts[i];
        height = text.getBBox().height + paddingTop + paddingBottom;
        d3.select(rect).attrs({'height': height});
    }
}

function createLabel() {

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
        }
    ];

    var svg = d3.create("svg");
    var g =  svg.selectAll('g.class')
        .data(classes).enter().append('g')
        .attrs({
            id: function (d) {
                return d.classname + 'Class';
            },
            'class': 'class',
            transform: function (d) {
                return "translate(" + d.x + "," + d.y + ")";
            },
        });

    g.append('rect')
        .attrs({
            'width': function (d) {
                return d.width;
            },
            'fill': 'none',
            'stroke': 'black',
            'stroke-width': 1
        });

    var classNameG = g.append('g')
        .attrs({'class': 'classname'});
    var classNameRects = classNameG.append('rect')
        .attrs({
            'width': function (d) {
                return d.width;
            },
            'fill': 'none',
            'stroke': 'black',
            'stroke-width': 1
        });
    var classNameTexts = classNameG.append('text')
        .attrs({'font-size': 12})
        .call(d3.multilineText()
            .verticalAlign('top')
            .paddingTop(4)
            .paddingBottom(4)
            .text(function (d) {
                return d.classname;
            })
        );


    adjustHeight(classNameRects.nodes(), classNameTexts.nodes(), 4, 4);


    var attributesG = g.append('g')
        .attrs({
            'class': 'attributes',
            'transform': function (d) {
                var classNameG = d3.select(this).node().previousSibling,
                    height = classNameG.getBBox().height;
                return 'translate(0,' + height + ')';
            }
        });
    var attributesRects = attributesG.append('rect')
        .attrs({
            'width': function (d) {
                return d.width;
            },
            'fill': 'none',
            'stroke': 'black',
            'stroke-width': 1
        });
    var attributesTexts = attributesG.append('text')
        .attrs({'font-size': 12})
        .call(d3.multilineText()
            .text(function (d) {
                return d.attributes;
            })
            .verticalAlign('top')
            .horizontalAlign('left')
            .paddingTop(4)
            .paddingLeft(4)
        );
    adjustHeight(attributesRects.nodes(), attributesTexts.nodes(), 4, 4);

    var methodsG = g.append('g')
        .attrs({
            'class': 'methods',
            'transform': function (d) {
                var attributesG = d3.select(this).node().previousSibling,
                    classNameText = attributesG.previousSibling,
                    classNameBBox = classNameText.getBBox(),
                    attributesBBox = attributesG.getBBox();
                return 'translate(0,' + (classNameBBox.height + attributesBBox.height) + ')';
            }
        });
    var methodsRects = methodsG.append('rect')
        .attrs({
            'width': function (d) {
                return d.width;
            },
            'fill': 'none',
            'stroke': 'black',
            'stroke-width': 1
        });
    var methodsTexts = methodsG.append('text')
        .attrs({'font-size': 12})
        .call(d3.multilineText()
            .text(function (d) {
                return d.methods;
            })
            .verticalAlign('top')
            .horizontalAlign('left')
            .paddingTop(4)
            .paddingLeft(4)
        );
    adjustHeight(methodsRects.nodes(), methodsTexts.nodes(), 4, 4);

    svg.selectAll('g.class')
        .each(function (d, i) {
            var classG = d3.select(this),
                classRect = classG.node().firstChild,
                classNameG = classRect.nextSibling,
                attributesG = classNameG.nextSibling,
                methodsG = attributesG.nextSibling,
                height =
                    classNameG.getBBox().height +
                    attributesG.getBBox().height +
                    methodsG.getBBox().height;
            d3.select(classRect).attrs({'height': height});
        });

    var boxes = {};
    svg.selectAll('g.class')
        .each(function (d, i) {
            var classG = d3.select(this),
                bbox = classG.node().getBBox();
            boxes[d.classname] = new ClassDiagram.Box(d.x, d.y, bbox.width, bbox.height);
        });


    return g.node();
}

function component1() {
// Create a new directed graph
    var g = new dagreD3.graphlib.Graph().setGraph({});

    g.setNode("house", {shape: "house", label: createLabel(), labelType: "svg"});
    g.setNode("rect", {shape: "rect"});
    g.setEdge("house", "rect", {arrowhead: "hollowPoint"});

    var svg = d3.select("svg"),
        inner = svg.select("g");

// Set up zoom support
    var zoom = d3.zoom().on("zoom", function () {
        inner.attr("transform", d3.event.transform);
    });
    svg.call(zoom);

// Create the renderer
    var render = new dagreD3.render();

// Add our custom shape (a house)
    render.shapes().house = function (parent, bbox, node) {
        var w = bbox.width,
            h = bbox.height,
            points = [
                {x: 0, y: 0},
                {x: w, y: 0},
                {x: w, y: -h},
                {x: w / 2, y: -h * 3 / 2},
                {x: 0, y: -h}
            ];
        var shapeSvg = parent.insert("polygon", ":first-child")
            .attr("points", points.map(function (d) {
                return d.x + "," + d.y;
            }).join(" "))
            .attr("transform", "translate(" + (-w / 2) + "," + (h * 3 / 4) + ")");

        node.intersect = function (point) {
            return dagreD3.intersect.polygon(node, points, point);
        };

        return shapeSvg;
    };

// Add our custom arrow (a hollow-point)
    render.arrows().hollowPoint = function normal(parent, id, edge, type) {
        var marker = parent.append("marker")
            .attr("id", id)
            .attr("viewBox", "0 0 10 10")
            .attr("refX", 9)
            .attr("refY", 5)
            .attr("markerUnits", "strokeWidth")
            .attr("markerWidth", 8)
            .attr("markerHeight", 6)
            .attr("orient", "auto");

        var path = marker.append("path")
            .attr("d", "M 0 0 L 10 5 L 0 10 z")
            .style("stroke-width", 1)
            .style("stroke-dasharray", "1,0")
            .style("fill", "#fff")
            .style("stroke", "#333");
        dagreD3.util.applyStyle(path, edge[type + "Style"]);
    };

// Run the renderer. This is what draws the final graph.
    render(inner, g);

// Center the graph
    var initialScale = 0.75;
    svg.call(zoom.transform, d3.zoomIdentity.translate((svg.attr("width") - g.graph().width * initialScale) / 2, 20).scale(initialScale));

    svg.attr('height', g.graph().height * initialScale + 40);

}

// document.body.appendChild(component())
var svg1 = document.createElementNS("http://www.w3.org/2000/svg", "svg")
svg1.setAttribute("height", "509")
svg1.setAttribute("width", "960")
document.body.appendChild(svg1)
var g = document.createElementNS("http://www.w3.org/2000/svg", "g")
svg1.appendChild(g);
// document.body.appendChild(document.createElement("svg"));
component1();

// var svg2 = document.createElementNS("http://www.w3.org/2000/svg", "svg")
// document.body.appendChild(svg2)
// svg2.setAttribute("id", "d3-class-diagram")


//
// var svg3 = document.createElementNS("http://www.w3.org/2000/svg", "svg")
// document.body.appendChild(svg3)
// svg3.setAttribute("height", "240")
// svg3.setAttribute("width", "940")
// svg3.setAttribute("id", "diagram")
//
// var svg = d3.select("#diagram")
// const classDiagram = new d3.ClassDiagram(d3, svg);
//
// classDiagram.addMarkers(svg.append('defs'));
//
// var classes = [
//     {
//         x: 240, y: 20, width: 260,
//         classname: 'User',
//         attributes: [
//             'microposts: Array[Micropost]',
//             'relationships: Array[Relationship]',
//             'followed_users: Array[User]',
//             'reversed_relationships: Array[Relationship]',
//             'followers: Array[User]',
//         ]
//     },
//     {
//         x: 560, y: 20, width: 140,
//         classname: 'Micropost',
//         attributes: [
//             'user: User',
//             'content: string',
//             'id: integer'
//         ],
//         methods: [
//             'hello: int'
//         ]
//     },
//     {
//         x: 40, y: 20, width: 160,
//         classname: 'Relationship',
//         attributes: [
//             'follower : User',
//             'followed : User'
//         ]
//     }
// ];
//
// var boxes = classDiagram.createClasses(classes);
// svg.selectAll('text').attr('font-family', 'Noto Sans Japanese');
//
// var connectors = [
//     {
//         points: [
//             {x: boxes.User.rightX(), y: boxes.Micropost.midY()},
//             {x: boxes.Micropost.x, y: boxes.Micropost.midY()}
//         ],
//         markerEnd: 'arrowhead'
//     },
//     {
//         points: [
//             {x: boxes.Relationship.rightX(), y: boxes.User.midY()},
//             {x: boxes.User.x, y: boxes.User.midY()}
//         ],
//         markerEnd: 'filledDiamond'
//     },
//     {
//         points: [
//             {x: boxes.User.x, y: boxes.User.bottomY() - 20},
//             {x: boxes.User.x - 20, y: boxes.User.bottomY() - 20},
//             {x: boxes.User.x - 20, y: boxes.User.bottomY() + 20},
//             {x: boxes.User.x + 20, y: boxes.User.bottomY() + 20},
//             {x: boxes.User.x + 20, y: boxes.User.bottomY()}
//         ],
//         markerEnd: 'diamond'
//     },
//     {
//         points: [
//             {x: boxes.User.rightX(), y: boxes.User.bottomY() - 20},
//             {x: boxes.User.rightX() + 20, y: boxes.User.bottomY() - 20},
//             {x: boxes.User.rightX() + 20, y: boxes.User.bottomY() + 20},
//             {x: boxes.User.rightX() - 20, y: boxes.User.bottomY() + 20},
//             {x: boxes.User.rightX() - 20, y: boxes.User.bottomY()}
//         ],
//         markerEnd: 'diamond'
//     }
// ];
//
// classDiagram.createConnectors(connectors);


if (module.hot) {
    module.hot.accept('./print.js', function () {
        console.log('Accepting the updated printMe module!');
        printMe();
    })
}