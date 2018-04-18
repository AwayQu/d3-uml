import _ from 'lodash';
import './style.css';
import Icon from './favicon.ico';
import printMe from './print.js';
import * as dagreD3 from "./uml/dagre-d3";
import {d3} from "./uml/d3"
import {ClassDiagram, Context} from "./uml/class-diagram-node";

import * as d3Selection from "d3-selection-multi"
import {
    _arrowAggregationHead, _arrowAssociationHead, _arrowCompositionHead, _arrowDependencyHead, _arrowGeneralizationHead,
    _arrowRealizationHead, Aggregation, Association, Composition, Dependency, Generalization, Realization
} from "./uml/class-diagram-relationship";
import {ClassDiagramGraph, ClassDiagramRender} from "./uml/uml";


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
    var g = new ClassDiagramGraph().setGraph({});

    var o2 = {
        x: 0, y: 0, width: 260,
        classname: "氧气",
    };
    var animals = {
        x: 0, y: 0, width: 260,
        classname: "动物",
        attributes: ["生命"],
        methods: ["新城代谢", "繁殖"]
    };

    var water = {
        x: 0, y: 0, width: 260,
        classname: "水",
    };

    var bird = {
        x: 0, y: 0, width: 260,
        classname: "鸟",
        attributes: ["羽毛"],
        methods: ["下蛋"]
    };

    var chibasa = {
        x: 0, y: 0, width: 260,
        classname: "翅膀",
    };

    var fly = {
        x: 0, y: 0, width: 260,
        classname: "飞翔",
    };

    var dayan = {
        x: 0, y: 0, width: 260,
        classname: "大雁",
        methods: ["下蛋", "飞"]
    };

    var duck = {
        x: 0, y: 0, width: 260,
        classname: "鸭子",
        methods: ["下蛋"]
    };


    var qie = {
        x: 0, y: 0, width: 260,
        classname: "企鹅",
        methods: ["下蛋"]
    };


    var yanqun = {
        x: 0, y: 0, width: 260,
        classname: "雁群",
    };


    var tanglaoya = {
        x: 0, y: 0, width: 260,
        classname: "唐老鸭",
        methods: ["说话"]
    };


    var shuohua = {
        x: 0, y: 0, width: 260,
        classname: "讲话",
        methods: ["说话"]
    };


    var qihou = {
        x: 0, y: 0, width: 260,
        classname: "气候",
    };


    g.setClassDiagramNode(o2);
    g.setClassDiagramNode(animals);
    g.setClassDiagramNode(water);
    g.setClassDiagramNode(bird);
    g.setClassDiagramNode(chibasa);
    g.setClassDiagramNode(fly);
    g.setClassDiagramNode(dayan);
    g.setClassDiagramNode(duck);
    g.setClassDiagramNode(qie);
    g.setClassDiagramNode(yanqun);
    g.setClassDiagramNode(tanglaoya);
    g.setClassDiagramNode(shuohua);
    g.setClassDiagramNode(qihou);

    g.setEdge(animals.classname, o2.classname, Dependency());
    g.setEdge(animals.classname, water.classname, Generalization());
    g.setEdge(bird.classname, animals.classname, Realization());
    g.setEdge(bird.classname, chibasa.classname, Composition());
    g.setEdge(dayan.classname, bird.classname, Generalization());
    g.setEdge(duck.classname, bird.classname, Generalization());
    g.setEdge(qie.classname, bird.classname, Generalization());
    g.setEdge(dayan.classname, fly.classname, Realization());
    g.setEdge(yanqun.classname, dayan.classname, Aggregation());
    g.setEdge(tanglaoya.classname, duck.classname, Realization());
    g.setEdge(tanglaoya.classname, shuohua.classname, Realization());
    g.setEdge(qie.classname, qihou.classname, Association());

    var svg = d3.select("svg"),
        inner = svg.select("g");

    // Set up zoom support
    var zoom = d3.zoom().on("zoom", function () {
        inner.attr("transform", d3.event.transform);
    });
    svg.call(zoom);

    // Create the renderer
    var render = new ClassDiagramRender();

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