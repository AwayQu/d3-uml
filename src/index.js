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
            labelFn: createLabel,
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: 0,
            paddingRight: 0
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

    var o2 = processClassNodeInfo({
       x: 0, y: 0, width: 260,
       classname: "氧气",
    });
    var animals = processClassNodeInfo({
        x: 0, y: 0, width: 260,
        classname: "动物",
        attributes: ["生命"],
        methods:["新城代谢", "繁殖"]
    });

    var water = processClassNodeInfo({
        x: 0, y: 0, width: 260,
        classname: "水",
    });

    var bird = processClassNodeInfo({
        x: 0, y: 0, width: 260,
        classname: "鸟",
        attributes: ["羽毛"],
        methods: ["下蛋"]
    });

    var chibasa = processClassNodeInfo({
        x: 0, y: 0, width: 260,
        classname: "翅膀",
    });

    var fly = processClassNodeInfo({
        x: 0, y: 0, width: 260,
        classname: "飞翔",
    });

    var dayan = processClassNodeInfo({
        x: 0, y: 0, width: 260,
        classname: "大雁",
        methods: ["下蛋", "飞"]
    });

    var duck = processClassNodeInfo({
        x: 0, y: 0, width: 260,
        classname: "鸭子",
        methods: ["下蛋"]
    });


    var qie = processClassNodeInfo({
        x: 0, y: 0, width: 260,
        classname: "企鹅",
        methods: ["下蛋"]
    });


    var yanqun = processClassNodeInfo({
        x: 0, y: 0, width: 260,
        classname: "雁群",
    });


    var tanglaoya = processClassNodeInfo({
        x: 0, y: 0, width: 260,
        classname: "唐老鸭",
        methods: ["说话"]
    });


    var shuohua = processClassNodeInfo({
        x: 0, y: 0, width: 260,
        classname: "讲话",
        methods: ["说话"]
    });


    var qihou = processClassNodeInfo({
        x: 0, y: 0, width: 260,
        classname: "气候",
    });





    g.setNode(o2.nodeName, o2.value);
    g.setNode(animals.nodeName, animals.value);
    g.setNode(water.nodeName, water.value);
    g.setNode(bird.nodeName, bird.value);
    g.setNode(chibasa.nodeName, chibasa.value);
    g.setNode(fly.nodeName, fly.value);
    g.setNode(dayan.nodeName, dayan.value);
    g.setNode(duck.nodeName, duck.value);
    g.setNode(qie.nodeName, qie.value);
    g.setNode(yanqun.nodeName, yanqun.value);
    g.setNode(tanglaoya.nodeName, tanglaoya.value);
    g.setNode(shuohua.nodeName, shuohua.value);
    g.setNode(qihou.nodeName, qihou.value);

    g.setEdge(animals.nodeName, o2.nodeName, {arrowhead: "dependencyPoint"});
    g.setEdge(animals.nodeName, water.nodeName, {arrowhead: "generalizationPoint"});
    g.setEdge(bird.nodeName, animals.nodeName, {arrowhead: "realizationPoint"});
    g.setEdge(bird.nodeName, chibasa.nodeName, {arrowhead: "compositionPoint"});
    g.setEdge(dayan.nodeName, bird.nodeName, {arrowhead: "generalizationPoint"});
    g.setEdge(duck.nodeName, bird.nodeName, {arrowhead: "generalizationPoint"});
    g.setEdge(qie.nodeName, bird.nodeName, {arrowhead: "generalizationPoint"});
    g.setEdge(dayan.nodeName, fly.nodeName, {arrowhead: "realizationPoint"});
    g.setEdge(yanqun.nodeName, dayan.nodeName, {arrowhead: "aggregationPoint"});
    g.setEdge(tanglaoya.nodeName, duck.nodeName, {arrowhead: "realizationPoint"});
    g.setEdge(tanglaoya.nodeName, shuohua.nodeName, {arrowhead: "realizationPoint"});
    g.setEdge(qie.nodeName, qihou.nodeName, {arrowhead: "dependencyPoint"});

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