/**
 * Generalization
 * Realization
 * Association
 * Aggregation
 * Composition
 * Dependency
 *
 * 泛化 = 实现 > 组合 > 聚合 > 关联 > 依赖
 *
 * http://www.uml.org.cn/oobject/201610282.asp
 */
import {ClassDiagram} from "./class-diagram";


var g = new dagreD3.graphlib.Graph().setGraph({});

// ["normal", "vee", "undirected"].forEach(function(arrowhead) {
//     g.setNode(arrowhead + "1", { label: " " });
//     g.setNode(arrowhead + "2", { label: " " });
//     g.setEdge(arrowhead + "1", arrowhead + "2", {
//         arrowhead: arrowhead,
//         label: arrowhead
//     });
// });


// "normal", "vee", "undirected"

// function Relationship() {
//
// }



function Generalization() {
    return {
        arrowhead: "normal",
    }
}

function Realization() {
    return {
        arrowhead: "normal",
    }
}

function Association() {
    return {
        arrowhead: "normal",
    }
}

function Aggregation() {
    return {
        arrowhead: "normal",
    }
}

function Composition() {
    return {
        arrowhead: "normal",
    }
}

function Dependency() {
    return {
        arrowhead: "normal",
    }
}

export {
    Generalization,
    Realization,
    Association,
    Aggregation,
    Composition,
    Dependency,
}