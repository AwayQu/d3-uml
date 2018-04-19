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

function leftArrow(parent, id, edge, type) {
    const marker = parent.append("marker")
        .attr("id", id)
        .attr("viewBox", "0 0 10 10")
        .attr("refX", 0)
        .attr("refY", 5)
        .attr("markerWidth", 8)
        .attr("markerHeight", 6)
        .attr("orient", "auto");

    const path = marker.append("path")
        .attr("d", "M0 5 10 10 10 8.7 3.2 5.5 10 5.5 10 4.5 3.2 4.5 10 1.3 10 0Z")
        .attr("stroke", "none")
        .attr("fill", "black");
    dagreD3.util.applyStyle(path, edge[type + "Style"]);
}

function rightArrow(parent, id, edge, type) {

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

function rightTriangle(parent, id, edge, type) {

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

function rightFilledDiamond(parent, id, edge, type) {
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

function rightDiamond(parent, id, edge, type) {
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
    //     .attr("viewBox", "0 0 10 10")
    //     .attr("refX", 10)
    //     .attr("refY", 5)
    //     .attr("markerWidth", 8)
    //     .attr("markerHeight", 6)
    //     .attr("orient", "auto");
    //
    // const path = marker.append("path")
    //     .attr("d", "M10 5 0 10 0 8.7 6.8 5.5 0 5.5 0 4.5 6.8 4.5 0 1.3 0 0Z")
    //     .attr("stroke", "none")
    //     .attr("fill", "black");
    // dagreD3.util.applyStyle(path, edge[type + "Style"]);

}


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


function _arrowGeneralizationHead(parent, id, edge, type) {
    rightTriangle(parent, id, edge, type)
}

function Generalization() {
    return {
        arrowhead: "GeneralizationHead"
    }
}

function _arrowRealizationHead(parent, id, edge, type) {
    rightTriangle(parent, id, edge, type)
}

function Realization() {
    return {
        arrowhead: "RealizationHead",
    }
}


function _arrowAssociationHead(parent, id, edge, type) {
    rightArrow(parent, id, edge, type);


}

function Association() {
    return {
        arrowhead: "AssociationHead"
    }
}

function _arrowAggregationHead(parent, id, edge, type) {

    rightDiamond(parent, id, edge, type);
}

function _arrowAggregationTail(parent, id, edge, type) {
    leftArrow(parent, id, edge, type);

}


function Aggregation() {

    return {
        arrowhead: "AggregationHead",
        arrowtail: "AggregationTail"
    }
}

function _arrowCompositionTail(parent, id, edge, type) {
    leftArrow(parent, id, edge, type)
}

function _arrowCompositionHead(parent, id, edge, type) {
    rightFilledDiamond(parent, id, edge, type);
}


function Composition() {

    return {
        arrowhead: "CompositionHead",
        arrowtail: "CompositionTail"
    }
}

function _arrowDependencyHead(parent, id, edge, type) {
    rightArrow(parent, id, edge, type)
}

function Dependency() {

    return {
        arrowhead: "DependencyHead",
    }
}

function Relation(name) {
    if (name === "Generalization") {
        return Generalization();
    } else if (name === "Realization") {
        return Realization();
    } else if (name === "Association") {
        return Association();
    } else if (name === "Aggregation") {
        return Aggregation();
    } else if (name === "Composition") {
        return Composition();
    } else if (name === "Dependency") {
        return Dependency();
    } else {
        return {}
    }
}

export {
    _arrowGeneralizationHead,
    _arrowRealizationHead,
    _arrowAssociationHead,
    _arrowAggregationHead,
    _arrowAggregationTail,
    _arrowCompositionHead,
    _arrowDependencyHead,
    _arrowCompositionTail,
    Generalization,
    Realization,
    Association,
    Aggregation,
    Composition,
    Dependency,
    Relation
}