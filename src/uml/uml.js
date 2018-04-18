import {ClassDiagram, Context} from "./class-diagram-node";
import {
    _arrowAggregationHead, _arrowAggregationTail, _arrowAssociationHead, _arrowCompositionHead, _arrowCompositionTail,
    _arrowDependencyHead,
    _arrowGeneralizationHead,
    _arrowRealizationHead
} from "./class-diagram-relationship";
import * as dagreD3 from "dagre-d3";
import {d3} from "./d3";


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

const ClassDiagramGraph = dagreD3.graphlib.Graph;

ClassDiagramGraph.prototype.setClassDiagramNode = function (classInfo) {
    const processedClassInfo = processClassNodeInfo(classInfo);
    this.setNode(processedClassInfo.nodeName, processedClassInfo.value)
};


const previousRender = dagreD3.render;

function ClassDiagramRender() {
    const r = new previousRender();
    r.arrows().GeneralizationHead = _arrowGeneralizationHead;
    r.arrows().RealizationHead = _arrowRealizationHead;
    r.arrows().AssociationHead = _arrowAssociationHead;
    r.arrows().AggregationHead = _arrowAggregationHead;
    r.arrows().AggregationTail = _arrowAggregationTail;
    r.arrows().CompositionHead = _arrowCompositionHead;
    r.arrows().DependencyHead = _arrowDependencyHead;
    r.arrows().CompositionTail = _arrowCompositionTail;

    return r
}



export {
    ClassDiagramGraph,
    ClassDiagramRender
}