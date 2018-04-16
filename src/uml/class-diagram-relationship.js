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
import {ClassDiagram} from "./class-diagram-node";
import * as dagreD3 from "dagre-d3";


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



function _arrowGeneralization(parent, id, edge, type) {
    const marker = parent.append("marker")
        .attr("id", id)
        .attr("viewBox", "0 0 10 10")
        .attr("refX", 9)
        .attr("refY", 5)
        .attr("markerUnits", "strokeWidth")
        .attr("markerWidth", 8)
        .attr("markerHeight", 6)
        .attr("orient", "auto");

    const path = marker.append("path")
        .attr("d", "M 0 0 L 10 5 L 0 10 z")
        .style("stroke-width", 1)
        .style("stroke-dasharray", "1,0")
        .style("fill", "#fff")
        .style("stroke", "#333");
    dagreD3.util.applyStyle(path, edge[type + "Style"]);
}

function Generalization() {
    return {
        arrowhead: "normal",
    }
}

function _arrowRealization(parent, id, edge, type) {
    // TODO: 虚线
    const marker = parent.append("marker")
        .attr("id", id)
        .attr("viewBox", "0 0 10 10")
        .attr("refX", 9)
        .attr("refY", 5)
        .attr("markerUnits", "strokeWidth")
        .attr("markerWidth", 8)
        .attr("markerHeight", 6)
        .attr("orient", "auto");

    const path = marker.append("path")
        .attr("d", "M 0 0 L 10 5 L 0 10 z")
        .style("stroke-width", 1)
        .style("stroke-dasharray", "1,0")
        .style("fill", "#fff")
        .style("stroke", "#333");
    dagreD3.util.applyStyle(path, edge[type + "Style"]);
}

function Realization() {
    return {
        arrowhead: "normal",
    }
}



function _arrowAssociation(parent, id, edge, type) {
    /**
     * <marker id="arrowhead" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="10" markerHeight="10" orient="auto">
     *     <path d="M10 5 0 10 0 8.7 6.8 5.5 0 5.5 0 4.5 6.8 4.5 0 1.3 0 0Z" stroke="none" fill="black">
     *         </path></marker>
     * @returns {{arrowhead: string}}
     * @constructor
     */
    const marker = parent.append("marker")
        .attr("id", id)
        .attr("viewBox", "0 0 10 10")
        .attr("refX", 10)
        .attr("refY", 5)
        .attr("markerWidth", 8)
        .attr("markerHeight", 6)
        .attr("orient", "auto");

    const path = marker.append("path")
        .attr("d", "M10 5 0 10 0 8.7 6.8 5.5 0 5.5 0 4.5 6.8 4.5 0 1.3 0 0Z")
        .attr("stroke", "none")
        .attr("fill", "black");
    dagreD3.util.applyStyle(path, edge[type + "Style"]);

}

function Association() {
    return {
        arrowhead: "normal",
    }
}

function _arrowAggregation(parent, id, edge, type) {
    /**
     * <marker id="diamond"
     * viewBox="0 0 16 10"
     * refX="16"
     * refY="5"
     * markerWidth="16"
     * markerHeight="10"
     * orient="auto">
     *
     * <path d="M-1 5 7.5 0 16 5 7.5 10Z M1.3 5 7.5 8.7 14 5 7.5 1.3Z"
     * fill-rule="evenodd"
     * stroke="none"
     * fill="black"></path></marker>
     */

        // TODO: 修改为更好的实现

    const marker = parent.append("marker")
        .attr("id", id)
        .attr("viewBox", "0 0 16 10")
        .attr("refX", 16)
        .attr("refY", 5)
        .attr("markerWidth", 16)
        .attr("markerHeight", 10)
        .attr("orient", "auto");

    const path = marker.append("path")
        .attr("d", "M-1 5 7.5 0 16 5 7.5 10Z")
        .attr("stroke", "black")
        .attr("fill", "white");
    dagreD3.util.applyStyle(path, edge[type + "Style"]);

    // const marker = parent.append("marker")
    //     .attr("id", id)
    //     .attr("viewBox", "0 0 16 10")
    //     .attr("refX", 16)
    //     .attr("refY", 5)
    //     .attr("markerWidth", 16)
    //     .attr("markerHeight", 10)
    //     .attr("orient", "auto");
    //
    // const path = marker.append("path")
    //     .attr("d", "M-1 5 7.5 0 16 5 7.5 10Z M1.3 5 7.5 8.7 14 5 7.5 1.3Z")
    //     .attr("stroke", "none")
    //     .attr("fill-rule", "evenodd")
    //     .attr("fill", "black");
    // dagreD3.util.applyStyle(path, edge[type + "Style"]);

}



function Aggregation() {
    return {
        arrowhead: "normal",
    }
}

function _arrowComposition(parent, id, edge, type) {
    /**
     * <marker id="filledDiamond"
     * viewBox="0 0 16 10"
     * refX="16"
     * refY="5"
     * markerWidth="16"
     * markerHeight="10"
     * orient="auto">
     * <path d="M-1 5 7.5 0 16 5 7.5 10Z"
     * stroke="none"
     * fill="black"></path></marker>
     */

    const marker = parent.append("marker")
        .attr("id", id)
        .attr("viewBox", "0 0 16 10")
        .attr("refX", 16)
        .attr("refY", 5)
        .attr("markerWidth", 16)
        .attr("markerHeight", 10)
        .attr("orient", "auto");

    const path = marker.append("path")
        .attr("d", "M-1 5 7.5 0 16 5 7.5 10Z")
        .attr("stroke", "none")
        .attr("fill", "black");
    dagreD3.util.applyStyle(path, edge[type + "Style"]);

}


function Composition() {
    return {
        arrowhead: "normal",
    }
}

function _arrowDependency(parent, id, edge, type) {
    // TODO: 虚线
    /**
     * <marker id="arrowhead" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="10" markerHeight="10" orient="auto">
     *     <path d="M10 5 0 10 0 8.7 6.8 5.5 0 5.5 0 4.5 6.8 4.5 0 1.3 0 0Z" stroke="none" fill="black">
     *         </path></marker>
     * @returns {{arrowhead: string}}
     * @constructor
     */
    const marker = parent.append("marker")
        .attr("id", id)
        .attr("viewBox", "0 0 10 10")
        .attr("refX", 10)
        .attr("refY", 5)
        .attr("markerWidth", 8)
        .attr("markerHeight", 6)
        .attr("orient", "auto");

    const path = marker.append("path")
        .attr("d", "M10 5 0 10 0 8.7 6.8 5.5 0 5.5 0 4.5 6.8 4.5 0 1.3 0 0Z")
        .attr("stroke", "none")
        .attr("fill", "black");
    dagreD3.util.applyStyle(path, edge[type + "Style"]);

}

function Dependency() {
    return {
        arrowhead: "normal",
    }
}



export {
    Generalization,
    _arrowGeneralization,
    _arrowRealization,
    _arrowAssociation,
    _arrowAggregation,
    _arrowComposition,
    _arrowDependency,
    Realization,
    Association,
    Aggregation,
    Composition,
    Dependency,
}