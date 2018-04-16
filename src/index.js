import _ from 'lodash';
import './style.css';
import Icon from './favicon.ico';
import printMe from './print.js';
import * as dagreD3 from "dagre-d3";
import {d3} from "./uml/d3"
import {ClassDiagram, Context} from "./uml/class-diagram";

import * as d3Selection from "d3-selection-multi"
import {
    _arrowAggregation, _arrowAssociation, _arrowComposition, _arrowDependency, _arrowGeneralization,
    _arrowRealization
} from "./uml/class-diagram-relationship";


function createLabel(root, classes) {
    ClassDiagram._createClasses(new Context(d3, d3.select(root).append("svg")), classes)
}

function processClassNodeInfo(classInfo) {
    return {
        nodeName: classInfo.classname,
        value: {
            shape: "rect",
            label: [classInfo],
            labelType: "lazySvg",
            labelFn: createLabel
        }
    }
}

/**
 * input
 * classInfos {
 *  name :
 *  attributes:
 *  methods:
 *  identify:
 * }
 * relationShips {
 *  from : identify
 *  to : identify
 *  type: (relationShip)
 * }
 */

function component1() {
// Create a new directed graph
    var g = new dagreD3.graphlib.Graph().setGraph({});

    var user = processClassNodeInfo({
        x: 0, y: 0, width: 260,
        classname: 'User',
        attributes: [
            'microposts: Array[Micropost]',
            'relationships: Array[Relationship]',
            'followed_users: Array[User]',
            'reversed_relationships: Array[Relationship]',
            'followers: Array[User]',
        ]
    });

    var micropost = processClassNodeInfo({
        x: 0, y: 0, width: 140,
        classname: 'Micropost',
        attributes: [
            'user: User',
            'content: string',
            'id: integer'
        ],
        methods: [
            'hello: int'
        ]
    });

    var relationShip = processClassNodeInfo({
        x: 0, y: 0, width: 160,
        classname: 'Relationship',
        attributes: [
            'follower : User',
            'followed : User'
        ]
    });

    g.setNode(user.nodeName, user.value);
    g.setNode(micropost.nodeName, micropost.value);
    g.setNode(relationShip.nodeName, relationShip.value);

    g.setEdge(micropost.nodeName, user.nodeName, {arrowhead: "compositionPoint"});
    g.setEdge(user.nodeName, relationShip.nodeName, {arrowhead: "aggregationPoint"});
    g.setEdge(micropost.nodeName, relationShip.nodeName, {arrowhead: "associationPoint"});

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
    render.arrows().generalizationPoint = _arrowGeneralization;
    render.arrows().realizationPoint = _arrowRealization;
    render.arrows().associationPoint = _arrowAssociation;
    render.arrows().aggregationPoint = _arrowAggregation;
    render.arrows().compositionPoint = _arrowComposition;
    render.arrows().dependencyPoint = _arrowDependency;
// Run the renderer. This is what draws the final graph.
    render(inner, g);

// Center the graph
    var initialScale = 0.75;
    svg.call(zoom.transform, d3.zoomIdentity.translate((svg.attr("width") - g.graph().width * initialScale) / 2, 20).scale(initialScale));

    svg.attr('height', g.graph().height * initialScale + 40);

}

// document.body.appendChild(component())
var svg1 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svg1.setAttribute("height", "509");
svg1.setAttribute("width", "960");
document.body.appendChild(svg1);
var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
svg1.appendChild(g);
// document.body.appendChild(document.createElement("svg"));
component1();


if (module.hot) {
    module.hot.accept('./print.js', function () {
        console.log('Accepting the updated printMe module!');
        printMe();
    })
}